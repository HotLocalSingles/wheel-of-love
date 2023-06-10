# **Wheel Of Love**
This is a dating app that utilizes a wheel to match users. Users can create their own profiles, see their matches, spin the wheel to get matched to another user, chat with other users in real time, create icebreakers to help them 'break the ice' with their matches, and see what's up with the vibe rater. This dating app give a bit of spontaneity and fun to the dating world.

[Home Page](/home/useradd/Senior/wheel-of-love/client/images/Screenshot 2023-06-10 111253.png)

## Table of Contents

* [Application Walk-Through](#walk)
   * [User Profile](#user)
   * [Wheel](#wheel)
   * [Chat](#chat)
   * [IceBreakers](#ice)
   * [Vibe Rater](#vibe)
* [Tech](#tech)
* [Dev Setup](#setup)
* [Installation and Start-up](#start)
* [Contributors](#contrib)

 <a id=walk></a>
## Application Walk-Through

This application uses ExpressJs, React Router, Axios, Webpack, Material UI, ESLint, Passport, GoogleAuth, ReactJs with hooks, NodeJs, MySQL, Sequelize, Trello, and AWS in it's functionality.

<a id=user></a>
### User Profiles

<a id=wheel></a>
### Wheel

The Wheel displays users that:

 1. are not you
 2. share your location in the database
 3. are filtered based on the gender checkboxes(all checked by default).

 The wheel spins a random # of degrees and chooses the user at the highest position on the wheel. That is your match/chosenUser. This triggers the chatbox and removes them from the wheel for the next spin.

<a id=chat></a>
### Chat

The chat feature is designed to allow users connected from the wheel to communicate with each other. The chat component will not display until the user has connected with someone from a spin of the wheel. Once connected, any previous messages the users shared will populate the message field and they can continue their conversation. The chat feature is build using Socket.io. It joins users into a room, where the roomId is a combination of the users' id numbers and will be unique every time. The room is sorted to allow for the reconnection and continued conversation of two users. All messages are saved to the MySQL database.

<a id=ice></a>
### IceBreakers

Don't know what to say? Met your match? Well, you're one click away from having a great icebreaker to get the convo rolling. Make sure to click save if you find a favorite!

<a id=vibe></a>
### Vibe Rater

Ever want to know what vibe you are giving off based on your bio? Well, leave that to the Vibe Rater. It will let you and anyone else know the exact vibe you are cooking with.

-----------------------------------------------

 <a id=tech></a>
## Tech

* React-Router - Router library
* Mysql - Database
* Sequelize - ORM
* React - Framework
* Axios - http Client
* Javascript
* Node.js - Runtime Environment
* Express - Server
* Bulma - CSS Library
* eslint - Linter
* Webpack - Module Bundler
* Passport/Google OAuth - Authentication
* AWS EC2 - Deployment
* MaterialUI - styling
* Connect-session-sequelize - Session Storage

### Database:

We have a mySQL/Sequelize database. We have all of our models located in database/models.

### Server:

We have an express server. It is set up in server/index.js.

### Authentication

Our authentication is handled with oauth and passport. Our passport and google strategy setup can be found in server/passportConfig.js. Once logged in, the user has access to the whole site.

### APIs

We used 2 external apis for this project:

1. RapidAPI - Twinword API - https://rapidapi.com/twinword/api/emotion-analysis

This API allows us to detect the emotions in a paragraph of text. It requires an API key and registration through RapidAPI, but both are free. Currently you are allowed 2,000 requests a month for the free tier. This is used in the Vibes component, where we send the user's bio and on the return from the call, change that emotion to a vibe and store it on a user's profile.

2. RapidAPI - Conversation Starter API - https://rapidapi.com/nishujain199719-vgIfuFHZxVZ/api/conversation-starter1

This API Returns random conversation starters from a huge database. Literally, nothing else. It requires an API key and registration through RapidAPI, but both are free. Currently you are allowed 100 requests a month for the free tier. This is utilized in the Icebreakers component and a user may save that ice breaker to their profile.

### Environment Variables Needed

#### OAuth

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#### Vibe

X-RapidAPI-Host="twinword-emotion-analysis-v1.p.rapidapi.com"

X-RapidAPI-Key=

#### IceBreakers

X-RapidAPI-Host=conversation-starter1.p.rapidapi.com

X-RapidAPI-Key=

----------------------------------------------------------------

 <a id=setup></a>
## Dev Setup:

The front-end was built using React and React Router.

### Environment Variables Needed

### Google OAuth

Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.

1. GOOGLE_CLIENT_ID=
2. GOOGLE_CLIENT_SECRET=


### Session ID Cookie

It can be any string of your choice; it's for security purposes.

3. SESSION_ID_COOKIE=

 <a id=start></a>
## Installation/Start-up

1. First fork the repo and clone it to your local machine.
2. Collect all env keys
3. Run 'npm install' to install all dependencies
4. Open mysql, create and use a database called 'wheel'
5. Run 'build:client-dev' to start Webpack
6. Run 'npm start' to run the server



----------------------------------------------------------
 <a id=contrib></a>
## **Contributors**

Logan Hochwald https://github.com/loganhochwald

Cynthia Harris https://github.com/CynLadyPenguin

Alex Lambert https://github.com/xanderlambert

Bryan Burnside https://github.com/bryanpburnside

