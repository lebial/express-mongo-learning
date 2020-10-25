const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route Files
const bootCamps = require('./routes/bootcamps');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.use('/api/v1/bootcamps', bootCamps);

app.listen();
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
