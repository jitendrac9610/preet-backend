const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Dummy user authentication
  if (email === 'user@example.com' && password === 'password') {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: 'Invalid email or password' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
