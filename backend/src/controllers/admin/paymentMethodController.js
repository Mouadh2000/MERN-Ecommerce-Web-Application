const PaymentMethod = require('../../models/paymentMethod');

class PaymentMethodController {
  
  async createPaymentMethod(req, res) {
    try {
      const { name, description, isActive } = req.body;

      const newPaymentMethod = new PaymentMethod({ name, description, isActive });
      const savedPaymentMethod = await newPaymentMethod.save();

      return res.status(201).json({
        success: true,
        message: 'Payment method created successfully',
        data: savedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating payment method',
        error: error.message,
      });
    }
  }

  async getAllPaymentMethods(req, res) {
    try {
      const paymentMethods = await PaymentMethod.find({});
      return res.status(200).json({
        success: true,
        message: 'Payment methods fetched successfully',
        data: paymentMethods,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching payment methods',
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
          message: 'Payment method not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payment method fetched successfully',
        data: paymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching payment method',
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
          message: 'Payment method not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payment method updated successfully',
        data: updatedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error updating payment method',
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
          message: 'Payment method not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payment method deleted successfully',
        data: deletedPaymentMethod,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting payment method',
        error: error.message,
      });
    }
  }
}

module.exports = new PaymentMethodController();
