const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/repomind';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🍃 Mongoose Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Mongoose Connection Warning: ${error.message}`);
    console.warn(`💡 RepoMind backend operating with Mongoose models & fallback in-memory state.`);
    return null;
  }
};

module.exports = connectDB;
