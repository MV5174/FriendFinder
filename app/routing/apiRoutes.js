var express = require("express");
var path = require("path");
var friendsData = require("../data/friends");

module.exports = function (app) {
    //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req,res){
        friendsData.push(req.body);
        res.json(true);
    });

    //code so you could clear out the table while working with the functionality.

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friendsData.length = 0;

        res.json({ ok: true });
    });
};




