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

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
      }
    }
    // await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("delete product error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getRecommendationsProducts = async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(product);
  } catch (error) {
    console.log("get all products error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("get products by category error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const uppatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.json(uppatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log("toggle featured product error", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error updating featured products cache", error);
  }
}
