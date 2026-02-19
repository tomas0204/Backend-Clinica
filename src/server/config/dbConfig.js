import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.info("BD Conectada");
  } catch (error) {
    console.error("Error conectando a la BD:", error);
    process.exit(1);
  }
};

export default connectDB;
