const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

const myExternalAdapter = require('./adapter').myExternalAdapter;

app.use(express.json());

app.post('*', myExternalAdapter(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
