import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';

const app = express();

// Configuration CORS pour accepter les requêtes de ton frontend Render
app.use(cors());
app.use(express.json());

// Stockage temporaire en mémoire (Attention : Max 512MB sur Render Free)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // Limite à 10MB par fichier
});

// Route de diagnostic (pour tester si le serveur répond dans le navigateur)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "NEXUS Server is Online" });
});

app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    const { 
      pack, emailDedicace, passwordDedicace, 
      niveau_etude, annee_en_cours, methodePaiement 
    } = req.body;
    
    const files = req.files || [];

    // Configuration SMTP sécurisée pour Render (Port 465)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'andregomis3954@gmail.com',
        pass: 'elde udir vmrr qdsj', 
      },
      tls: {
        rejectUnauthorized: false 
      },
      connectionTimeout: 20000, // 20 secondes
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
          <h2 style="color: #059669;">Nouveau Dossier Campus France</h2>
          <p><strong>Type :</strong> ${pack}</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🔑 Accès Plateforme</h3>
            <p><strong>Email :</strong> ${emailDedicace}</p>
            <p><strong>Pass :</strong> ${passwordDedicace}</p>
          </div>
          <div style="background: #e6fffa; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #088a68;">🎓 Profil Académique</h3>
            <p><strong>Niveau :</strong> ${niveau_etude}</p>
            <p><strong>Année :</strong> ${annee_en_cours}</p>
          </div>
          <p><strong>Paiement :</strong> ${methodePaiement || 'Virement / Capture'}</p>
          <p style="font-size: 12px; color: #666;">Fichiers joints : ${attachments.length}</p>
        </div>
      `,
      attachments
    });

    console.log("✅ Mail envoyé avec succès !");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Port dynamique pour Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur NEXUS actif sur le port ${PORT}`);
});