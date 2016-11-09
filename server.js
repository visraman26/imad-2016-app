var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var Pool = require('pg').Pool;

var config = {
    user: 'visraman26',
    database: 'visraman26',
    host: 'db.imad.hasura-app.io',
    port : '5432',
    password: process.env.DB_PASSWORD
 
};
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});



var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});


var pool=new Pool(config);

app.get('/test', function (req, res) {
    pool.query('SELECT * FROM login', function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
   
});

app.get('/article-one', function (req, res) {
    pool.query('SELECT * FROM blogs', function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }else{
            res.send(JSON.stringify(result.rows[0]));
        }
        
    });
   
});










app.get('/ui/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/my1.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'my1.jpg'));
});
app.get('/ui/blog.html', function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
    console.log(`IMAD course app listening on port ${port}!`);
});
