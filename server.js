const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a new folder with the user's name and last name
    const folderName = 'uploads/' + req.body.name.replace(/\s/g, "_") + '_' + req.body.lastName.replace(/\s/g, "_"); // Replace spaces with underscores
    fs.mkdirSync(folderName, { recursive: true }); // Create folder synchronously, including parent directories if they don't exist
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });

app.post('/submit-payment', upload.single('payment-screenshot'), (req, res) => {
  // Extract form data
  const email = req.body.email;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phone = req.body.phone;

  // Create text file with form data
  const folderPath = req.file.destination;
  const txtFilePath = path.join(folderPath, 'form_details.txt');
  const formData = `Email: ${email}\nName: ${name}\nLast Name: ${lastName}\nPhone: ${phone}`;
  fs.writeFileSync(txtFilePath, formData);

  // Send response
  res.send('Payment submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
