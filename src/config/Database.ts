import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME || "esportsdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "password@2025",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    logging: false, // Disable logging (optional)
  }
);

// Function to connect DB
 const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Connection error:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
