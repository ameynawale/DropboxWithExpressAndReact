var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
const fs = require('fs');
const fse = require('fs-extra');
var path = require('path');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        //   process.nextTick(function(){
        coll.findOne({username: msg.username}, function(err, user){
            if (err) {
                res.value = err;
                res.code = '500';


            }
            if (user)
            {
                coll.updateOne(
                    {username: msg.username},
                    {
                        $set: {password: msg.password, firstname: msg.firstname, lastname: msg.lastname}
                    }
                );

                res.value =  msg;
                res.code = 200;

            }
            console.log("inside try:" + res);
            callback(null, res);
        });
        //  done (null, {username:username, password:password, firstname:req.body.firstname, lastname: req.body.lastname});


    });
}



exports.handle_request = handle_request;