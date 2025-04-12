const Client = require('../../models/client');
class ClientController {

    static async getClientById(req, res) {
        try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async getAllClients(req, res) {
        try {
        const clients = await Client.find();
        res.json(clients);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async disableClient(req, res) {
        try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        client.disabled = true;
        await client.save();
        res.json({ message: 'Client disabled successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async deleteClient(req, res) {
        try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json({ message: 'Client deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async enableClient(req, res) {
        try {
            const client = await Client.findById(req.params.id);
            if (!client) return res.status(404).json({ message: 'Client not found' });

            client.disabled = false;
            await client.save();
            res.json({ message: 'Client enabled successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async countClients(req, res) {
        try {
          const count = await Client.countDocuments();
          return res.status(200).json({
            success: true,
            message: 'Nombre total de clients récupéré avec succès',
            data: { count },
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du nombre de clients',
            error: error.message,
          });
        }
      }

}

module.exports = ClientController;