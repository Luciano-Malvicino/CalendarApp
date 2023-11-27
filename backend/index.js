import express from 'express';
import mongoose from 'mongoose';
import User from './models/emucloud.js';
import GameInfo from './models/gameinfo.js';
import bodyParser from 'body-parser'; // Import body-parser to parse incoming JSON data
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import session from 'express-session';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';


const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if set, or default to 3000
const connectionString = 'mongodb://emucloud:%40Letmein@3.81.208.209:27017';
const secretKey = 'Dog-Doggy-Doggy-Dog-Dog';
sgMail.setApiKey('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');
const bucketName = 'savesbucker'

app.use(cors());

app.use(cors({
  origin: '*',
}));

AWS.config.update({
  accessKeyId : 'AKIAYLVON4SUIUQJSU6D',
  secretAccessKey : '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',
  region : 'us-east-1',
});


// Oauth Authentication //

app.use(session({ secret: 'doggy-dog-gonna-dog-dog', resave: false, saveUninitialized: false, cookie : {sameSite : 'None'} }));

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.json());


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const s3 = new AWS.S3();

app.get('/api/listFiles', async (req, res) => {
  try {
    const params = {
      Bucket: 'savesbucker',
    };

    const result = await s3.listObjectsV2(params).promise();
    const files = result.Contents.map((file) => file.Key);

    res.json({ success: true, files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Database Setup //

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      console.log("Attempted");
      console.log(password);
      const user = await User.findOne({username});

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if(!passwordMatch)
      {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }
));

mongoose.connect(connectionString, {dbName : 'emucloud'});
app.use(bodyParser.json());
// Event listeners for connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// Define routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello, Worrldey!');
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internalasdf Server Error' });
  }
});

app.post('/api/Register', async (req, res) => {
  try {
    // Extract user data from the request body
    console.log("Tried to register")

    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUsername = await User.findOne({username});
    const existingEmail = await User.findOne({email});

    console.log(existingUsername);
    console.log(existingEmail);
    // Create a new user instance
    const newUser = new User({
      username,
      password : hashedPassword,
      email,
      date : '2023-11-20T12:00:00.000+00:00',
      reset : false,
      saves : [[],[],[],[],[]]
    });

    console.log("Checking if exist")


    if(existingUsername || existingEmail)
    {
      console.log(existingEmail);
      console.log("This user already exist")
      return(res.json({success:false , existingEmail}));
    }

    console.log("Checking if info valid")
    if(username == "" || password == "" || email == "")
    {
      console.log("This user has no username or password")
      return(res.json({success:false , user : newUser}));
    }
    createFolder(bucketName, username + '/mariobro');
    createFolder(bucketName, username + '/pokemon');
    createFolder(bucketName, username + '/metroid');
    createFolder(bucketName, username + '/mariokart');
    createFolder(bucketName, username + '/zelda');


    // Save the new user to the database
    await newUser.save();

    // Respond with the newly created user
    res.json({success:true , user : newUser});
    console.log(hashedPassword)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function createFolder(bucketName, folderPath) {
    const params = {
      Bucket: bucketName,
      Key: folderPath,
      Body: '', // Body can be empty for a folder
    };

    await s3.upload(params).promise();

    console.log(`Folder "${folderPath}" created successfully in bucket "${bucketName}"`);
}

app.post('/api/Reset', async (req, res) => {
  try {
    const newPassword = req.body.password;
    const token = req.body.token;
    const decodedToken = token.replace(/_/g, '.');
    let userEmail;

    let existing; 

    console.log("Okay were workingish");

    await jwt.verify(decodedToken, secretKey, (err, decoded) => {
      if (err) {
          console.error('Token verification failed:', err.message);
          return res.json({success:false});
      } else {
          userEmail = decoded.email;
          console.log("Entered here");
          console.log(existing);
          
      }
    });

  existing = await User.findOne({email : userEmail}); 
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  existing.password = hashedPassword;

  await existing.save()

  res.json({success : true});
    // Respond with the newly created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', passport.authenticate('local'), (req,res) => {
  res.json({ success: true, user: req.user });
});

app.get('/api/gameinfo', async (req, res) => {
  const { selectedGame } = req.query;
  try {
    const game = await GameInfo.findOne({ game: selectedGame });
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/ForgotLink', async (req, res) => {
  try {

    const email = req.body.email;
    const token = jwt.sign({email:email},secretKey, {expiresIn : '1h' });
    const encodedToken = encodeURIComponent(token);
    const safeencodedToken = encodedToken.replace(/\./g, '_');

    const testEmail = 'This is my email follow this url http://localhost:3001/Password/' + safeencodedToken;

    const msg = {
      to : email,
      from : 'aa054064@ucf.edu',
      subject : 'Reset Password',
      text : testEmail
    }

   await sgMail
      .send(msg)
      .then(() => {
        console.log('Email Sent')
      })
      .catch((error) => {
        return res.json({success : false})
      })
    
    // Respond with the newly created user
    res.json({success:true});
    console.log('Email has been sent');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/verifyToken', async (req, res) => {
  try {

    const token = req.body.token;
    const decodedToken = token.replace(/_/g, '.');
    let userEmail;

    await jwt.verify(decodedToken, secretKey, (err, decoded) => {
      if (err) {
          console.error('Token verification failed:', err.message);
          res.json({success:false});
      } else {
  
          userEmail = decoded.email;

          console.log('Email:', userEmail);
          res.json({success:true});
      }
    });
    // Respond with the newly created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/getAllFiles', passport.authenticate('local'), async (req, res) => {
  try {
    res.json({success : true});
    // Respond with the newly created user
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});