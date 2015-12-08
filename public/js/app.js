angular
  .module('Locker', ['ui.router'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        views: {
          "": {
            templateUrl: "_home-signup-login.html",
            controller: "UsersController as users"
          },
          "articleTest@home": {
            templateUrl: "_add-article.html",
            controller: "ArticlesController as articles"
          }
        }
      })

    $urlRouterProvider.otherwise("/");
  }
