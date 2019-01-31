const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client'));

app.post('/upload_json', (req, res) => {
  console.log(req.body);
});


app.listen(port, () => console.log(`Challenge 2 app listening on port ${port}!`));