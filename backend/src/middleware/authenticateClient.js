const jwt = require('jsonwebtoken');
const Client = require('../models/client');

class AuthenticateClient {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, this.secretKey);
            const client = await Client.findById(decoded.id).select('-password');

            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }

            req.client = client;
            next(); 
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = AuthenticateClient;