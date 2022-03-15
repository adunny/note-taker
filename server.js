const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');

// npm package that generates a short random ID
const shortid = require('shortid');

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});







app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/ is live!`);
});