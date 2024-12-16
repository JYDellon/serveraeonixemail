// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default async (req, res) => {
//   if (req.method === 'POST') {
//     const { 
//       nom, email, telephone, nomEntreprise, prestation, descriptionBesoins, objectifs,
//       urlSite, fonctionnalites, graphisme, typeProjet, urlSiteRefonte, besoinsHebergement
//     } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_DESTINATAIRE,
//       subject: `Demande de devis pour ${typeProjet}`,
//       text: `
//         Demande de devis pour un projet ${typeProjet} :

//         - Nom : ${nom}
//         - Email : ${email}
//         - Téléphone : ${telephone}
//         - Nom de l'entreprise : ${nomEntreprise}
//         - Type de prestation : ${prestation}
//         - Objectifs : ${objectifs}
//         - URL du site : ${urlSite}
//         - Fonctionnalités souhaitées : ${fonctionnalites}
//         - Graphisme : ${graphisme}
//         - Besoins spécifiques : ${besoinsHebergement}
//         - Description détaillée : ${descriptionBesoins}
//         - URL de la refonte : ${urlSiteRefonte}
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Demande de devis envoyée avec succès!' });
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email:', error);
//       res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Méthode HTTP non autorisée' });
//   }
// };















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
  origin: '*', // Spécifiez le domaine autorisé
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
