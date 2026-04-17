const path = require('path');
const YAML = require('yamljs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const swaggerDocument = YAML.load(path.join(__dirname, '../api.yaml'));
// Import Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
const PORT = process.env.PORT || 5000;





// --- Middleware ---
app.use(cors());
app.use(express.json());

// Kết nối Database
connectDB();

// --- Giao diện API Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Định nghĩa các Endpoint ---
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);
app.use('/tags', tagRoutes);

// Khởi chạy server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`API Docs available at: http://localhost:${PORT}/api-docs`);
});
