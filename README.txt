Run the following queries in the MySQL DB:
1. create table users(firstName varchar(25), lastName varchar(25), email varchar(25), pass varchar(25));

2. create table sharedFolders(id varchar(25), folderName varchar(50), email varchar(50), isStarred boolean, isDeleted boolean);

3. Change the password of the database in the mysql file of nodelogin routes to your password so that it will successfully connect to the database at runtime.

Go to nodelogin folder in command prompt and execute following command:
1. npm install
2. npm start

Go to reactlogin folder in command prompt and execute following command:
1. npm install
2. npm start

For mocha tests, go to nodelogin folder in command prompt and execute following command:
1. npm test

Note: One test in the mocha test suite is deliberately changed to expect a different output to demonstrate the output when the test fails.