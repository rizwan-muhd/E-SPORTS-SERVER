import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from "passport";
import routes from './routes'
import session from "express-session";
import { googleAuth } from "./services/Auth.Service"; // Import the Google Auth function
import { handleWebhookRequest } from './controllers/stripe.controller';


//IMPORT ROUTES


//CONFIGURATION
dotenv.config();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret", // Use a strong secret
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to `true` if using HTTPS
    })
);
app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookRequest)

app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use(passport.initialize());
app.use(passport.session());

googleAuth()

// ROUTES
app.use('/api/v1', routes)
app.get('/hello', (req, res) => {
    res.send('hello')
})


//SERVICES
export default app; // Export the app