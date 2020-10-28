const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database 
connectDB();

// Route Files
const bootCamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// file uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

// Mount Router
app.use('/api/v1/bootcamps', bootCamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close Server & exit process
  server.close(() => process.exit(1));
})
