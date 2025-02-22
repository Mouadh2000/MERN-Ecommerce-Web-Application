const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../../models/admin');

class AdminAuthController {
    constructor() {
        this.secretKey = process.env.JWT_SECRET;
        this.refreshSecretKey = process.env.JWT_REFRESH_SECRET;
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.getAdminDetails = this.getAdminDetails.bind(this);
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const accessToken = jwt.sign(
                { id: admin._id, firstName: admin.first_name, lastName: admin.last_name },
                this.secretKey,
                { expiresIn: '1h' }
            );

            const refreshToken = jwt.sign(
                { id: admin._id, firstName: admin.first_name, lastName: admin.last_name },
                this.refreshSecretKey,
                { expiresIn: '7d' }
            );

            res.json({
                access_token: accessToken,
                refresh_token: refreshToken
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async refreshToken(req, res) {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        try {
            const decoded = jwt.verify(refresh_token, this.refreshSecretKey);

            const accessToken = jwt.sign(
                { id: decoded.id, firstName: decoded.first_name, lastName: decoded.last_name },
                this.secretKey,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { id: decoded.id, firstName: decoded.first_name, lastName: decoded.last_name },
                this.refreshSecretKey,
                { expiresIn: '7d' }
            );

            res.json({
                access_token: accessToken,
                refresh_token: newRefreshToken
            });
        } catch (error) {
            res.status(403).json({ message: 'Invalid refresh token' });
        }
    }

    async getAdminDetails(req, res) {
        if (!req.admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json(req.admin);
    }
}

module.exports = new AdminAuthController();