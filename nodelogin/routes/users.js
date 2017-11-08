var express = require('express');
var router = express.Router();
//var ejs = require("ejs");
var mysql = require('./mysql');
var multer = require('multer');
var glob = require('glob');
var path = require('path');
var passport = require('passport');
require('./passport');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
const fs = require('fs');
const fse = require('fs-extra');
var kafka = require('./kafka/client');

var algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //var path = './public/uploads/'+req.body.email+'/';
        //console.log('this is storage destination' + req.body.email);
        //let path = './public/uploads/'+req.body.email+'/';
        cb(null, './public/uploads/');
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

router.post('/files', function (req, res, next) {
    kafka.make_request('list_topic',req.body.username, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                //  done(null,true,results/*{username: username, password: password}*/);
                console.log(results.value);
                var resarr = [];
                var res1 = results.value;
                //  if(res1.length!== 0)
                //  {
                resarr = res1.split('<br>');
                res1.length = res1.length-1;
                console.log(resarr);
                //   }
                res.status(201).send({files: resarr});
            }
        }
    });

    /*var resArr = [];
    var reqUsername = req.body.username;
    var pathtoFiles ="public/uploads/"+reqUsername+"/!*";
    console.log(pathtoFiles);
    glob(pathtoFiles, function (er, files) {


        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON = file.split('/')[3];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });*/

});


router.get('/download/:username/:filename', function (req, res, next) {
	var filepath = "./public/uploads/"+req.param("username")+'/'+req.param("filename");
	//console.log("test");
	//console.log(req.param("filename"));
     res.download(filepath);

});

router.post('/doLogin', function (req, res) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        req.session.user = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        return res.status(201).send({username:"test"});
    })(req, res);
});

router.post('/doSignup', function (req, res, next) {
    passport.authenticate('signup', function(err, user) {
        if(err) {
            res.status(500).send();
        }
        if(!user) {
            res.status(401).send();
        }

        else{
            req.session.user = user.username;
            console.log(req.session.user);
            console.log(user);
            console.log(user.firstname);
            console.log(user.lastname);

            console.log("session signup");
            return res.status(201).send({username:"test"});
            //   res.redirect('/');
        }
    })(req, res);

});

router.post('/doShare', function (req, res, next) {

    var emails = req.body.emails;
    var email = emails.split(',');
    var sourcefile = path.join(__dirname,'..','public','uploads',req.body.username,req.body.activeItemName);
    var destfile;
    //console.log(req.mySession.email);

        mysql.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }
            for(i = 0; i < email.length; i++) {
                var destfile = path.join(__dirname,'..','public','uploads',email[i],req.body.activeItemName);
                var getUser = "insert into sharedFolders(folderName, email, isDeleted) values ('" + req.body.activeItemName + "','" + email[i] + "',1)";
                console.log("Query is:" + getUser);
                connection.query(getUser);

                fse.copy(sourcefile, destfile, err => {
                    if (err) return console.error(err)
                    console.log('success!')
                });
            }
            connection.release();
                if (!err) {
                    res.status(201).json({message: "Sharing successful"});
                }
            connection.on('error', function (err) {
                throw err;
                return;
            });
        });

});


router.post('/upload', upload.any(), function (req, res, next) {
    var email = req.body.email;
    //console.log('this is the file name'+req.file);
    var pathtoFiles ="public/uploads/*";
    var resArr;
    glob(pathtoFiles, function (er, files) {


        resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON = file.split('/')[2];
            imgJSON.cols = 2;
            return imgJSON;
        });

    console.log('first file'+resArr[0]);
    for(i = 0; i < resArr.length; i++)
    {
        console.log('this is outside if'+resArr[i].search(".com"));
        if(resArr[i].search(".com")===-1) {
            var sourcePath = path.join(__dirname,'..','public','uploads',resArr[i]);
            var destPath = path.join(__dirname,'..','public','uploads',req.body.email,resArr[i]);
            console.log('this is inside if'+resArr[i]);
            console.log(sourcePath);
            console.log(destPath);
            fse.move(sourcePath, destPath, function (err) {
                if (err) return console.error(err)
                console.log("success!");
            });
            break;

        };
    }});

        /*var sourcePath = 'C:/My Projects/DropboxWithExpressAndReact/nodelogin/public/uploads/' + resArr[0];
        var destPath = 'C:/My Projects/DropboxWithExpressAndReact/nodelogin/public/uploads/' + req.body.email + '/' + resArr[0];*/


    res.status(204).json({email: email});
});

module.exports = router;
