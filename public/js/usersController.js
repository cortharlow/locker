'use strict';
angular.module('Locker')
.controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http){
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

  let token;
  let currentUser;

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
}
