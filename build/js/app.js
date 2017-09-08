(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey ="ed5b9fb963f0b977c1f57eed6638cd98144ae71e"

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Repos() {}

Repos.prototype.getRepos = function(userInfo, displayFunction){

  $.get('https://api.github.com/users/' + userInfo +
    '?access_token=' + apiKey
    ).then(function(response){

        // Display's user's info
        displayFunction(response.name);

    }).fail(function(error){
        // Display error message when an error is encountered
        $('#UserInfo').append(error.responseJSON.message);
    });

  $.get('https://api.github.com/users/' + userInfo +
    '/repos?access_token=' + apiKey).then(function(response){

        for (var index = 0; index <= response.length; index++ ) {

            // Check if a repo has a description and display
            if( response[index].description === null) {
                $('#RepoInfo').append("<li> <h5>Repo name: " + response[index].name + ". </h5> <p> This repo has no description </p> </li>");
            } else {

                $('#RepoInfo').append("<li> <h5>Repo name: " + response[index].name + ". </h5> <p>" + response[index].description + "</p> </li>");
            }
        }

    }).fail(function(error){
        // Currently producing an error on the console, to be fixed

        // Debugger
        // console.log(error.responseJSON.message);

        // $('#showUserInfo').append(error.responseJSON.message);
    });
};

exports.reposModule = Repos;

},{"./../.env":1}],3:[function(require,module,exports){
var Repos = require('./../js/git.js').reposModule;

var displayUserName = function(nameData) {
  if (nameData === null) {
    $('#showInfo').append("<hr/> <h3>The user has no name.</h3> <hr/> <h2> Public Repositories</h2>");
  } else {
    $('#showInfo').append("<hr/> <h3>The user's name is " + nameData + ". </h3> <hr/> <h2> Public Repositories</h2>");
  }
};

// var displayRepoName = function(repoNameData) {
//   if (nameData === null) {
//     alert("The username does not exist. Try again.");
//   } else {
//     $('#showUserInfo').append("<p>The user's name is " + nameData + ". </p>");
//   }
// };

$(document).ready( function() {

    var currentReposObject = new Repos();

    $('#userForm').submit( function(event){

        // Clear the info currently displayed
        $('#UserInfo').empty();
        $('#RepoInfo').empty();
        $('.section5').show();

        event.preventDefault();

        var userInfo = $('#user').val();

        // Clear form input field
        $('#user').val("");

        // Get user full name and display
        currentReposObject.getRepos(userInfo, displayUserName);

    });
});

},{"./../js/git.js":2}]},{},[3]);
