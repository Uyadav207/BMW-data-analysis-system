// Import necessary modules
const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original filename
    }
  });
  
  const upload = multer({ storage: storage });

// PostgreSQL connection configuration
const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define File model
const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

// Sync model with database
sequelize.sync();

// Endpoint for uploading CSV files
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = file.path;
  const data = [];

  try {
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(csvParser())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        try {
          const newFile = await File.create({ filename: file.originalname, data: JSON.stringify(data) });
          res.json(newFile);
          console.log(newFile);
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

app.get('/files', async (req, res) => {
    try {
      const files = await File.findAll();
      res.json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).send('Error fetching files');
    }
  });

  // Endpoint to get file data by ID
app.get('/files/:id', async (req, res) => {
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
  
  // Endpoint to get file by ID
  app.get('/files/:id/download', async (req, res) => {
    const fileId = req.params.id;
  
    try {
      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).send('File not found.');
      }
      const filePath = `uploads/${file.filename}`;
      res.download(filePath);
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).send('Error fetching file.');
    }
  });


 // Endpoint to delete file by ID
app.delete('/files/:id', async (req, res) => {
    const fileId = req.params.id;
  
    try {
      const file = await File.findByPk(fileId);
      if (!file) {
        return res.status(404).send('File not found.');
      }
      // Delete file from the filesystem
      const filePath = `uploads/${file.filename}`;
      fs.unlinkSync(filePath);
  
      // Delete file from the database
      await file.destroy();
  
      // Check if uploads folder is empty
      const filesInUploads = fs.readdirSync('uploads');
      if (filesInUploads.length === 0) {
        fs.rmdirSync('uploads');
      }
  
      res.send('File deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).send('Error deleting file.');
    }
  });
  
  
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
