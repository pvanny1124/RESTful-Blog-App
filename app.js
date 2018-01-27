var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    expressSanitizer       = require("express-sanitizer"),
    methodOverride  = require("method-override"),
    app             = express();
    
    //APP CONFIG
//mongodb://Patrick:iamironman@ds125555.mlab.com:25555/simple_blog_app
var url = process.env.DATABASEURL || "mongodb://localhost/restful_blog_app";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public")); //serve public folder for custom css
app.use(methodOverride("_method")); 
app.use(expressSanitizer()); //must go after bodyParser, use sanitizer in create and update routes

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} //Date represents a single moment in time in ms. date.now gets the current time
});

//MONGOOSE/MODEL CONFIG
var Blog = mongoose.model("Blog", blogSchema);

//RESTful ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");    
});

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
        
    });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
       req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog, function(err, newBlog){
            if(err){
                res.render("new");
            } else {
                res.redirect("/blogs");
            }
        });
});

//SHOW route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
     
});

//UPDATE route
app.put("/blogs/:id", function(req, res){
    
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }
       else {
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

//DELETE route
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS LISTENING");
})