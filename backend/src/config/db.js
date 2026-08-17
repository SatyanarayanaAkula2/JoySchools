import mongoose from "mongoose";

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in the environment.");
    process.exit(1);
  }

  // Handle placeholders gracefully (e.g. if database password hasn't been set yet)
  if (uri.includes("<db_password>")) {
    console.warn("WARNING: MONGODB_URI contains a placeholder '<db_password>'. Database operations might fail until credentials are configured.");
  }

  try {
    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Database connection failed:", error);
    // Do not crash the application during build/setup if database is not reachable,
    // just warn and let it continue.
    console.warn("Continuing server start with offline fallback status.");
  }
}
