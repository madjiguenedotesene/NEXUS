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

// Utilisation de .any() pour accepter tous les fichiers (bulletins S1, S2, etc.)
app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    const { 
      pack, emailDedicace, passwordDedicace, 
      niveau_etude, annee_en_cours, methodePaiement 
    } = req.body;
    
    const files = req.files;

    const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Port 587 utilise STARTTLS
  auth: {
    user: process.env.EMAIL_USER, // Utilise des variables d'environnement !
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false 
  }
});

    // On transforme tous les fichiers reçus en pièces jointes
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

          <p><strong>Paiement :</strong> ${methodePaiement || 'Mobile Money / Virement'}</p>
          <p style="font-size: 12px; color: #666;">Fichiers joints : ${attachments.length}</p>
        </div>
      `,
      attachments
    });

    console.log("✅ Mail envoyé avec succès !");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Serveur NEXUS actif sur le port ${PORT}`));