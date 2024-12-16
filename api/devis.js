// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import Cors from 'cors';

// // Charger les variables d'environnement
// dotenv.config();

// // Configurer nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Configurer les options CORS
// const cors = Cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
// });

// // Helper pour appliquer CORS
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors); // Appliquez CORS

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
// }

















// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import Cors from 'cors';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const cors = Cors({
//   origin: '*',
//   methods: ['GET', 'POST'],
// });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req, res) {
//   await runMiddleware(req, res, cors);

//   if (req.method === 'POST') {
//     const { prenom, nom, email, telephone, message } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_DESTINATAIRE,
//       subject: `Demande de devis de ${prenom} ${nom}`,
//       text: `
//         Vous avez reçu une demande de devis :
//         - Prénom : ${prenom}
//         - Nom : ${nom}
//         - Email : ${email}
//         - Téléphone : ${telephone}
//         - Message : ${message}
//       `,
//     };

//     const confirmationMailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email, // Email de l'expéditeur
//       subject: 'Confirmation de réception de votre demande de devis',
//       text: `
//         Bonjour ${prenom} ${nom},

//         Nous avons bien reçu votre demande de devis :

//         "${message}"

//         Nous vous répondrons dans les plus brefs délais.

//         Cordialement,
//         L'équipe.
//       `,
//     };

//     try {
//       // Envoyer l'email principal
//       await transporter.sendMail(mailOptions);

//       // Envoyer l'email de confirmation
//       await transporter.sendMail(confirmationMailOptions);

//       res.status(200).json({ message: 'Email envoyé avec succès!' });
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email:', error);
//       res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Méthode HTTP non autorisée' });
//   }
// }













import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Cors from 'cors';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST'],
});

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
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const {
      prenom,
      nom,
      email,
      telephone,
      nomEntreprise,
      prestation,
      descriptionBesoins,
      objectifs,
      urlSite,
      fonctionnalites,
      graphisme,
      typeProjet,
      urlSiteRefonte,
      besoinsHebergement,
    } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATAIRE,
      subject: `Nouvelle demande de devis de ${prenom}  ${nom}`,
      text: `
        Vous avez reçu une nouvelle demande de devis :
        
        - Prénom : ${prenom}
        - Nom : ${nom}
        - Email : ${email}
        - Téléphone : ${telephone}
        - Nom de l'entreprise : ${nomEntreprise || '-'}
        - Type de projet : ${typeProjet}
        - Prestation souhaitée : ${prestation}
        - URL du site (si applicable) : ${urlSite}
        - URL du site à refondre (si applicable) : ${urlSiteRefonte}
        - Fonctionnalités souhaitées : ${fonctionnalites || 'Aucune'}
        - Graphisme spécifique : ${graphisme || 'Non spécifié'}
        - Description des besoins : ${descriptionBesoins}
        - Objectifs : ${objectifs}
        - Besoins pour l'hébergement : ${besoinsHebergement || 'Aucun besoin spécifique'}
      `,
    };

    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Email de l'expéditeur
      subject: 'Confirmation de réception de votre demande de devis',
      text: `
        Bonjour ${prenom}  ${nom},

        Nous avons bien reçu votre demande de devis. Voici un récapitulatif des informations envoyées :

        - Prénom : ${prenom}        
        - Nom : ${nom}
        - Téléphone : ${telephone}
        - Nom de l'entreprise : ${nomEntreprise || '-'}
        - Type de projet : ${typeProjet}
        - Prestation souhaitée : ${prestation}
        - Description des besoins : ${descriptionBesoins}
        - Objectifs : ${objectifs}
        
        Nous vous répondrons dans les plus brefs délais. Si vous avez des questions supplémentaires, n'hésitez pas à nous contacter.

        Cordialement,
        L'équipe.
      `,
    };

    try {
      // Envoyer l'email principal
      await transporter.sendMail(mailOptions);

      // Envoyer l'email de confirmation
      await transporter.sendMail(confirmationMailOptions);

      res.status(200).json({ message: 'Email envoyé avec succès!' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode HTTP non autorisée' });
  }
}
