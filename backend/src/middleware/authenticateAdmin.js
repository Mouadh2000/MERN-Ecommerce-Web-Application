const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

class AuthenticateAdmin {
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
            const admin = await Admin.findById(decoded.id).select('-password');

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            req.admin = admin;
            next(); 
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = AuthenticateAdmin;