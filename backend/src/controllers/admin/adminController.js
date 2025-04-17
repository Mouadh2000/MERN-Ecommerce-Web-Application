const Admin = require('../../models/admin');

class AdminController {

  static async createAdmin(req, res) {
    try {
      const { username, last_name, first_name, email, password, is_staff } = req.body;

      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
      if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return res.status(400).json({
          success: false,
          message: 'Le prénom et le nom ne doivent contenir que des lettres',
        });
      }

      const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Un agent avec cet email ou nom d\'utilisateur existe déjà'
        });
      }

      const newAdmin = new Admin({
        username,
        last_name,
        first_name,
        email,
        password,
        is_staff: is_staff || false,
      });

      await newAdmin.save();
      const adminData = newAdmin.toObject();
      delete adminData.password;

      return res.status(201).json({
        success: true,
        message: 'Agent Support créé avec succès',
        data: adminData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de l\'Agent support',
        error: error.message,
      });
    }
  }

  static async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find({is_admin: false }, '-password');
      return res.status(200).json({
        success: true,
        message: 'Liste des administrateurs et agent supports récupérée avec succès',
        data: admins,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des administrateurs et Agent supports',
        error: error.message,
      });
    }
  }

  static async getAdminById(req, res) {
    try {
      const admin = await Admin.findById(req.params.id, '-password');
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Agent Support non trouvé',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Agent Support récupéré avec succès',
        data: admin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'agent support',
        error: error.message,
      });
    }
  }

  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Agent Support non trouvé',
        });
      }

      if (updates.password && updates.password.trim() !== '') {
        admin.password = updates.password;
        delete updates.password;
      } else {
        delete updates.password;
      }

      Object.assign(admin, updates);
      await admin.save();

      const updatedAdmin = admin.toObject();
      delete updatedAdmin.password;

      return res.status(200).json({
        success: true,
        message: 'Agent Support mis à jour avec succès',
        data: updatedAdmin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'Agent Support',
        error: error.message,
      });
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Agent Support non trouvé',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Agent Support supprimé avec succès',
        data: admin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'Agent Support',
        error: error.message,
      });
    }
  }
  
  static async countAdmins(req, res) {
    try {
      const count = await Admin.countDocuments();
      return res.status(200).json({
        success: true,
        message: 'Nombre total d\'administrateurs récupéré avec succès',
        data: { count },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du nombre d\'administrateurs',
        error: error.message,
      });
    }
  }
  
}

module.exports = AdminController;
