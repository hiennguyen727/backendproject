const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const { User, peppers, Faves } = require('./models');
var path = require('path');
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
const winston = require('winston');
const port = 3003;
app.set('views', path.join(__dirname, 'views'));


app.use(session({
  secret: 'hello', // Change this to a secret key
  resave: false,
  saveUninitialized: true,
}));
// Helper function to check if the user is authenticated
function isAuthenticated(req) {
  return !!req.session.userId; // Check if the user's ID is stored in the session
}

app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    } else {
      // Redirect the user to the homepage or another appropriate page
      res.redirect('/');
    }
  });
});

// Middleware to check authentication
function requireAuth(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.redirect('/login');
  }
  next();
}

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.render('homepage');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/gallery', async (req, res) => {
  try {
    const userId = req.cookies.userId;

    if (!isAuthenticated(req)) {
      return res.redirect('/login');
    }

    const allPeppers = await peppers.findAll();

    res.render('gallery', { PeppaBoi: allPeppers, userId: userId });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});
//okokokokokokok
app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});
//^^^^ made aboutus lowercase in EJS cuz its messing with the site
app.post('/register', async (req, res) => {
  const nameRegex = /^[A-Za-z]+$/;
  const usernameRegex = /^[A-Za-z0-9]+$/;
  const minLength = 8;
  const { firstName, lastName, email, password, repassword, secquestion, secanswer } = req.body;
  const saltrounds = 10;

  bcrypt.hash(password, saltrounds, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).render('register', { errorMessage: 'Hashing password failed' });
    }
    if (password !== repassword) {
      return res.render('register', { failedMessage: 'PASSWORD NO MATCH' });
    }

    try {
      await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        secQuestion: secquestion,
        secAnswer: secanswer,
      });

      res.render('register', { successMessage: 'Registration successful' });
    } catch (err) {
      console.error(err);
      res.status(500).render('register', { errorMessage: 'Registration failed' });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      console.log('User not authenticated');
      res.redirect('/login'); // Redirect to the login page or handle it as per your requirements
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      console.log('User not found');
      res.redirect('/failedlogin');
      return;
    }

    const userFavorites = await Faves.findAll({
      where: { userId: userId },
      include: [{ model: peppers, as: 'pepper' }],
    });

    // Pass the 'email' variable to the template
    res.render('dashboard', { welcomeMessage: `Welcome, ${user.email}!`, userId: userId, favorites: userFavorites });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      console.log('Wrong email');
      return res.redirect('/failedlogin');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.userId = user.id; // Store user's ID in the session
      res.cookie('userId', user.id);
      return res.redirect(`/dashboard?email=${user.email}`);
    } else {
      console.log('Wrong password');
      return res.redirect('/failedlogin');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

app.get('/failedlogin', (req, res) => {
  res.render('failedlogin');
});

app.post('/failedlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      console.log('Wrong email');
      res.status(400).render('failedlogin', { errorMessage: 'Wrong email or password' });
      return;
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        console.error(err);
        return res.render('failedlogin', { errorMessage: 'Login failed' });
      }

      if (result) {
        req.session.userId = user.id; // Store user's ID in the session
        res.redirect(`/dashboard?email=${user.email}`);
      } else {
        res.status(400).render('failedlogin', { errorMessage: 'Wrong email or password' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { errorMessage: 'Login failed' });
  }
});

app.get('/resetpassword', async (req, res) => {
  res.render('resetpassword');
});

app.post('/resetpassword', async (req, res) => {
  const { email, secQuestion, secAnswer } = req.body;
  console.log('23', email, secQuestion, secAnswer);
  const foundUser = await User.findOne({
    where: { email: email },
  });
  if (foundUser) {
    await User.update(
      { secquestion: secQuestion },
      {
        where: {
          secquestion: null,
        },
      }
    );
    await User.update(
      { secAnswer: secAnswer },
      {
        where: {
          secanswer: secAnswer,
        },
      }
    );
  }
  res.render('security');
});

app.get('/resetpassword', async (req, res) => {
  res.render('resetpassword');
});

app.put('/resetpassword', async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ where: { email: email } });

  if (foundUser) {
    if (foundUser.securityQuestion) {
      res.render('securityQuestionPage', { question: foundUser.securityQuestion });
    } else {
      res.render('resetpassword');
    }
  } else {
    res.send('User not found');
  }
});

app.put('/resetpassword', (req, res) => {
  res.render('resetpassword');
});

app.post('/add-to-favorites', async (req, res) => {
  const { userId, pepperId } = req.body;

  try {

    await Faves.create({
      userId: userId,
      pepperId: pepperId,
    });
    res.redirect('/gallery');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

app.post('/remove-from-favorites', async (req, res) => {
  const { userId, pepperId } = req.body;

  try {

    await Faves.destroy({
      where: {
        userId: userId,
        pepperId: pepperId,
      },
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);

    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});
app.put('/resetpassword', async (req, res) => {
  const { email, password, newPassword, secAnswer } = req.body;
  console.log('226',req.body)
  const nameRegex = /^[A-Za-z]+$/; // Only letters
  const usernameRegex = /^[A-Za-z0-9]+$/; // Letters and numbers
  const saltrounds = 10;
  const foundUser = await User.findOne({ where: { email: email, secAnswer: secAnswer } });
  User.update({
    password: newPassword
  }, {where: {secAnswer: secAnswer, email: email}})
  res.send('Password reset successful')
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
