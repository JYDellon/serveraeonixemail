import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { 
      nom, email, telephone, nomEntreprise, prestation, descriptionBesoins, objectifs,
      urlSite, fonctionnalites, graphisme, typeProjet, urlSiteRefonte, besoinsHebergement
    } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINATAIRE,
      subject: `Demande de devis pour ${typeProjet}`,
      text: `
        Demande de devis pour un projet ${typeProjet} :

        - Nom : ${nom}
        - Email : ${email}
        - Téléphone : ${telephone}
        - Nom de l'entreprise : ${nomEntreprise}
        - Type de prestation : ${prestation}
        - Objectifs : ${objectifs}
        - URL du site : ${urlSite}
        - Fonctionnalités souhaitées : ${fonctionnalites}
        - Graphisme : ${graphisme}
        - Besoins spécifiques : ${besoinsHebergement}
        - Description détaillée : ${descriptionBesoins}
        - URL de la refonte : ${urlSiteRefonte}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Demande de devis envoyée avec succès!' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode HTTP non autorisée' });
  }
};

