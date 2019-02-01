var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var port = 3000;

app.use(bodyParser.json());

app.post('/', function(req, res) {
  fs.open(path.join(__dirname + '/final.csv'), 'w', (err, file) => {
    if (err) throw err;

    var body = req.body.text;
    if (body[body.length - 1] === ';') {
      body = body.slice(0, -1)
    };
    var data = JSON.parse(body);

    var sep = ',';
    var header = '';
    for (key in data) {
      if (key !== 'children') {
        header = header + key + sep;
      };
    };
    header = header.slice(0, -1) + '\n';
    fs.appendFile('final.csv', header, () => {

      var rows = '';
      var recurse = function(data) {
        if (!data.children) {
          return;
        }
        var row = '';
        for (key in data) {
          if (key !== 'children') {
            row = row + data[key] + sep;
          }
        }
        row = row.slice(0, -1) + '\n';
        rows = rows + row;
        for (var i = 0; i < data.children.length; i++) {
          recurse(data.children[i]);
        }
      }
      recurse(data);


      fs.appendFile('final.csv', rows, () => {
        // Send Data Back to Client
        fs.readFile(path.join(__dirname + '/final.csv'), (err, data) => res.send(data));
      });
    });
  }); //EOF fs.open
}); //EOF app.post /

app.get('/download', (req, res) => {
  res.setHeader('Content-disposition', 'attachment; filename=final.csv');
  res.set('Content-Type', 'text/csv');
  res.download(__dirname + '/final.csv', 'final.csv')
});

app.use(express.static(path.join(__dirname, 'client')));
app.listen(port, () => console.log(`Challenge 2 app listening on port ${port}!`));

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
// You may also assume that child records in the JSON will always be in a property called `children`.