var express = require("express");
var path = require("path");
var friendsData = require("../data/friends");

module.exports = function (app) {
    //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {
        var userInp = req.body
        var bestMatch = {};
        var bestScore = 100;
        for (i = 0; i < friendsData.length; i++) {
            var currentFriend = friendsData[i];
            var currentScore = 0;
            for (j = 0; j < userInp.scores.length; j++) {
                currentScore += Math.abs(userInp.scores[j] - currentFriend.scores[j])
            }

            console.log("current friend: " + currentFriend.name);
            console.log("current score: " + currentScore);

            if (currentScore < bestScore) {
                bestScore = currentScore;
                bestMatch.name = currentFriend.name;
                bestMatch.pic = currentFriend.pic

            }

        }
        console.log("best match: " + bestMatch.name);
        console.log("best score: " + bestScore)
        res.json(bestMatch);
    })

    //code so you could clear out the table while working with the functionality.

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friendsData.length = 0;

        res.json({ ok: true });
    })
};




