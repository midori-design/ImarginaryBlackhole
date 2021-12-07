var express = require('express');
var ejs = require('ejs');

var app_form = express();
app_form.engine('ejs', ejs.renderFile);
app_form.use(express.static('public'));

app_form.get('/', (req, res) => {
  var msg = "Please enter your number.";
  res.render('form.ejs',
      {
        title: 'Index',
        content: msg
      });
});

var server_form = app_form.listen(3000, function(){
  console.log('POST form PORT : ' + server_form.address().port);
});