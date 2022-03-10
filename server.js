const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

// npm package that generates a short random ID
const shortid = require('shortid');

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log('couldnt read notes');
        } else {
            res.json(JSON.parse(data));
        }
    })
});

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: shortid.generate()
        };


        // get existing notes
        fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                //parse existing notes and push the new note into the array
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                //stringify array and write to db.json
                fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 2), (err) => {
                    if (err) {
                        console.log('error writing file');
                    } else {
                        console.log('note written!');
                    }

                });
            };

        });

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);

    } else {
        res.json('error saving note')
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});







app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/ is live!`);
});