const express = require('express');
const fs = require('fs');
const File = require('../models/File');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).send('File not found.');
    }
    res.json(file);
  } catch (error) {
    console.error('Error fetching file data:', error);
    res.status(500).send('Error fetching file data.');
  }
});

router.get('/', async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files.');
  }
});

router.delete('/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).send('File not found.');
    }

    fs.unlinkSync(file.filePath);
    await file.destroy();
    res.send('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Error deleting file.');
  }
});

router.delete('/', async (req, res) => {
  try {
    await File.destroy({ where: {} });
    console.log('All files deleted from the database.');

    const filesInUploads = fs.readdirSync('uploads');
    if (filesInUploads.length === 0) {
      fs.rmdirSync('uploads');
      console.log('Uploads folder deleted as it became empty.');
    }

    res.send('All files deleted successfully.');
  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).send('Error deleting files.');
  }
});

module.exports = router;
