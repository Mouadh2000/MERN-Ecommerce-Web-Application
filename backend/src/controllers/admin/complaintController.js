const Complaint = require('../../models/complaint');

class ComplaintController {
  
    async createComplaint(req, res) {
        try {
            const { firstName, lastName, email, title, message } = req.body;
        
            const newComplaint = new Complaint({
            firstName,
            lastName,
            email,
            title,
            message,
            });
        
            const savedComplaint = await newComplaint.save();
            return res.status(201).json({
            success: true,
            message: "Réclamation soumise avec succès",
            data: savedComplaint,
            });
        } catch (error) {
            console.error("Erreur lors de la création de la réclamation :", error);
            return res.status(500).json({
            success: false,
            message: "Échec de la soumission de la réclamation",
            error: error.message,
            });
        }
    }
      

  async getAllComplaints(req, res) {
    try {
      const complaints = await Complaint.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        data: complaints,
      });
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch complaints',
        error: error.message,
      });
    }
  }
}

module.exports = new ComplaintController();
