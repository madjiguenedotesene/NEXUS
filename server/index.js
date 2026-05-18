import 'dotenv/config'; // Charge les variables du fichier .env
import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';

const app = express();

// On autorise UNIQUEMENT le local pour éviter toute interférence
// À mettre au début de server/index.js
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://nexus-ob.onrender.com']
}));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    const { 
      pack, 
      identifiantFT, 
      passwordFT, 
      emailDedicace, 
      passwordDedicace, 
      methodePaiement 
    } = req.body;
    
    const files = req.files || [];

    // Sécurité locale pour vérifier vos variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ ERREUR : Les variables EMAIL_USER ou EMAIL_PASS manquent dans votre fichier .env");
      return res.status(500).json({ 
        success: false, 
        message: "Variables EMAIL_USER ou EMAIL_PASS manquantes dans le fichier .env local." 
      });
    }

    // Configuration SMTP Standard pour Gmail en local
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true, // SSL direct
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    await transporter.sendMail({
      from: `"NEXUS Local" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // S'envoyer le mail à soi-même pour le test
      subject: `🚀 TEST LOCAL NEXUS : ${pack || 'Non défini'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #059669; border-radius: 15px;">
          <h2>Nouveau Dossier Reçu (TEST LOCAL)</h2>
          <p><strong>Pack :</strong> ${pack}</p>
          <p><strong>Identifiant FT :</strong> ${identifiantFT}</p>
          <p><strong>Email Dédié :</strong> ${emailDedicace}</p>
          <p><strong>Fichiers joints :</strong> ${attachments.length}</p>
        </div>
      `,
      attachments
    });

    console.log("✅ Mail de test envoyé avec succès !");
    return res.status(200).json({ success: true, message: "Dossier transmis avec succès en local." });
  } catch (error) {
    console.error("❌ Erreur d'envoi SMTP local :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});


const PORT = process.env.PORT || 3001; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [SERVEUR] Actif sur le port ${PORT}`);
});