import express from 'express';

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if set, or default to 3000

// Define routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
