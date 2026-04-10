const path = require('path');
// Nạp file .env từ thư mục gốc
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const roleRoutes = require('./routes/roleRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối Database
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/roles', roleRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running 🚀' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);

});