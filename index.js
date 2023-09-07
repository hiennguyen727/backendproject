const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { User, peppers, Faves } = require('./models')
var path = require('path')
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
const winston = require('winston');
const port = 3001
app.set('views', path.join(__dirname, 'views'));
//^ REMOVE THIS IF NO WORK
app.get('/', async(req, res) => {
    res.render('homepage')
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/gallery', async(req, res) => {
  const newPep = await peppers.findAll()
  
    res.render('gallery', {PeppaBoi: newPep})
})

app.post('/register', async (req, res) => {
    console.log('hi')
    const nameRegex = /^[A-Za-z]+$/; // Only letters
    const usernameRegex = /^[A-Za-z0-9]+$/; // Letters and numbers
    const minLength = 8;
    const { firstName,lastName, email, password, repassword} = req.body;
    const saltrounds = 10;
  
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).render('register', { errorMessage: 'Hashing password failed' });
      }
      if (password !== repassword){
        return res.render('register',{failedMessage:'PASSWORD NO MATCH'})
      }
      console.log('hashpassword:', hash);
      try {
        await User.create({
          firstName,
          lastName,
          email,
          password: hash
         
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
    const { email } = req.query; // Access the email parameter passed from the login route
  
    try {
      const user = await User.findOne({ where: { email: email } });
  
      if (!user) {
        console.log('User not found');
        res.redirect('/failedlogin'); // Redirect to a failed login route
        return;
      }
  
      const userId = user.id; // Assuming your User model has an 'id' field
  
      // Assuming you have a model for the "Faves" table
      const userFavorites = await Faves.findAll({ where: { userId: userId } });

      console.log(userFavorites);

      let pepper = {
        name: "Grab from pepper table",
        id: "grab from faves table"
      }
  
      res.render('dashboard', { email: email, userId: userId, favorites: userFavorites, pepper });
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
        res.redirect('/failedlogin'); // Redirect to a failed login route
        return;
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.render('login', { errorMessage: 'Login failed' });
        }
  
        if (result) {
          // Store the user's ID in local storage
          res.cookie('userId', user.id);
          res.redirect(`/dashboard?email=${user.email}`);
        } else {
          res.redirect('/failedlogin'); // Redirect to a failed login route
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
  });
  
  
  
  app.get('/failedlogin', (req, res) => {
    res.render('failedlogin');
  });
  
  
  app.post('/failedlogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where:{ email:email }});
      if (!user) {
        console.log('Wrong email')
        res.status(400).render('failedlogin', { errorMessage: 'Wrong email or password' })
        return ;
      }
        
      
      bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
              console.error(err);
              return res.render('failedlogin', { errorMessage: 'Login failed' });
            }
            
            if (result) {
                res.redirect(`/dashboard?email=${user.email}`);
            
            } else {
                res.status(400).render('/dashboard','dashboard', { errorMessage: 'Wrong email or password' });
            }
        });


    } catch (err) {
        console.error(err);
        res.status(500).render('login', { errorMessage: 'Login failed' });
    }
});



app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})