var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data=[
    {
        name:"Cloud's Rest",
        image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=42b2e0af84cb66075cdfc0957f140652&auto=format&fit=crop&w=1053&q=80",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Desert Mesa",
        image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cfe9dd8ec2366865f02eabd3a8c91d3f&auto=format&fit=crop&w=500&q=60",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Canyon Floor",
        image:"https://images.unsplash.com/photo-1491439176760-28b4d8675a59?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82c8bccdd63f23165aa1ba5ff3e7bb23&auto=format&fit=crop&w=500&q=60",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
            console.log("removed campgrounds!");
               
        //Add a  few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is great, but I wish there was internet.",
                            author:"Homer"
                        }, function(err, comment){
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    
    //Add a few comments
}

module.exports = seedDB;