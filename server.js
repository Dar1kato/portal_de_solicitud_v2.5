//? Este es el servidor de Node Js que maneja el serivico de envio de correos
//? Daniel no sabe como funciona, pero funciona :/
//? Cualquier duda sobre el funcionamiento de este archivo, consultarlo con el video tutorial para implementar el envio de correos (Notion/Recursos)

// backend/server.js
import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  try {
    const msg = {
      to: req.body.to,
      from: '200818@iberopuebla.mx', // Tu email verificado
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    };

    await sgMail.send(msg);
    res.json({ success: true, message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el email',
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});