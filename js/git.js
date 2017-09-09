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


        $('#showUserInfo').append(error.responseJSON.message);
    });
};

exports.reposModule = Repos;
