import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Port dynamique pour Render ou 3001 en local
const PORT = process.env.PORT || 3001;

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // Limite à 10Mo pour éviter de saturer la RAM de Render
});

// Route de test pour vérifier si le serveur tourne
app.get('/', (req, res) => {
  res.send('Serveur NEXUS en ligne !');
});

app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    const { 
      pack, emailDedicace, passwordDedicace, 
      niveau_etude, annee_en_cours, methodePaiement 
    } = req.body;
    
    const files = req.files || [];

    // Configuration optimisée pour Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'andregomis3954@gmail.com',
        pass: 'fkch sslv qqho ohqb', // Ton mot de passe d'application (16 caractères)
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    const mailOptions = {
      from: '"NEXUS System" <andregomis3954@gmail.com>',
      to: 'andregomis3954@gmail.com',
      subject: `NOUVEAU DOSSIER : ${pack}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 2px solid #059669; border-radius: 15px;">
          <h2 style="color: #059669;">Nouveau Dossier Campus France</h2>
          <p><strong>Type :</strong> ${pack}</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px;">
            <h3>🔑 Accès Plateforme</h3>
            <p><strong>Email :</strong> ${emailDedicace}</p>
            <p><strong>Pass :</strong> ${passwordDedicace}</p>
          </div>
          <p><strong>Niveau :</strong> ${niveau_etude} (${annee_en_cours})</p>
          <p><strong>Paiement :</strong> ${methodePaiement}</p>
          <p><strong>Fichiers :</strong> ${attachments.length}</p>
        </div>
      `,
      attachments: attachments
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email envoyé avec succès' });

  } catch (error) {
    console.error('Erreur Serveur:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});