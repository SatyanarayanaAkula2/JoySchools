const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Manually parse .env file
try {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#") && trimmedLine.includes("=")) {
        const index = trimmedLine.indexOf("=");
        const key = trimmedLine.substring(0, index).trim();
        const value = trimmedLine.substring(index + 1).trim();
        process.env[key] = value;
      }
    });
  }
} catch (e) {
  console.warn("Could not read .env file:", e);
}

const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI:", MONGODB_URI ? "Found (masked for security)" : "NOT FOUND");
console.log("ADMIN_INIT_USERNAME:", process.env.ADMIN_INIT_USERNAME);

async function test() {
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env file.");
    process.exit(1);
  }

  try {
    console.log("Attempting database connection...");
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("SUCCESS: Database connected successfully!");

    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections present in database:");
    collections.forEach(col => console.log(` - ${col.name}`));

    // Check admin users
    const AdminSchema = new mongoose.Schema({ username: String, role: String }, { strict: false });
    const AdminModel = mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admins");
    const count = await AdminModel.countDocuments();
    console.log(`Total admin users found: ${count}`);

    const admins = await AdminModel.find({}).lean();
    console.log("Admin accounts registered:");
    admins.forEach(admin => console.log(` - username: "${admin.username}", role: "${admin.role}"`));

    process.exit(0);
  } catch (error) {
    console.error("FAILURE: Database connection or query failed!");
    console.error("Error Details:", error);
    process.exit(1);
  }
}

test();
