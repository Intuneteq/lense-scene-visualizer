import dotenv from "dotenv";
dotenv.config();


type ConfigSchema = {
  baseUrl: string;
};

const config: ConfigSchema = {
  baseUrl: process.env.API_URL || "",
};

export default config;
