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


// 'use strict';
// $(function() {
//   console.log('Loaded!');
//
//   let token;
//   let currentUser;
//
// //Sign UP
//   $('#signup').on('click', function(e){
//     e.preventDefault();
//     $.post("http://localhost:3000/user/signup", {name: $('#name').val(), email: $('#email').val(), password: $('#password').val()}, function(data) {
//       if(data.token){
//         alert('SUCCESSFUL CREATION');
//         token = data.token;
//         currentUser = data.currentUser._id;
//         $.ajaxSetup({
//           headers: {'x-access': token}
//         });
//       }
//     })
//   });
//
//   $('#login').on('click', function(e){
//     e.preventDefault();
//     $.post("http://localhost:3000/user/auth", {email: $('#login-email').val(), password: $('#login-password').val()}, function(data){
//       console.log(data);
//       if(data.token){
//         alert('LOGIN SUCCESSFUL');
//         token = data.token;
//         currentUser = data.user;
//         console.log(currentUser);
//         $.ajaxSetup({
//           headers: {'x-access': token}
//         });
//       }
//     });
//     $.get("http://localhost:3000/article", function(data){
//       console.log(data);
//     })
//   });
//
//   $('#article-button-add').on('click', function(e){
//     e.preventDefault();
//     let articleUrl = $('#article-url').val();
//     let encodedUrl = encodeURIComponent(articleUrl);
//     $.post('http://localhost:3000/article/' + encodedUrl, { user: currentUser }, function(data){
//       console.log(data);
//       articlePreview(data);
//     });
//   });
// });
//
// var articlePreview = function(data) {
//   var result = $('#article-display').append('<div>');
//   result.attr('class', 'article');
//   if (data.title == null && data.description == null) {
//     alert('Error: This article is in a format that cannot be saved.');
//   }
//   else {
//     if (data.title !== null) {
//       result.append('<h2>' + data.title + '</h2>');
//     }
//     if (data.description !== null) {
//       result.append('<h4>' + data.description + '</h4>');
//     }
//     if (data.image[0].url !== null) {
//       result.append('<img src="' + data.images[0].url + '">');
//     }
//     result.append('<p>' + data.provider_name + '</p>');
//   }
// };
