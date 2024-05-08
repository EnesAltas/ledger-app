const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const appRoutes = require('./routes/appRoutes');
const connectDB = require('./utils/databaseHelper');
const { notFoundHandler, jsonErrorHandler} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(bodyParser.json());

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/', appRoutes);

app.use(notFoundHandler);
app.use(jsonErrorHandler);

app.listen(PORT, () => console.log(`Server is runnig on port ${ PORT }`));
