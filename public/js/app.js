'user strict';
var token;
var currentUser;

angular
  .module('Locker', ['ui.router'])
  .config(function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "_home-signup-login.html",
        controller: "UsersController as users"
      })
      .state('locker', {
        url: "/locker",
        views: {
          "": {
            templateUrl: "_add-article.html",
            controller: "ArticlesController as articles"
          }
        },
        authenticate: true
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
      $http
        .post('http://localhost:3000/user/auth', self.getUser)
        .then(function(response){
          if(response.data.token){
            token = response.data.token;
            currentUser = response.data.user;
            $.ajaxSetup({
              headers: {'x-access': token}
            });
          }
        });
      return { user: { "email": self.getUser.email, "id": currentUser }, "accessToken": token }
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
          console.log(response.data);
          if (response.data.length > 0) {
            for(var i = 0; i < response.data.length; i++) {
              self.listArticles.push({
                "saved": response.data[i].created_at,
                "title": response.data[i].title,
                "image": response.data[i].image,
                "description": response.data[i].description,
                "provider": response.data[i].provider,
                "content": response.data[i].content,
                "url": response.data[i].url
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
