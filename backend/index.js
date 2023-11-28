import https from 'https';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/emucloud.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import GameInfo from './models/gameinfo.js';
import multer from 'multer';


const app = express();

app.use(cors({
  origin: 'https://localhost:3001',
  credentials : true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

const keys = {
  key: fs.readFileSync('./cert/localhost.key'),
  cert: fs.readFileSync('./cert/localhost.crt')
};

const secretKey = 'Dog-Doggy-Doggy-Dog-Dog';
sgMail.setApiKey('');
const bucketName = 'savesbucker'


//#region Mongoose
const connectionString = 'mongodb://emucloud:%40Letmein@3.81.208.209:27017';
mongoose.connect(connectionString, {dbName : 'emucloud'});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
//#endregion




app.use(session({
  name: 'session-id',
  secret: '123-456-789',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      user : user,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const server = https.createServer(keys, app);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  res.json({ success: true, user: req.user });
});

app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Redirect or respond as needed after logout
    res.json({success : true}); // Redirect to the home page, for example
  });
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
    createFolder(bucketName, username + '/mario/');
    createFolder(bucketName, username + '/pokemon/');
    createFolder(bucketName, username + '/metroid/');
    createFolder(bucketName, username + '/mariok/');
    createFolder(bucketName, username + '/zelda/');

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

app.post('/api/ForgotLink', async (req, res) => {
  try {

    const email = req.body.email;
    const token = jwt.sign({email:email},secretKey, {expiresIn : '1h' });
    const encodedToken = encodeURIComponent(token);
    const safeencodedToken = encodedToken.replace(/\./g, '_');

    const testEmail = 'This is my email follow this url https://localhost:3001/Password/' + safeencodedToken;

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

app.post('/api/getAllFiles', async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.isAuthenticated());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

AWS.config.update({
  accessKeyId : '',
  secretAccessKey : '',
  region : '',
});

const s3 = new AWS.S3();

app.get('/api/listFiles', async (req, res) => {
  console.log('here');
  if(req.isAuthenticated()){
    const { selectedPath } = req.query;
    const path = req.user.user.username + selectedPath;
    console.log('there');
    try {
      const params = {
        Bucket: 'savesbucker',
        Prefix: path,
      };
    
      const result = await s3.listObjectsV2(params).promise();
      const files = result.Contents.map((file) => file.Key);
      console.log("The bucket is getting us info");
      console.log(files);
      console.log("The bucket is getting us info");
    
      return res.json({ success: true, files });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else{
    return res.json({success: false});
  }
});

app.post('/api/downloadFile', async (req, res) => {
  console.log('here');
  if(req.isAuthenticated()){
    const path = req.user.user.username + req.body.gameName + req.body.fileName;
    console.log(path);
    try {
      const params = {
        Bucket: 'savesbucker',
        Key: path,
      };
    
      s3.getObject(params, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          res.setHeader('Content-Disposition', 'attachment; filename=' + req.body.fileName);
          res.setHeader('Content-Type', 'application/octet-stream');
    
          // Send the file content as the response
          res.send(data.Body);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else{
    res.json({success: false})
  }
});

app.post('/api/deleteFile', async (req, res) => {
  if(req.isAuthenticated()){
    const path = req.user.user.username + req.body.gameName + req.body.fileName;
    console.log(path);
    try {
      const params = {
        Bucket: 'savesbucker',
        Key: path,
      };
    
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.error(err);
          return res.json({success: false})
        } else {
          return res.json({success: true})
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return res.json({success : false});
    }
  } else{
    console.log("HereElse");
    return res.json({success: false});
  }
});

let upload = multer();

app.post('/api/uploadFile', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const path = req.user.user.username + req.body.gameName + req.body.fileName;

  const base64FileContent = file.buffer.toString('base64'); // Assuming file.buffer contains the file content

  // Set up the parameters for the putObject operation
  const params = {
    Bucket: 'savesbucker',
    Key: path,
    Body: Buffer.from(base64FileContent, 'base64'),
  };

  // Upload the file to the S3 bucket
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('File uploaded successfully:', data);
      return res.status(200).json({ success: true });
    }
  });
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});