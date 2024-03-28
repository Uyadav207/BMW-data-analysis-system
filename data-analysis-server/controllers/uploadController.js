const express = require('express');
const multer = require('multer');
const fastcsv = require('fast-csv');
const fs = require('fs');
const File = require('../models/File');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const CHUNK_SIZE = 2 * 1024 * 1024;

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = file.path;
  const data = [];

  try {
    const fileStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });
    fastcsv.parseStream(fileStream, {headers: true, encoding: 'utf8'})
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        try {
          const newFile = await File.create({ filename: file.originalname, data: JSON.stringify(data), filePath: file.path });
          res.json(newFile);
        } catch (error) {
          console.error('Error saving file to database:', error);
          res.status(500).send('Error saving file to database');
        }
      });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).send('Error reading CSV file');
  }
});

module.exports = router;
