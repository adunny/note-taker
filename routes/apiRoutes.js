const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log('couldnt read notes');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: shortid.generate()
        };


        // get existing notes
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
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
});

module.exports = router;