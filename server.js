const express = require('express');
const app = express();

// import routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// endpoints
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/ is live!`);
});