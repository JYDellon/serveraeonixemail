import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis un fichier .env
dotenv.config();

const app = express();
const port = 5000;

// Configuration du middleware CORS pour accepter les requêtes depuis React (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Assure-toi que c'est bien l'URL de ton frontend React
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json()); // Pour analyser les données JSON

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Serveur opérationnel. Utilise l\'endpoint /api/envoyer-email ou /api/contact pour envoyer un email.');
});

// Configuration du transporteur pour l'envoi d'email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Exemple avec Gmail, adapte à ton fournisseur d'email
  auth: {
    user: process.env.EMAIL_USER, // Récupère l'email depuis les variables d'environnement
    pass: process.env.EMAIL_PASS, // Récupère le mot de passe depuis les variables d'environnement
  }
});

// Endpoint pour envoyer un email pour une demande de devis
app.post('/api/devis', (req, res) => {
  const { 
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
    besoinsHebergement 
  } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // L'email depuis lequel l'email sera envoyé
    to: 'jy.dellon@gmail.com', // Remplace par l'email du destinataire
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
    `
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
    console.log('Email envoyé: ' + info.response);
    res.status(200).json({ message: 'Demande de devis envoyée avec succès!' });
  });
});


// Endpoint pour le formulaire de contact
app.post('/api/contact', (req, res) => {
  const { 
    prenom,  
    nom, 
    email, 
    telephone, 
    message 
  } = req.body;

  // Configuration de l'email avec les informations du formulaire de contact
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Ton adresse email d'envoi
    to: 'jy.dellon@gmail.com',  // Remplace par l'adresse email du destinataire
    subject: `Message de contact de ${prenom} ${nom}`,  // Utilisation de prénom et nom dans l'objet
    text: `
      Vous avez reçu un message de contact :
      - Prénom : ${prenom}
      - Nom : ${nom}
      - Email : ${email}
      - Téléphone : ${telephone}
      - Message : ${message}
    `
  };

  // Envoi de l'email avec nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
    console.log('Email envoyé: ' + info.response);
    res.status(200).json({ message: 'Email envoyé avec succès!' });
  });
});




// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
