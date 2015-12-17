# Locker.

Find cool stuff online.

Store it in your locker.

---
### Tech Specs
* **Technologies:**
  - MEAN Stack
  - MongoDB and Mongoose, Express, AngularJS with UI-Router, and Node.js
  - Dependencies
    - angular
    - bcrypt
    - body-parser
    - cors
    - express
    - express-jwt
    - jsonwebtoken
    - mongoose
    - morgan
    - path
    - request
    - serve-favicon
  - Uses [Embedly's Extract](http://embed.ly/extract) API to pull information from passed URL
  - [Chrome Extension](https://chrome.google.com/webstore/detail/locker-extension/echcameeafciikhiedhllacbfkoialdp) to pass URL from anywhere on the Internet
* **Models:**
  - User:
    - Full CRUD functionality, but front-end does not currently allow for updating
    - Authentication required to access routes
  - Articles:
    - Create, Read, and Delete; app retrieves article/image/video data from Embedly - nothing to edit or update.

* [Deployed to Heroku](http://getlocker.herokuapp.com/#/)
---
### User Stories
When using Locker, a user is able to:
  - Login or Signup

Once logged in and authenticated:
  - Copy and paste the URL of an article/image/video/gif to be saved to Locker
  - Use [Chrome Extension](https://chrome.google.com/webstore/detail/locker-extension/echcameeafciikhiedhllacbfkoialdp) to save current URL to Locker from anywhere on the web
  - Watch list of items update each time a new item is saved
  - Click on item to be taken to page to view item without any external styling
  - Use Hamburger Menu to switch between Add, Search, external link to Chrome Extension page, and Logout
  - Search for any items on search page
---
### Styling
Locker was created with the intent of directing all attention to content by removing as many distractions as possible.

In this context, minimal styling was used with a bare black-and-white color palette. However, because absolute black text on a white background is straining to the eyes, #222222 was used in place of #000000 to help alleviate this problem.

Lastly, large icons and input fields were used to make the transition to mobile optimization easier.
### Screenshots
![Splash Page](https://i.imgur.com/gmQPniL.jpg)

![Home](https://i.imgur.com/SucUxeU.jpg)

![Article](https://i.imgur.com/VzNnvc7.jpg)

![Menu](https://i.imgur.com/X8i3nTy.jpg)

![Extension Popup](https://i.imgur.com/N0bZ6c7.jpg)

![Extension Store](https://i.imgur.com/ph1mN5O.jpg)
---
### Versions and Upcoming Features
**v1.0 - COMPLETE**
  - Basic app setup
    - Login
    - Signup
    - Logout
    - Save articles (Fail to save images/videos/gifs)
    - Click article to view
      - Use Angular to properly style article/video/image view

**v1.5 - COMPLETE**
  - Expand article controller to better handle various data types, update front-end to accurately display various data types

**v2.0 - COMPLETE**
  - Write Chrome Extension to allow URLs to be passed to API and saved from anywhere on the web
    - Known bug: Ability to post items to any account without Authentication

**v2.5 - COMPLETE**
  - Add Search feature to look through article titles, descriptions, and created dates
  - Create front-end Menu to better navigate between adding, search, getting extension, and logging out

**v3.0 - INCOMPLETE**
  - Create "Locker Room"
    - Search for users
    - Follow friends and people of interest
    - Change page after login to be an updating feed of what people are saving to their Lockers
  - Add ability to make some items in Locker private

**v3.5 - INCOMPLETE**
  - Research Cordova and potential to wrap Locker in iOS App

**Additional Features**
  - Make mobile friendly
  - Remove need to enter email address in Chrome Extension each time posting
  ---
#### Copyright notice:

The media and information used in this app is for educational purposes.

 Project created with ♥ at General Assembly's Web Development Immersive.
