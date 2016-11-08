var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne={
    title:'Article-one',
    heading:"Article-one",
    date:'sept 28,2016',
    content:`
                <p>
                    This is the first article.My name is Deepak Kumar Goyal.
                </p>
                <p>
                    This is the first article.My name is Deepak Kumar Goyal.
                </p>
                <p>
                    This is the first article.My name is Deepak Kumar Goyal.
                </p>`
    
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var date=data.date;
    
    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width,initial-scale-1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
                </div>
                
        </body>
    </html>
    return htmlTemplate;

`;
}

    


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','article-three.html'));
});

app.get('/ui/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name',function(req,res){//url submit-name?name=xxxx
    //get the name form the requesst
    var name=req.query.name;
    names.push(name);
    //JSON javascript object notation
    res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
