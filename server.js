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
        
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>
<body>

<div class="container-fluid">
    <div class="row content">
        <div class="col-sm-3 sidenav">
            <h4>Vishal Raman's Blog</h4>
            <ul class="nav nav-pills nav-stacked">
                <li class="active"><a href="#section1">Home</a></li>
                <li><form action="submit_comment.php" method="post">
                        <input type="submit" name="logout" value="logout"/>
                    </form></li>

            </ul><br>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search Blog..">
                <span class="input-group-btn">
          <button class="btn btn-default" type="button">
            <span class="glyphicon glyphicon-search"></span>
          </button>
        </span>
            </div>
        </div>

        <div class="col-sm-9">
            <h4><small>RECENT POSTS</small></h4>
            <hr>
            <h2>I Love Food</h2>
            <h5><span class="glyphicon glyphicon-time"></span> Post by Jane Dane, Sep 27, 2015.</h5>
            <h5><span class="label label-danger">Food</span> <span class="label label-primary">Ipsum</span></h5><br>
            <p>Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <br><br>

            <h4><small>RECENT POSTS</small></h4>
            <hr>
            <h2>Officially Blogging</h2>
            <h5><span class="glyphicon glyphicon-time"></span> Post by John Doe, Sep 24, 2015.</h5>
            <h5><span class="label label-success">Lorem</span></h5><br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <hr>

            <h4>Leave a Comment:</h4>
            <form role="form" action="submit_comment.php" method="post">
                <div class="form-group">
                    <input type="hidden" name="username" value="<?php echo $_SESSION['username']; ?>">
                    <textarea name="comment_area" value="" class="form-control" rows="3" required></textarea>
                </div>
                <input type="submit" value="Comment" name="press_comment" class="btn btn-success"/>
            </form>
            <br><br>

            <p><span class="badge">
                    8
                </span> Comments:</p><br>

            <div class="row">
                
                <div class="col-sm-2 text-center">
                    <img src="/ui/user.png" class="img-circle" height="65" width="65" alt="">
                </div>
                <div class="col-sm-10">
                    <h4> <small>heading ${btime}</small></h4>
                    <p>para</p>
                    <br>
                </div>
               

            </div>
        </div>
    </div>
</div>

<footer class="container-fluid">
    <p>Footer Text</p>
</footer>

</body>
</html>

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

app.get('/blogT', function (req, res) {
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
