const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

const ConnectTodatabase = require('./config/db-config');
ConnectTodatabase();

const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const ownerRoute = require('./routes/owner-route');

app.use('/', indexRoute);
app.use('/api/user', userRoute);
app.use('/api/owner', ownerRoute);

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})