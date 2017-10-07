var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var multer = require('multer');
var glob = require('glob');
var path = require('path');
const fs = require('fs');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
    /*var resArr = [];

    glob("public/uploads/*", function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });*/
    var response = "";
    testFolder = req.param('email');
    console.log(testFolder);
    fs.readdir(testFolder, function (err, files)
    {
        console.log(files.length);
        console.log(files);
        for(var i=0;i<files.length;i++)
        {
            response += files[i]+"<br>";
        }
        res.status(201).send(response);
    });

});

router.post('/upload', upload.any(), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});


router.post('/doLogin', function (req, res, next) {

    var getUser="select * from users where email='"+req.param("username")+"' and pass='" + req.param("password") +"'";
    console.log("Query is:"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length>0) {
                res.status(201).json({message: "Sign In successful!"});
            }
            else{
                res.status(401).json({message: "Sign In failed!"});
            }
        }
    },getUser)}
);

router.post('/doSignUp', function (req,res)
{
    // check user already exists
    var postUser="insert into users (firstName,lastName,email,pass) values ('"+req.body.firstName+"','"+req.param("lastName")+"','"+req.param("email")+"','"+req.param("password")+"')";
    console.log("Query is:"+postUser);
    var userfolder = '../public/uploads/'+req.param("email");
    const dirPath1 = path.join(__dirname,userfolder);
    const mkdirSync = function (dirPath) {
        try {
            fs.mkdirSync(dirPath)
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
    }
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            mkdirSync(dirPath1);

               res.status(201).json({message: "Sign Up successful!"});
        }
    },postUser)}
);


module.exports = router;
