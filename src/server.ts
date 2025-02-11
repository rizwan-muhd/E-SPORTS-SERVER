import app from "./app"; // Import the configured Express app
import { connectDB } from './config/Database'

const PORT = process.env.PORT || 7010;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});