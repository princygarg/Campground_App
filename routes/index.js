var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
});

//===============
//AUTH ROUTES
//===============
//show sign up form
router.get("/register", function(req, res){
    res.render("register");
});

//handler user sign up
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            //console.log(err);
            req.flash("error", err.message);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//render login form
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
});

//logout routes
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!!");
    res.redirect("/campgrounds");
});

//middleware

module.exports = router;