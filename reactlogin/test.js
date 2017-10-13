var http = require('http');
var assert = require('assert');
var should = require('should');

var expect = require('chai').expect;
//var server = require('./server');
var request = require('supertest');

var server = require('./bin/www');

const userCredentials = {
    username: 'f@l.com',
    password: 'password'
}

var authenticatedUser = request.agent(server);

describe('Server test', function(){

    /*before(function(){
        server.listen(3001);
    })*/

    describe('Log in', function(){
        it('should log in the user successfully', function(done){

            authenticatedUser
                .post('/users/doLogin')
                .send(userCredentials)
                .end(function(err, response){
                    expect(response.statusCode).to.equal(201);
                    expect('Location','/home');
                    done();
                });


        });
    });

    describe('Sign up', function(){
        it('should register the user successfully', function(done){
            const newUser = {
                firstname: 'first',
                lastname: 'last',
                email: 'first@last.com',
                password: 'password'
            }
            authenticatedUser
                .post('/users/doSignup')
                .send(newUser)
                .end(function(err, response){
                    expect(response.statusCode).to.equal(201);
                    expect('Location','/login');
                    done();
                });


        });
    })
})