import Product from "../db/models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find({});

    res.json({ product });
  } catch (error) {
    console.log("get all products error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const getfeaturedproducts = async (req, res) => {
  try {
    // const getFeaturedProducts = await Product
    let featuredProducts = await Redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis , fetch from mongoDB
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    // lean - convert mongoose object to js object
    if (!featuredProducts) {
      return res.status(404).json({
        message: "No featured products found",
      });
    }
    // store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("get all products error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      await cloudinary.uploader.upload(image, { folder: "products" });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("create product error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
