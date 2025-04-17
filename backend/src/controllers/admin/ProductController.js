const fs = require('fs');
const Product = require('../../models/product');
const ProductImage = require('../../models/productImages');
const Category = require('../../models/category');
const path = require('path');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, status, category, price, discount, stock_quantity } = req.body;

      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
      if (!nameRegex.test(name)){
        return res.status(400).json({
        success: false,
        message: 'Le nom du produit ne doit contenir que des lettres',
        });
      }
      
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ success: false, message: 'Catégorie non trouvée' });
      }
      
      const discountedPrice = price - (price * (discount / 100));
      
      const newProduct = new Product({
        name,
        description,
        status,
        category,
        price: discountedPrice,
        discount,
        stock_quantity,
      });
      
      const savedProduct = await newProduct.save();
      
      if (req.file) {
        const imagePath = path.join('uploads/products', req.file.filename);
        const productImage = new ProductImage({
          filename: req.file.filename,
          imageUrl: imagePath,
          product: savedProduct._id
        });
        await productImage.save();
      }
      
      return res.status(201).json({ 
        success: true, 
        message: 'Produit créé avec succès', 
        data: savedProduct 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la création du produit', 
        error: error.message 
      });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await Product.find().populate('category');
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          const productImage = await ProductImage.findOne({ product: product._id });
          let base64Image = null;
          if (productImage && fs.existsSync(path.join('uploads/products', productImage.filename))) {
            const imageBuffer = fs.readFileSync(path.join('uploads/products', productImage.filename));
            base64Image = imageBuffer.toString('base64');
          }
          return { ...product.toObject(), image: base64Image };
        })
      );
      return res.status(200).json({ 
        success: true, 
        message: 'Produits récupérés avec succès',
        data: productsWithImages 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des produits', 
        error: error.message 
      });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id).populate('category');
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Produit non trouvé' 
        });
      }
      
      const productImage = await ProductImage.findOne({ product: product._id });
      let base64Image = null;
      if (productImage && fs.existsSync(path.join('uploads/products', productImage.filename))) {
        const imageBuffer = fs.readFileSync(path.join('uploads/products', productImage.filename));
        base64Image = imageBuffer.toString('base64');
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Produit récupéré avec succès',
        data: { ...product.toObject(), image: base64Image } 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération du produit', 
        error: error.message 
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, description, status, category, price, discount, stock_quantity, rating } = req.body;
      
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Produit non trouvé' 
        });
      }
      
      if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(404).json({ 
            success: false, 
            message: 'Catégorie non trouvée' 
          });
        }
      }
      
      const discountedPrice = price - (price * (discount / 100));
      
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, status, category, price: discountedPrice, discount, stock_quantity, rating, updated_at: Date.now() },
        { new: true, runValidators: true }
      );
      
      if (req.file) {
        const existingImage = await ProductImage.findOne({ product: updatedProduct._id });
        if (existingImage) {
          fs.unlinkSync(path.join('uploads/products', existingImage.filename));
        }
        const imagePath = path.join('uploads/products', req.file.filename);
        await ProductImage.findOneAndUpdate(
          { product: updatedProduct._id },
          { filename: req.file.filename, imageUrl: imagePath },
          { upsert: true, new: true }
        );
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Produit mis à jour avec succès', 
        data: updatedProduct 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la mise à jour du produit', 
        error: error.message 
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ 
          success: false, 
          message: 'Produit non trouvé' 
        });
      }
      
      const productImages = await ProductImage.find({ product: deletedProduct._id });
      for (const image of productImages) {
        fs.unlinkSync(path.join('uploads/products', image.filename));
      }
      
      await ProductImage.deleteMany({ product: deletedProduct._id });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Produit supprimé avec succès', 
        data: deletedProduct 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la suppression du produit', 
        error: error.message 
      });
    }
  }

  async checkProductStock(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: 'Produit non trouvé' 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Stock du produit vérifié avec succès',
        data: {
          productId: product._id,
          productName: product.name,
          stockQuantity: product.stock_quantity,
          inStock: product.stock_quantity > 0
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la vérification du stock du produit', 
        error: error.message 
      });
    }
  }
  
  async getProductsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
  
      const products = await Product.find({ category: categoryId }).populate('category');
  
      if (products.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Aucun produit trouvé dans cette catégorie',
          debug: {
            categoryId: categoryId,
            categoryExists: await Category.exists({ _id: categoryId })
          }
        });
      }
  
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          const images = await ProductImage.find({ product: product._id });
          
          let image = null;
          if (images.length > 0) {
            const fullPath = path.join('uploads', 'products', images[0].filename);
            if (fs.existsSync(fullPath)) {
              const imageBase64 = fs.readFileSync(fullPath, { encoding: 'base64' });
              image = imageBase64.toString('base64');
            }
          }
      
          return {
            ...product.toObject(),
            image: image,
          };
        })
      );
  
      return res.status(200).json({
        success: true,
        message: 'Produits par catégorie récupérés avec succès',
        data: productsWithImages
      });
  
    } catch (error) {
      console.error('Erreur dans getProductsByCategory:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits par catégorie',
        error: error.message,
        debug: {
          params: req.params,
          errorStack: error.stack
        }
      });
    }
  }

  async getTopRatedProducts(req, res) {
    try {
      const products = await Product.find()
        .sort({ rating: -1 })  
        .limit(15) 
        .populate('category');

      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          const productImage = await ProductImage.findOne({ product: product._id });
          let base64Image = null;
          if (productImage && fs.existsSync(path.join('uploads/products', productImage.filename))) {
            const imageBuffer = fs.readFileSync(path.join('uploads/products', productImage.filename));
            base64Image = imageBuffer.toString('base64');
          }
          return { ...product.toObject(), image: base64Image };
        })
      );

      return res.status(200).json({ 
        success: true, 
        message: 'Meilleurs produits récupérés avec succès',
        data: productsWithImages 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la récupération des meilleurs produits', 
        error: error.message 
      });
    }
  }
}

module.exports = new ProductController();