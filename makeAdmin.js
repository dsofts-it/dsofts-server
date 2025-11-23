import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Update user role to admin
const makeAdmin = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      return;
    }

    user.role = 'admin';
    await user.save();

    console.log(`✅ User ${user.name} (${user.email}) is now an admin!`);
  } catch (error) {
    console.error('❌ Error updating user role:', error.message);
  }
};

// Main function
const main = async () => {
  await connectDB();

  // Get email from command line argument
  const email = process.argv[2];

  if (!email) {
    console.log('❌ Please provide an email address');
    console.log('Usage: node makeAdmin.js <email>');
    process.exit(1);
  }

  await makeAdmin(email);
  
  mongoose.connection.close();
  console.log('🔌 Database connection closed');
};

main();
