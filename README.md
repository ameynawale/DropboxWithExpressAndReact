# DropboxWithExpressAndReact

This project is a Dropbox-like application built with Express.js for the backend and React.js for the frontend. It supports user authentication, file uploads, starred files, recent files, and sharing functionality.

## Prerequisites

- Node.js (v10+ recommended)
- MySQL

## Database Setup

Run the following queries in your MySQL database to create the required tables:

```sql
CREATE TABLE users (
  firstName VARCHAR(25),
  lastName VARCHAR(25),
  email VARCHAR(25),
  pass VARCHAR(25)
);

CREATE TABLE sharedFolders (
  id VARCHAR(25),
  folderName VARCHAR(50),
  email VARCHAR(50),
  isStarred BOOLEAN,
  isDeleted BOOLEAN
);
```

## Backend Setup

1. Navigate to the `nodelogin` directory in your command prompt.
2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

## Frontend Setup

1. Navigate to the `reactlogin` directory in your command prompt.
2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

## Running Tests

To run the Mocha tests for the backend:

1. Navigate to the `nodelogin` directory in your command prompt.
2. Execute the following command:

   ```bash
   npm test
   ```

   > **Note:** One test in the Mocha test suite is deliberately changed to expect a different output to demonstrate the output when the test fails.