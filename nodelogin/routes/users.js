var express = require('express');
var router = express.Router();
//var ejs = require("ejs");
var mysql = require('./mysql');
var multer = require('multer');
var glob = require('glob');
var path = require('path');
const fs = require('fs');

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
/*router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});*/

router.get('/', function (req, res, next) {
    var resArr = [];
    //var reqUsername = req.body.username;
    var pathtoFiles ="public/uploads/*";
    glob(pathtoFiles, function (er, files) {


        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON = file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    }); 
	/*
	var response = "";
	testFolder = "../public/uploads";
	console.log(testFolder);
	fs.readdir(testFolder, function (err, files) 
	{
		console.log(files.length);
		console.log(files);
		for(var i=0;i<files.length;i++)
		{
			response += files[i]+"<br>";
		}
		res.status(200).send(response);
	}); */

});

router.get('/download/:filename', function (req, res, next) {
	var filepath = "./public/uploads/"+req.param("filename");
	//console.log("test");
	//console.log(req.param("filename"));
     res.download(filepath);

});
    router.post('/doLogin', function (req, res, next) {
	console.log("i am here");
	 var reqUsername = req.body.username;
	 var reqPassword = req.body.password;
	var getUser="select * from users where email='"+reqUsername+"' and pass='" + reqPassword +"'";
	console.log("Query is:"+getUser);
	mysql.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(getUser,function(err,rows){
            connection.release();
            if(!err) {
            	console.log(getUser);
                res.status(201).json({message:"valid login"});
            }
        });
        connection.on('error', function(err) {
            throw err;
            return;
        });
    });
   

});

router.post('/doSignup', function (req, res, next) {

  /*  var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var reqfirstname = req.body.firstname;
    var reqlastname = req.body.lastname;
    var reqemail = req.body.email;
    var reqpassword = req.body.password; */
    // Just checking if the username is in our user's array
 /*   var theUser = users.filter(function(user){
        return user.username === reqUsername;
    }); */
    var getUser="insert into users(email, pass, firstname, lastname) values ('"+req.body.email+"','" + req.body.password+"','" + req.body.firstname+"','" + req.body.lastname+"')";
	console.log("Query is:"+getUser);
	
	var Ufolder = '../public/uploads/'+req.body.email;
	const dir = path.join(__dirname,Ufolder);
	const mkdirSync = function (dirPath) {
		  try {
		    fs.mkdirSync(dirPath)
		  } catch (err) {
		    if (err.code !== 'EEXIST') throw err
		  }
		};
	/*mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			
			console.log("The registration has been successful, please log in");
				console.log("valid Login");
				mkdirSync(dir);
				   
			            res.status(201).json({message:"The registration has been successful, please log in"});
			       
			}
			
			    
			},getUser);*/

    mysql.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(getUser,function(err,rows){
            connection.release();
            if(!err) {
                console.log("The registration has been successful, please log in");
                console.log("valid Login");
                mkdirSync(dir);

                res.status(201).json({message:"The registration has been successful, please log in"});
            }
        });
        connection.on('error', function(err) {
            throw err;
            return;
        });
    });
		
    // Check the password
  //  if(theUser.length === 1){
    //    theUser[0].password === reqPassword &&
      //  res.status(201).json({message: "Login successful"}) ||
       // res.status(401).json({message: "Login failed"});
   // } else {
   //     res.status(401).json({message: "Login failed"});
 //   }
    

    // if(theUser.password === reqPassword){
    //     res.status(201).json({message: "Login successful"});
    // } else {
    //     res.status(401).json({message: "Login failed"});
    // }

}); 
router.post('/upload', upload.any(), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});

module.exports = router;
