// /backend/api/contact.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Exemple avec Gmail, adapte à ton fournisseur d'email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export default async function handler(req, res) {
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
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
