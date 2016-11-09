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
/*
app.get('/article-two', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});*/
app.get('/ui/article-two.html', function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/ui/article.html', function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'article.html'));
});


app.get('/article-three', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});



function createTemplate(data)
{
    var blog= data.blog;
    var btime=data.btime;
    var htmlTemplate=`
        
        ${blog}
    `
    return htmlTemplate;
}


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

app.get('/articl', function (req, res) {
    pool.query('SELECT * FROM blogs', function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }else{
            var data=result.rows[0];
            res.send(createTemplate(data));
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
