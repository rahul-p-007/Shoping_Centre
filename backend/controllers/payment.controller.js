import Coupon from "../db/models/coupon.model.js";
import Order from "../db/models/order.model.js";
import { stripe } from "../lib/stripe.js";
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty product array" });
    }

    let totalAmount = 0;
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          totalAmount * (coupon.discountPercentage / 100)
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },

      customer_email: req.user.email,

      billing_address_collection: "required",
    });

    if (totalAmount >= 2000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log("checkout error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const checkout_success = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // deactivate coupon if used
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }

      // create new order
      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((p) => ({
          product: p.id,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
        customerEmail: session.customer_email, // optional save
        billingDetails: session.customer_details || {}, // optional save
      });

      await newOrder.save();
    }

    res.json({ success: true }); // ✅ don’t forget to respond!
  } catch (error) {
    console.log("checkout success error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}
async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId: userId });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    userId: userId,
  });
  await newCoupon.save();
  return newCoupon;
}
