# **Wheel Of Love**
This is a dating app that utilizes a wheel to match users. This application uses ExpressJs, React Router, Axios, Webpack, Material UI, ESLint, Passport, GoogleAuth, ReactJs with hooks, NodeJs, MySQL, Sequelize, Trello, and AWS.

## **Getting Started**

Install Dependencies: `npm install`

* ### **Webpack compiler**
`npm i --save-dev webpack`

`npm i @airbnb/config-webpack`

`npm i html-webpack-plugin`

* ### **ESLint**

ESLint will use airbnb style guide

* ### **Socket.io**

`npm i socket.io`

## **The Design**

This dating app is designed to allow a user to set up a user profile, match with people by spinning a wheel populated with filtered users, and chat in real time with those matches. Additional features, like vibe rater and ice breakers allow the user to personalize their experience using the app. Users log in using GoogleAuth and Passport and their data is saved to a MySQL database. React Router handles the routing and Sequelize handles the models for data storage. Styling is done using MaterialUI. Deployment is handled by AWS.

## **How To Use**

Wheel of Love has a simple user interface (UI). Upon logging in with Google, the user is prompted to establish a profile with basic data like age, gender, location, username, and bio. Once the profile is created it is stored in the database and their username is added to the collection of names for the Wheel component.

Upon entering a user selects an option like Wheel/Chat, IceBreakers, or Matches which will direct them to the component. A small detailed profile box is available to the user to see their Vibe Rating.

Should they choose Wheel/Chat, a Wheel appears and allows them to filter through the Wheel data to populate the Wheel with potential matches. After the Wheel spins, the user is prompted to confirm they want to chat with the selectedUser.

The Chat then establishes a private room using Socket.io between the two users. If the selectedUser is offline, the messages are saved to the database and will be available when the selectedUser opens a chat connection with the user. Previous messages will automatically populate in the Chat box.

Any ice breakers the user chooses can be added to the database and will be available as a favorite that the user can select from.

The Vibe Rating using an api that 

----------------------------------------------------------
## **Contributors**

Logan Hochwald https://github.com/loganhochwald

Alex Lambert https://github.com/xanderlambert

Bryan Burnside https://github.com/bryanpburnside

Cynthia Harris https://github.com/CynLadyPenguin