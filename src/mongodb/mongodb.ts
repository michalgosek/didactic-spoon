import { config } from "../config/config";
import mongoose from 'mongoose';

const options = {
  autoIndex: false, // Don't build indexes
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

export async function Connect() {
  mongoose.connect(config.get().db.host, options)
    .then(result => {
      console.info("MongoDB client successfully connected...");
      console.log("Loaded config: ", config.get().db)
    }).catch((err: Error) => {
      console.error("There was an error during MongoDB Connection");
      console.error("Reason: ", err.message);
    });
}

export async function Disconnect() {
   mongoose.disconnect()
   .then((result) => {
    console.info("MongoDB client successfully disconnected...");
   })
   .catch((err: Error) => {
      console.error("There was an error during MongoDB Disconnect");
      console.error("Reason: ", err.message);
   });
}
