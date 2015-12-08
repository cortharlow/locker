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
  self.getUser = getUser;

  let user;

  function getArticles(){
    $http
      .get('http://localhost:3000/article')
      .then(function(response){
        console.log(response.data.articles);
        self.all = response.data.articles;
      });
  }

  function addArticle(){
    getUser();
    $http
      .post('http://localhost:3000/article/api', self.newArticle)
      .then(function(response){
        console.log(response.data);
      });
    self.newArticle = {};
  }

  function getUser(){
    $http
      .get('http://localhost:3000/user/current', {email: "cort.harlow@gmail.com"})
      .then(function(response){
        console.log(response.data);
      })
  }
}

// $('#article-button-add').on('click', function(e){
//   e.preventDefault();
//   let articleUrl = $('#article-url').val();
//   let encodedUrl = encodeURIComponent(articleUrl);
//   $.post('http://localhost:3000/article/' + encodedUrl, { user: currentUser }, function(data){
//     console.log(data);
//     articlePreview(data);
//   });
// });
