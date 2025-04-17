const PaymentMethod = require('../../models/paymentMethod');

class PaymentMethodController {
  
  async createPaymentMethod(req, res) {
    try {
      const { name, description, isActive } = req.body;
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
      if (!nameRegex.test(name)){
        return res.status(400).json({
        success: false,
        message: 'Le nom de la méthode de paiement ne doit contenir que des lettres',
        });
      }

      const newPaymentMethod = new PaymentMethod({ name, description, isActive });
      const savedPaymentMethod = await newPaymentMethod.save();

      return res.status(201).json({
        success: true,
        message: 'Méthode de paiement créée avec succès',
        data: savedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de la méthode de paiement',
        error: error.message,
      });
    }
  }

  async getAllPaymentMethods(req, res) {
    try {
      const paymentMethods = await PaymentMethod.find({});
      return res.status(200).json({
        success: true,
        message: 'Méthodes de paiement récupérées avec succès',
        data: paymentMethods,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des méthodes de paiement',
        error: error.message,
      });
    }
  }

  async getPaymentMethodById(req, res) {
    try {
      const paymentMethod = await PaymentMethod.findById(req.params.id);

      if (!paymentMethod) {
        return res.status(404).json({
          success: false,
          message: 'Méthode de paiement non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Méthode de paiement récupérée avec succès',
        data: paymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de la méthode de paiement',
        error: error.message,
      });
    }
  }

  async updatePaymentMethod(req, res) {
    try {
      const { name, description, isActive } = req.body;

      const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
        req.params.id,
        { name, description, isActive, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedPaymentMethod) {
        return res.status(404).json({
          success: false,
          message: 'Méthode de paiement non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Méthode de paiement mise à jour avec succès',
        data: updatedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de la méthode de paiement',
        error: error.message,
      });
    }
  }

  async deletePaymentMethod(req, res) {
    try {
      const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);

      if (!deletedPaymentMethod) {
        return res.status(404).json({
          success: false,
          message: 'Méthode de paiement non trouvée',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Méthode de paiement supprimée avec succès',
        data: deletedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de la méthode de paiement',
        error: error.message,
      });
    }
  }
}

module.exports = new PaymentMethodController();