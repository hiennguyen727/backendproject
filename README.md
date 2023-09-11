# backendproject
Technologies used: 
bcrypt
node
postgresSQL
sequelize
express e6 template
swagger

FEATURES
user database
pepper database
gallery
aboutus
forgot password

<------------ DESCRIPTION OF SITE------------>
This project is a combination of our backend skills along with our front end that we've learned throughout this class. It implements use of sequelize for our database to hold information for our users, and also peppers that we are showcasing. 

A big part of the styling was done through custom art work produced by Anthony. The graphics are implemented and were added with links attached to them to navigate through the website.

We used sessions in order to hold the current users in order to access certain parts of the website such as gallery. You're able to use the gallery, showcasing our peppers, to add them to your favorites on your blog page. The description is also there so that you're able to read about it and decide on which one you like. On the blog it also features a delete from favorites button so that you are able to change the peppers listed. Once you are done, you can logout and allow the next user to utilize the gallery and blog. 

The peppers and users are both seperate tables and the favorites listed on the blog is also a seperate table that is linked with a foreign key. It takes the UserID currently logged in, and adds a pepperID to that one userID, making it a one to many relation.

The website also features a forgot password page that allows the user to input their security quesiton and email and will then allow the user to reset their password. 
