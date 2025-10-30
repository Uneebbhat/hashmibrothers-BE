import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_PORT = process.env.NODEMAILER_PORT;
const NODE_HOST = process.env.NODEMAILER_HOST;
const NODE_SERVICE = process.env.NODEMAILER_SERVICE;
const NODE_USER = process.env.NODEMAILER_USER;
const NODE_PASS = process.env.NODEMAILER_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;

export {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  NODE_PORT,
  NODE_HOST,
  NODE_SERVICE,
  NODE_USER,
  NODE_PASS,
  FRONTEND_URL,
};
