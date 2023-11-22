import express from 'express';
import mongoose from 'mongoose';
import User from './models/emucloud.js';
import GameInfo from './models/gameinfo.js';
import bodyParser from 'body-parser'; // Import body-parser to parse incoming JSON data
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import session from 'express-session';
import bcrypt from 'bcrypt'


const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if set, or default to 3000
const connectionString = 'mongodb://emucloud:%40Letmein@3.81.208.209:27017';

app.use(cors());

app.use(cors({
  origin: '*',
}));



// Oauth Authentication //

app.use(session({ secret: 'doggy-dog-gonna-dog-dog', resave: false, saveUninitialized: false }));

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


// Database Setup //

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      console.log("Attempted");
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = await User.findOne({username});

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if(!passwordMatch)
      {
        const passwordMatch = await bcrypt.compare(password, user.password);
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

    // Create a new user instance
    const newUser = new User({
      username,
      password : hashedPassword,
      email,
      date : '2023-11-20T12:00:00.000+00:00',
      reset : false,
      saves : [[],[],[],[],[]]
    });

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

