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
//     const { prenom, nom, email, telephone, message } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_DESTINATAIRE,
//       subject: `Message de contact de ${prenom} ${nom}`,
//       text: `
//         Vous avez reçu un message de contact :
//         - Prénom : ${prenom}
//         - Nom : ${nom}
//         - Email : ${email}
//         - Téléphone : ${telephone}
//         - Message : ${message}
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email envoyé avec succès!' });
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email:', error);
//       res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Méthode HTTP non autorisée' });
//   }
// };











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
//     const { prenom, nom, email, telephone, message } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_DESTINATAIRE,
//       subject: `Message de contact de ${prenom} ${nom}`,
//       text: `
//         Vous avez reçu un message de contact :
//         - Prénom : ${prenom}
//         - Nom : ${nom}
//         - Email : ${email}
//         - Téléphone : ${telephone}
//         - Message : ${message}
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email envoyé avec succès!' });
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email:', error);
//       res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Méthode HTTP non autorisée' });
//   }
// };








// const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: process.env.EMAIL_DESTINATAIRE,
//   subject: 'Test Email',
//   text: 'Ceci est un email de test.',
// };












import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Appliquez CORS pour toutes les requêtes
const corsOptions = {
  origin: '*', // ou remplacer * par le domaine de votre frontend, par exemple : 'https://monfrontend.vercel.app'
  methods: ['GET', 'POST'],
};

export default async function handler(req, res) {
  // Activez le CORS pour cette fonction API
  cors(corsOptions)(req, res, async () => {
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
  });
}
