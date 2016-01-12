# Locker.

![Splash Page](https://i.imgur.com/gmQPniL.jpg)
[Try it out here!](http://getlocker.herokuapp.com/#/)

---
### Overview

A longtime Redditor, my favorite feature of Reddit has always been the Save feature – the ability to save any article/image/video/comment/content found on the website to a profile to either save for later or for safekeeping. Although platforms exist that allow users to do this with anything found on the internet, like Pocket and Instapaper, I wanted to try my hand at making a similar service that was incredibly easy to use with minimal styling.

---
### Tech Specs
* **Technologies used:**
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

* **Deployed to Heroku as [getlocker.herokuapp.com](http://getlocker.herokuapp.com/#/)**

---
### Locker Extension

The main function of Locker is to save anything a user finds on the internet to his or her own individual locker. Initially, this meant copying and pasting links into the Add bar in order for items to be saved. Clearly, this would not work if I wanted Locker to be considered a fully fleshed out web app.

As a result of this, I learned how to write my own Chrome Extension, which can be found [here](https://chrome.google.com/webstore/detail/locker-extension/echcameeafciikhiedhllacbfkoialdp).

Although there are some security holes, this is my first program to appear on some sort of app store.

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

My favorite learning moment when I created Locker was when my class had our final "science fair" – an opportunity to show off our Final Projects to the General Assembly community. User after user would attempt to click the Locker text in the upper lefthand corner of the screen in order to return to the original view, but I did not allow for this functionality (due primarily to my inexperience with Angular.js). This is one of the main Bugs I've yet to solve.

---
### Styling
Locker was created with the intent of directing all attention to content by removing as many distractions as possible. 

In this context, minimal styling was used with a bare black-and-white color palette. However, because absolute black text on a white background is straining to the eyes, #222222 was used in place of #000000 to help alleviate this problem.

Locker also includes my first implementation of a Hamburger menu. Originally I had no intention of including any sort of navigation in Locker, keeping Logout functionality in the footer. However, I quickly realized that scrolling all the way past my entire library of saved items in order to logout was incredibly annoying and not at all user friendly. The addition of a Chrome Extension and Search functionality was the nail in the coffin, and I created the Hamburger to have a place for these different features.

Lastly, large icons and input fields were used to in order make the transition to mobile optimization easier.
#### Screenshots
![Splash Page](https://i.imgur.com/gmQPniL.jpg)
![Home](https://i.imgur.com/SucUxeU.jpg)
![Article](https://i.imgur.com/VzNnvc7.jpg)
![Menu](https://i.imgur.com/X8i3nTy.jpg)
![Extension Popup](https://i.imgur.com/N0bZ6c7.jpg)
![Extension Store](https://i.imgur.com/ph1mN5O.jpg)

---
### Retrospective

I had a blast creating Locker and potentially learned a ton of stuff throughout the process. If I had to go back a do it over again, I would do the following:
  - Spend significantly more time learning about the power of Angular.js
    - I feel I have only truly begun to scratch the surface of the framework and a lot of my pains in using it would have been remedied if I was more knowledgeable on it; learn by doing!
  - Written my own web scrapper instead of relying solely upon Embedly
    - Embedly is amazing, but I ran into many many data errors as a result of the way the API structures its return data; writing my own may have alleviated some of these issues and not necessitated the constant restructuring of my database architecture
    - This is top of my "to-do" list
  - Developed mobile first

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
#### Copyright Notice

The media and information used in this app is for educational purposes.

 Project created with ♥ at General Assembly's Web Development Immersive.
