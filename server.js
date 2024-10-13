//? Este es el servidor de Node Js que maneja el serivico de envio de correos
//? Daniel no sabe como funciona, pero funciona :/
//? Cualquier duda sobre el funcionamiento de este archivo, consultarlo con el video tutorial para implementar el envio de correos (Notion/Recursos)

import express from 'express'
import cors from 'cors'
import { Resend } from 'resend';

//*-------------------------------------------- Inicio del servidor --------------------------------------------------

// Se crea una instancia de Express
const app = express();
const port = 4000;

// Se inicia la API de resend
const resend = new Resend('re_Kt6oZc1b_Px7byFqxVpQQT6ACJa5hG4EK');

// Inicializa el uso de Cors y Express
app.use(cors());
app.use(express.json());

//*--------------------------------------------------------------------------------------------------------------------


//*-------------------------------------------- Lógica de Solicitud de Envios -----------------------------------------

app.post('/send-email', async (req, res) => {
  console.log('Solicitud recibida en /send-email');
  console.log('Cuerpo de la solicitud:', req.body);

  // Intento de Envio de correo
  try {
    const { email, nombre, numControl, bag } = req.body;

    // Se define el cuerpo del correo a enviar
    const htmlContent = `
      <h1>Confirmación de Pedido</h1>
      <p><b>Nombre: </b>${nombre}</p>
      <p><b>Número de control: </b>${numControl}</p>
      <p><b>Correo electrónico: </b>${email}</p>
      <h3>Pedido: </h3>
      <ul>
        ${bag.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p><b>Número de Confirmación: </b>123456</p>
      <h3>Favor de pasar a Recoger su pedido</h3>
      <i>Para cualquier duda o aclaración, contactenos a servicios@iberopuebla.mx</i>
    `;

    // Se definen los datos del correo a enviar
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmación de Pedido',
      html: htmlContent,
    });

    // Se imprime la respuesta de Resend a la consola
    console.log('Respuesta de Resend:', data);
    res.status(200).json({ message: 'Correo enviado exitosamente', data });

  // Catch de errores
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ 
      message: 'Error al enviar el correo',
      error: error.message
    });
  }
});
//*--------------------------------------------------------------------------------------------------------------------

// Feedback del servidor iniciado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});