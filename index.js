const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { User, peppers } = require('./models')
var path = require('path')
const bcrypt = require('bcrypt');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }))
const winston = require('winston');
const port = 3001



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
    const { firstName,lastName, email, password} = req.body;
    const saltrounds = 10;
  
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).render('register', { errorMessage: 'Hashing password failed' });
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
  
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where:{ email:email }});
        console.log('66', user)
      if (!user) {
        console.log('Wrong email')
        res.status(400).render('failedlogin', { errorMessage: 'Wrong email or password' })
        return ;
      }
//   console.log('ljljlkjljljljljlj',user)
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).render('login', { errorMessage: 'Login failed' });
        }
  
        if (result) {
            res.render('homepage', { successMessage: 'Login successful' });
          } else {
            res.redirect('/failedlogin'); // Redirect to /failedlogin route
          }
          
          
      });
    } catch (err) {
      console.error(err);
      res.status(500).render('login', { errorMessage: 'Login failed' });
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
                res.redirect('/','homepage', { successMessage: 'Login successful' });
            } else {
                res.status(400).render('homepage', { errorMessage: 'Wrong email or password' });
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