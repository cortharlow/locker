'use strict';
angular.module('Locker')
.controller('ArticlesController', ArticlesController);

ArticlesController.$inject = ['$http'];

function ArticlesController($http){
  var self = this;
  self.all = [];
  self.addArticle = addArticle;
  self.newArticle = {};
  self.getArticles = getArticles;

  function getArticles(){
    $http
      .get('http://localhost:3000/article')
      .then(function(response){
        console.log(response.data.articles);
        self.all = response.data.articles;
      })
  }



}
