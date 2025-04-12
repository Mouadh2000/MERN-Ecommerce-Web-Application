const jwt = require('jsonwebtoken');
const Client = require('../../models/client');
const path = require('path');
const fs = require('fs');



class ClientAuthController {
    constructor() {
        this.secretKey = process.env.JWT_SECRET;
        this.refreshSecretKey = process.env.JWT_REFRESH_SECRET;

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.getClientDetails = this.getClientDetails.bind(this);
    }

    async signup(req, res) {
        const {
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            gender,
            address
        } = req.body;
    
        try {
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s\-]+$/;
            const phoneNumberRegex = /^[0-9]+$/;
            if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
                return res.status(400).json({
                success: false,
                message: 'Le prénom et le nom ne doivent contenir que des lettres',
                });
            }
            if (!phoneNumberRegex.test(phoneNumber)) {
                return res.status(400).json({
                    success: false,
                    message: 'Le numéro de téléphone ne doit contenir que des chiffres',
                });
            }
            const existingUser = await Client.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'L\'email ou le nom d\'utilisateur est déjà utilisé' });
            }
    
            let profileImage = '';
            if (req.file) {
                profileImage = req.file.filename;
            }
    
            const client = new Client({
                username,
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                gender,
                address,
                profileImage
            });
    
            await client.save();
    
            res.status(201).json({ message: 'Client inscrit avec succès' });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ message: 'Erreur du serveur lors de l\'inscription' });
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            const client = await Client.findOne({ email });
            if (!client) {
                return res.status(401).json({ message: 'Email ou mot de passe invalide' });
            }
    
            const isMatch = await client.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email ou mot de passe invalide' });
            }
    
            if (client.disabled) {
                return res.status(403).json({ message: 'Le compte est désactivé' });
            }
    
            const accessToken = jwt.sign(
                { id: client._id, firstName: client.firstName, lastName: client.lastName },
                this.secretKey,
                { expiresIn: '3h' }
            );
    
            const refreshToken = jwt.sign(
                { id: client._id, firstName: client.firstName, lastName: client.lastName },
                this.refreshSecretKey,
                { expiresIn: '7d' }
            );
    
            res.json({
                access_token: accessToken,
                refresh_token: refreshToken
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Erreur du serveur lors de la connexion' });
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
                { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName },
                this.secretKey,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { id: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName },
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

    async getClientDetails(req, res) {
        if (!req.client) {
            return res.status(404).json({ message: 'Client not found' });
        }
    
        try {
            const clientData = req.client.toObject();
            let base64Image = null;
    
            if (clientData.profileImage) {
                const imagePath = path.join('uploads/ClientImages', clientData.profileImage);
                if (fs.existsSync(imagePath)) {
                    const imageBuffer = fs.readFileSync(imagePath);
                    base64Image = imageBuffer.toString('base64');
                }
            }
    
            return res.status(200).json({
                success: true,
                data: {
                    ...clientData,
                    profileImage: base64Image
                }
            });
        } catch (error) {
            console.error('Error fetching client details:', error);
            return res.status(500).json({ success: false, message: 'Error fetching client details' });
        }
        
    }
}

module.exports = new ClientAuthController();
