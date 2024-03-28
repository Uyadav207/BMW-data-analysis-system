const express = require('express');
const cors = require('cors');
const compression = require('compression');
const uploadController = require('./controllers/uploadController');
const fileController = require('./controllers/fileController');

const app = express();
app.use(cors());
app.use(compression());
const PORT = process.env.PORT || 8000;

app.use('/upload', uploadController);
app.use('/files', fileController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});