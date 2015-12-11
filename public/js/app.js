'user strict';

angular
  .module('Locker', ['ui.router'])
  .config(function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "_home.html",
        controller: "UsersController"
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
        views: {
          "": {
            templateUrl: "_add-article.html",
            controller: "ArticlesController as articles"
          },
          "list@locker": {
            templateUrl: "_list.html",
            controller: "ArticlesController as articles"
          },
          "footer@locker": {
            templateUrl: "_footer.html",
            controller: "UsersController as users"
          }
        }
      })

    $urlRouterProvider.otherwise("/");
  })

  //TESTING

  .controller('UsersController', function UsersController($scope, $state, $http, $window){

    if($window.localStorage.token) {
      $state.go('locker');
    }

    var self = this;
    self.all = [];

    self.addUser = addUser;
    self.newUser = {};

    self.getUsers = getUsers;

    self.loginUser = loginUser;
    self.getUser = {};
    self.message = '';

    self.updateUser = self.updateUser;
    self.editUser = {};

    self.deleteUser = deleteUser;
    self.logoutUser = logoutUser;

    function getUsers(){
      $http
        .get('localhost:5000/user')
        .then(function(response){
          self.all = response.data.users;
        });
    }

    function addUser(){
      $http
        .post('localhost:5000/user/signup', self.newUser)
        .then(function(response){
          if (response.data.success) {
            $window.localStorage.token = response.data.token;
            $window.localStorage.user = response.data.user._id;
            self.message = 'Success';
            $state.go('locker');
          }
        })
    }

    function updateUser(){
      $http
        .put('localhost:5000/user', self.editUser)
        .then(function(data, status, headers, config){
          $window.localStorage.user = data.user;
        });
    }

    function loginUser(){
      $http
        .post('localhost:5000/user/auth', self.getUser)
        .then(function(response){
          if (response.data.success) {
            $window.localStorage.token = response.data.token;
            $window.localStorage.user = response.data.user;
            self.message = 'Success';
            $state.go('locker');
          } else {
            delete $window.localStorage.token;
            delete $window.localStorage.user;
            self.message = 'Error';
          }
        })
    }

    function deleteUser() {
      $http
        .delete('//localhost:5000/user')
        .then(function(){
          logoutUser();
        });
    }

    function logoutUser() {
      delete $window.localStorage.token;
      delete $window.localStorage.user;
      $state.go('home');
    }
  })

  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .controller('ArticlesController', function ArticlesController($rootScope, $state, $http, $window){
    var self = this;
    self.listArticles = [];
    self.addArticle = addArticle;
    self.newArticle = {};
    self.getArticles = getArticles;
    self.getArticle = {};
    self.deleteArticle = deleteArticle;

    function getArticles(){
      $http
        .get('localhost:5000/article/' + $window.localStorage.user)
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
                "id": response.data[i]._id,
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
      console.log(self.newArticle);
      $http
        .post('localhost:5000/article/' + $window.localStorage.user, self.newArticle)
        .then(function(response){
          $window.location.reload();
        });
      self.newArticle = {};
    }

    function deleteArticle(id){
      $http({
        url: 'localhost:5000/article/' + id,
        method: "DELETE"
      })
      .then(function(response){
        $window.location.reload();
      })
    }
  })
