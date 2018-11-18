var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
   //res.send("YOU HIT THE POST ROUTE!");
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: description, author: author};
   //console.log(req.user);
   //campgrounds.push(newCampground);
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err) {
           console.log(err);
       } else {
           console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   });
   //redirect back to campgrounds page
   // res.redirect("/campgrounds");
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //req.params.id
    //render show template with that campground
    // res.render("show");
    //res.send("THIS WILL BE THE SHOW PAGE ONE DAY!"); 
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in?
    // if(req.isAuthenticated()){
         Campground.findById(req.params.id, function(err, foundCampground){
    //         if(err){
    //             res.redirect("/campgrounds");
    //         } else{
    //             //does user own the campground?
    //             if(foundCampground.author.id.equals(req.user._id)){
                     res.render("campgrounds/edit", {campground: foundCampground});
    //             } else {
    //                 res.send("YOU DON'T HAVE PERMISSION TO DO THAT!");
    //             }
    //         }
         });
    // } else {
    //     res.send("YOU NEED TO BE LOGGED IN TO DO THAT!!");
    // }
        //otherwise, redirect
    //if not, redirect
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//middleware

module.exports = router;
