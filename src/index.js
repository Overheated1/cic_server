import express from "express";
import compression from "compression";
import cors from "cors";
import nodemailer from "nodemailer";
import { PORT } from "./config.js";
import "./validations.js";

import userRoutes from "./api/routes/users.routes.js";
import determinationsRoutes from "./api/routes/determinations.routes.js";
import deviationsRoutes from "./api/routes/deviations.routes.js";
import institutionsRoutes from "./api/routes/institutions.routes.js";
import repeatabilityRoutes from "./api/routes/repeatability.routes.js";
import reproducibilityRoutes from "./api/routes/reproducibility.routes.js";
import serumsRoutes from "./api/routes/serums.routes.js";
import databaseRoutes from "./api/routes/database.routes.js";
import rolesRoutes from "./api/routes/roles.routes.js";
import templateRoutes from "./api/routes/template.routes.js";
import fieldsRoutes from "./api/routes/fields.routes.js";
import samplesRoutes from "./api/routes/samples.routes.js";

import express_session from "express-session";
import userApi from "./api/user.js";
import bodyParser from "body-parser";
import { updateQueryLogs } from "./api/utils/utils.js";


var errorCodes = [];

const app = express();

try{

    //middleware
    app.use(cors({ origin: `http://localhost:3000`,credentials: true }));
    app.use(express_session({ secret: 'keyboard cat',resave: false, saveUninitialized: true ,})); 
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(compression());
    app.use(userApi);
    app.use(userRoutes);
    app.use(determinationsRoutes);
    app.use(deviationsRoutes);
    app.use(institutionsRoutes);
    app.use(repeatabilityRoutes);
    app.use(reproducibilityRoutes);
    app.use(serumsRoutes);
    app.use(databaseRoutes);
    app.use(rolesRoutes);
    app.use(templateRoutes);
    app.use(fieldsRoutes);
    app.use(samplesRoutes);

    
    //ERROR CODES
    //0 -. OK
    //1 -> INVALID USERNAME
    //2-> INVALID CI
    
    //ROUTES
    
    
    // Configuración de Nodemailer
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: "ballesterfrank263@gmail.com",
            pass: "uztd zdfy hdsi fvli"  
    
        }
    });
    
    
    
    // Ruta para enviar el correo
    app.get('/send-email', (req, res) => {
        const mailOptions = {
            from: "ballesterfrank263@gmail.com",
            to: "ballesterfrank263@gmail.com",//lauragilgarcia43@gmail.com
            subject: 'Test Email',
            text: 'OK all right, yeah it\'s me'
        };
    
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.send('Error al enviar el correo');
            } else {
                console.log('Correo enviado: ' + info.response);
                res.send('Correo enviado correctamente');
            }
        });
    });
    
    
    
    app.listen(PORT, () => {
        console.log("server has started on port " + PORT);
    })
    
}catch(error){
    console.error("error");
    updateQueryLogs("error");
}

export default app;