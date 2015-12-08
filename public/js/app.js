angular
  .module('Locker', ['ui.router'])
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('splash', {
        url:"/",
        templateUrl: "home.html"
      })
      .state('detail', {
        url:"/yourlocker",
        templateUrl: "detail.html"
      })

    $urlRouterProvider.otherwise("/");
  }
