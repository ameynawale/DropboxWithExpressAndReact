var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

//module.exports = function(passport) {
passport.use('login', new LocalStrategy(function(username , password, done) {
    console.log('in passport');
    kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 200){
                done(null,true,{username: username, password: password/*"bhavan@b.com",password:"a"*/});
            }
            else {
                done(null,false);
            }
        }
    });
    /*try {
        if(username == "bhavan@b.com" && password == "a"){
            done(null,{username:"bhavan@b.com",password:"a"});
        }
        else
            done(null,false);
    }
    catch (e){
        done(e,{});
    }*/
}));

/*passport.use('list', new LocalStrategy(function(username , password, done) {
    console.log('in passport');
    kafka.make_request('list_topic',{"username":username,"password":password}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err);
        }
        else
        {
            if(results.code == 200){
                done(null,true,results/!*{username: username, password: password}*!/);
            }
            else {
                done(null,false);
            }
        }
    });

}));*/

//};

passport.use('signup', new LocalStrategy({
        usernameField : 'username',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {

        kafka.make_request('signup_topic',{"username":username,"password":password, "firstname": req.body.firstname, "lastname": req.body.lastname}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){

                    done(null,true,{username: username, password: password, firstname: req.body.firstname, lastname:req.body.lastname/*"bhavan@b.com",password:"a"*/});
                }
                else {
                    done(null,false);
                }
            }
        });
        /*try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('login');
                //   process.nextTick(function(){
                coll.findOne({username: req.body.username}, function(err, user){
                    if (err) {
                        done(err);
                    }
                    if (user)
                    {
                        done(null, false, /!*req.flash('signupMessage', 'the email already taken')*!/);
                    }
                    else
                    {

                        var myobj = {  username: req.body.username, password: req.body.password, firstname:req.body.firstname, lastname: req.body.lastname };
                        coll.insertOne(myobj, function(err, u) {
                            if (err) return err;
                            console.log("1 document inserted");
                            //  coll.close();
                            /!*if(u)
                                {
                              done(null, true);
                                }*!/
                        });
                        done (null, {username:username, password:password, firstname:req.body.firstname, lastname: req.body.lastname});
                        /!* var newUser= new user();
                         newUser.username = username;
                         newUser.password = password;
                         newUser.firstname = firstname;
                         newUser.lastname = lastname;
                         newUser.save(function(err){
                             if(err)
                                 throw err;
                             return done(null, newUser);
                         })*!/

                    }
                });
                //  });
            });
            // process.nextTick();

        }
        catch (e){
            console.log("in catch");
            done(e,{});
        }*/
    }));
