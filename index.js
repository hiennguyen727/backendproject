const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { User, peppers, Faves } = require('./models');
const path = require('path');
const bcrypt = require('bcrypt');
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
const winston = require('winston');
app.set('views', path.join(__dirname, 'views'));
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
    const userId = req.cookies.userId; // Retrieve the user's ID from the session or cookie

    if (!userId) {
      return res.redirect('/login'); // Redirect to the login page if the user is not authenticated
    }

    // Fetch all available peppers
    const allPeppers = await peppers.findAll();

    res.render('gallery', { PeppaBoi: allPeppers, userId: userId });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

app.get('/gallery', async (req, res) => {
  const newPep = await peppers.findAll();
});

app.post('/register', async (req, res) => {
  console.log('hi');
  const nameRegex = /^[A-Za-z]+$/; // Only letters
  const usernameRegex = /^[A-Za-z0-9]+$/; // Letters and numbers
  const minLength = 8;
  const { firstName, lastName, email, password, repassword } = req.body;
  const saltrounds = 10;

  bcrypt.hash(password, saltrounds, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).render('register', { errorMessage: 'Hashing password failed' });
    }
    if (password !== repassword) {
      return res.render('register', { failedMessage: 'PASSWORD NO MATCH' });
    }
    console.log('hashpassword:', hash);
    try {
      await User.create({
        firstName,
        lastName,
        email,
        password: hash,
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

app.get('/dashboard', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      console.log('User not found');
      res.redirect('/failedlogin');
      return;
    }

    const userId = user.id;

    // Fetch the user's favorites and include the associated Pepper model
    const userFavorites = await Faves.findAll({
      where: { userId: userId },
      include: [{ model: peppers, as: 'pepper' }], // Assuming 'pepper' is the name of the association
    });

    res.render('dashboard', { email: email, userId: userId, favorites: userFavorites });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('HELLO', email);
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      console.log('Wrong email');
      return res.redirect('/failedlogin');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      console.log('Login successful for email:', email);
      res.cookie('userId', user.id);
      return res.redirect(`/dashboard?email=${user.email}`);
    } else {
      console.log('Wrong password');
      return res.redirect('/failedlogin'); // Redirect to a failed login route if the password is incorrect
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
        res.redirect(`/dashboard?email=${user.email}`);
      } else {
        res.status(400).render('dashboard', { errorMessage: 'Wrong email or password' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('login', { errorMessage: 'Login failed' });
  }
});

app.get('/forgotpassword', (req, res) => {
  res.render('forgotpassword');
});

app.post('/reset-password', (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
});

app.put('/forgotpassword', (req, res) => {
  res.render('forgotpassword');
});

app.post('/add-to-favorites', async (req, res) => {
  const { userId, pepperId } = req.body;

  try {
    // Perform the necessary database operation to add the favorite
    await Faves.create({
      userId: userId,
      pepperId: pepperId,
    });

    // Redirect the user back to the dashboard or another appropriate page
    res.redirect('/gallery'); // You can change the redirect URL as needed
  } catch (error) {
    console.error(error);
    // Handle errors, such as rendering an error page or sending an error response
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
