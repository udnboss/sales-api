import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from "csrf-csrf";

require('dotenv').config();

import * as middlewares from './middlewares';
import api from './api/index';
import { MessageResponse } from './api/base';





const API_SECRET_KEY = process.env.API_SECRET_KEY || 'your_secret_key';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const {
  // invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
  // generateToken, // Use this in your routes to provide a CSRF hash cookie and token.
  // validateRequest, // Also a convenience if you plan on making your own middleware.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
  cookieName: "x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
  cookieOptions: {
    sameSite: "lax",  // Recommend you make this strict if posible
    path: "/",
    secure: false,  
  },
  size: 16, // The size of the generated tokens in bits
  ignoredMethods: ["GET", "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => req.headers["x-csrf-token"], // A function that returns the token from the request
});

// app.use(doubleCsrfProtection);
// app.use(middlewares.setCSRFToken);

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    success: true,
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    data: null
  });
});

// app.post('/signup', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   // store the username and hashed password in the database
//   res.status(201).send('User created');
// });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // retrieve the user from the database
  const dbhashedPassword = await bcrypt.hash('skgjhsdgklj', 10);
  const dbuser = 'test';
  const userExists = email == dbuser;
  if (!userExists) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const authorized = await bcrypt.compare(password, dbhashedPassword);
  if (!authorized) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // If the user is found and the password is correct, generate a JWT access token and a refresh token
  const accessToken = jwt.sign({ email }, API_SECRET_KEY, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ email }, API_SECRET_KEY, { expiresIn: '7d' });

  // Generate a SHA-256 hash of the token
  // const accessTokenHash = bcrypt.hashSync(accessToken, 10);
  const refreshTokenHash = bcrypt.hashSync(refreshToken, 10);

  //store it so we can compare against it
  // middlewares.VALID_ACCESS_TOKENS.push(accessTokenHash);
  middlewares.VALID_REFRESH_TOKENS.push(refreshTokenHash);

  // Set the access token and the refresh token in HttpOnly and secure cookies
  res.cookie('x-access-token', accessToken, { httpOnly: true, secure: false });
  res.cookie('x-refresh-token', refreshToken, { httpOnly: true, secure: false });

  res.header('x-access-token', accessToken);
  res.header('x-refresh-token', refreshToken);

  // Return a success message in the response
  res.json({ success: true, data: null, message: 'Login successful' });

});

// Define a /refresh endpoint that expects a valid refresh token in an HttpOnly and secure cookie
// and returns a new JWT access token in an HttpOnly cookie if the refresh token is valid
app.post('/refresh', (req, res) => {
  // Get the refresh token from the cookie
  const refreshToken:string = req.cookies['x-refresh-token'];

  // If there is no refresh token, return an error
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Missing refresh token',
      data: null
    });
  }

  //check if revoked
  if (!middlewares.VALID_REFRESH_TOKENS.includes(refreshToken)) {
    return res.status(403).json({
      success: false,
      message: 'Revoked refresh token',
      data: null
    });
  }


  // Verify the refresh token using the secret key
  var payload;
  try {
    payload = jwt.verify(refreshToken, API_SECRET_KEY);
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token',
      data: null
    });
  }

  // If the verification succeeds, generate a new access token with the same user data as before
  const accessToken = jwt.sign(payload, API_SECRET_KEY, { expiresIn: '15m' });

  // Set the new access token in an HttpOnly and secure cookie
  res.cookie('x-access-token', accessToken, { httpOnly: true, secure: false });
  res.set('x-access-token', accessToken);
  // Return a success message in the response
  res.json({ success: true, data: accessToken, message: 'Access token refreshed' });
});

//tester
app.get('/protected', middlewares.authenticate, (req, res) => {
  res.send('Protected resource');
});


app.use('/api/v1', api);

import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import YAML from 'yaml';
const file = fs.readFileSync('./openapi/spec.yml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
