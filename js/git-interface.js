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
