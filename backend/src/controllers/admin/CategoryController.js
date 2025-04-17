const Category = require('../../models/category');

class CategoryController {
  
  async createCategory(req, res) {
    try {
      const { name, description, status } = req.body;
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
      if (!nameRegex.test(name)){
        return res.status(400).json({
        success: false,
        message: 'Le nom de la catégorie ne doit contenir que des lettres',
        });
      }

      const newCategory = new Category({ name, description, status });
      const savedCategory = await newCategory.save();

      return res.status(201).json({
        success: true,
        message: 'Catégorie créée avec succès',
        data: savedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de la catégorie',
        error: error.message,
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        success: true,
        message: 'Catégories récupérées avec succès',
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des catégories',
        error: error.message,
      });
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Catégorie récupérée avec succès',
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de la catégorie',
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const { name, description, status } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description, status, updated_at: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Catégorie mise à jour avec succès',
        data: updatedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de la catégorie',
        error: error.message,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);

      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: 'Catégorie non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Catégorie supprimée avec succès',
        data: deletedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de la catégorie',
        error: error.message,
      });
    }
  }
}

module.exports = new CategoryController();