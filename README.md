📌 ESPORTSDB - Database Setup & Server Execution

This guide provides instructions to set up a PostgreSQL database, install necessary packages, and run the Node.js API using Sequelize and TypeScript.

📦 1. Install Dependencies

Before setting up the database, install the required dependencies using npm:

npm install

Or if using Yarn:

yarn install

🛠 2. Setup PostgreSQL Database

You can create the PostgreSQL database manually or automatically using Sequelize.

✅ Option 1: Manually Create the Database

Run the following command in the terminal to access PostgreSQL:

sudo -u postgres psql

Then create the database:

CREATE DATABASE ESPORTSDB;

Exit psql:

\q

🚀 4. Run the Server

Use nodemon to start the server:

npm run dev

Or directly run:

npx ts-node src/server.ts
