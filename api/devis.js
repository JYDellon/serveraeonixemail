import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Cors from 'cors';

// Charger les variables d'environnement
dotenv.config();

// Configurer nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configurer les options CORS
const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST'],
});

// Helper pour appliquer CORS
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Appliquez CORS

  if (req.method === 'POST') {
    const { prenom, nom, email, telephone, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATAIRE,
      subject: `Message de contact de ${prenom} ${nom}`,
      text: `
        Vous avez reçu un message de contact :
        - Prénom : ${prenom}
        - Nom : ${nom}
        - Email : ${email}
        - Téléphone : ${telephone}
        - Message : ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode HTTP non autorisée' });
  }
}
