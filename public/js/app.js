'user strict';
var token;
var currentUser;

angular
  .module('Locker', ['ui.router'])
  .config(function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "_home.html"
      })
      .state('home.signup', {
        url: "/signup",
        templateUrl: "_home-signup.html",
        controller: "UsersController as users"
      })
      .state('home.login', {
        url: "/login",
        templateUrl: "_home-login.html",
        controller: "UsersController as users"
      })
      .state('locker', {
        url: "/locker",
        templateUrl: "_add-article.html",
        controller: "ArticlesController as articles"
      })

    $urlRouterProvider.otherwise("/");
  })

  //TESTING

  .controller('UsersController', function UsersController($http){
    var self = this;
    self.all = [];
    self.addUser = addUser;
    self.newUser = {};
    self.getUsers = getUsers;
    self.loginUser = loginUser;
    self.getUser = {};
    self.updateUser = self.updateUser;
    self.editUser = {};
    self.deleteUser = deleteUser;
    self.logoutUser = logoutUser;

    function getUsers(){
      $http
        .get('http://localhost:3000/user')
        .then(function(response){
          self.all = response.data.users;
        });
    }

    function addUser(){
      $http
        .post('http://localhost:3000/user/signup', self.newUser)
        .then(function(response){
          if(response.data.token){
            token = response.data.token;
            currentUser = response.data.currentUser._id;
            $.ajaxSetup({
              headers: {'x-access': token}
            });
          }
        });
    }

    function updateUser(){
      $http
        .put('http://localhost:3000/user', self.editUser)
        .then(function(response){
          currentUser = response.data.currentUser._id;
        });
    }

    function loginUser(){
      $http({
        url: 'http://localhost:3000/user/auth',
        method: "POST",
        data: self.getUser,
        params: {token: token}
      }).then(function(response){
        token = response.data.token;
        currentUser = response.data.user;
      });
      // $http
      //   .post('http://localhost:3000/user/auth', self.getUser)
      //   .then(function(response){
      //     if(response.data.token){
      //       token = response.data.token;
      //       currentUser = response.data.user;
      //       $.ajaxSetup({
      //         headers: {'x-access': token}
      //       });
      //     }
      //   });
    }

    function deleteUser() {
      $http
        .delete('http://localhost:3000/user')
        .then(function(response){
          logoutUser();
        });
    }

    function logoutUser() {
      $http
        .get('http://localhost:3000/user/logout')
        .then(function(response){
          token = response.data.token;
          $.ajaxSetup({
            headers: {'x-access': token}
          });
        });
    }
  })

  .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$http'];

  function ArticlesController($http){
    var self = this;
    self.listArticles = [];
    self.addArticle = addArticle;
    self.newArticle = {};
    self.getArticles = getArticles;

    function getArticles(){
      $http
        .get('http://localhost:3000/article/' + currentUser)
        .then(function(response){
          if (response.data.length > 0) {
            for(var i = 0; i < response.data.length; i++) {
              var date = response.data[i].created_at;
              date = date.toString();
              date = date.slice(0,10).split('-');
              for (var j = 0; j < 13; j++) {
                if (date[1] === j.toString()) {
                  if (j = 1) {
                    date[1] = "Jan";
                  }
                  if (j = 2) {
                    date[1] = "Feb";
                  }
                  if (j = 3) {
                    date[1] = "Mar";
                  }
                  if (j = 4) {
                    date[1] = "Apr";
                  }
                  if (j = 5) {
                    date[1] = "May";
                  }
                  if (j = 6) {
                    date[1] = "Jun";
                  }
                  if (j = 7) {
                    date[1] = "Jul";
                  }
                  if (j = 8) {
                    date[1] = "Aug";
                  }
                  if (j = 9) {
                    date[1] = "Sep";
                  }
                  if (j = 10) {
                    date[1] = "Oct";
                  }
                  if (j = 11) {
                    date[1] = "Nov";
                  }
                  if (j = 12) {
                    date[1] = "Dec";
                  }
                }
              }
              date = date[2] + ' ' + date[1] + ' ' + date[0];
              self.listArticles.push({
                "saved": response.data[i].created_at,
                "title": response.data[i].title,
                "description": response.data[i].description,
                "provider": response.data[i].provider,
                "content": response.data[i].content,
                "url": response.data[i].url,
                "date": date
              });
            }
          }
        });
    }

    function addArticle(){
      $http
        .post('http://localhost:3000/article/' + currentUser, self.newArticle)
        .then(function(response){
          console.log(response.data);
        });
      self.newArticle = {};
    }
  }
