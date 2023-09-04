import mongoose from 'mongoose';
const connect = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1/reciepies', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connection successful");
    } catch (error) {
      console.error("Error in connection: " + error);
    }
  }

 

export default connect;