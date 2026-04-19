import mongoose from "mongoose";

const contectDB = async () => {
  let dbString = "";

  try {
    if (process.env.NODE_MOOD === "development") {
      dbString = process.env.MONGODB_URL || "";
    } else {
      dbString = process.env.MONGODB_ALTALS || "";
    }

    const dbconnected = await mongoose.connect(dbString);
    console.log("Conntected Successfully to the ", dbconnected.connection.host);
  } catch (error) {
    console.log("DB Connection Error :", error);
    process.exit(1);
  }
};

export default contectDB;