//var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
/*function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'Ammu@321',
	    database : 'sys',
	    port	 : 3306
	});
	return connection;
}*/

var pool = mysql.createPool({
    connectionLimit: 5,
    host     : 'localhost',
    user     : 'root',
    password : 'Ammu@321',
    database : 'sys',
    port	 : 3306
})
/*
function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;*/

module.exports = pool;