In this simple blog application, I use a mongoose database to create, read, update, and destroy a blog post.

The blog is minimalistic and only has a navbar with a home and "new post" links.

At the beginning, there are no blogs to show and the container in the middle of the page is blank.

When a user creates a new post, he/she is asked to fill in the name of the post, to add an image url to an image they want to include in the post, and a description of the post.

Each blog is displayed at the home page, but I only show some details about the blog such as the title, time of creation, and a substring of the description.

In addition, a user can "read more" about a certain post and will be taken to a "show" page where the user can view the full details of the description, and they will have the option to edit or delete the post.


RESTFUL routes table using a "dog" example:

NAME       |    PATH            |  HTTP Verb  | Purpose                                         |  Mongoose Method

Index      | 	/dogs	        |   GET	      | List all dogs       	                        |   Dog.find()
New        |	/dogs/new	    |   GET	      | Show new dog form                               |	N/A
Create	   |    /dogs	        |   POST	  | Create a new dog, then redirect somewhere       |	Dog.create()
Show       |	/dogs/:id	    |   GET	      | Show info about one specific dog                |	Dog.findById()
Edit	   |    /dogs/:id/edit	|   GET	      | Show edit form for one dog	                    |   Dog.findById()
Update	   |    /dogs/:id	    |   PUT	      | Update particular dog, then redirect somewhere  |	Dog.findByIdAndUpdate()
Destroy	   |    /dogs/:id	    |   DELETE	  | Delete a particular dog, then redirect somewhere|	Dog.findByIdAndRemove()

mongodb setup:

1) create a database directory in workspace
2) install mongod following these instructions (only for cloud9):  https://community.c9.io/t/setting-up-mongodb/1717
3) run ./mongod if you see the mongod* in the directory
4) if we idle and close out of c9 before shutting down the database, do ./mongod --repair

mongoose schema setup:

    var <nameSchema> = new mongoose.Schema({
        <attr1>: <attr>,
        <attr2>: <attr>
    });
    
Mongoose model/config:

    var <name> = mongoose.model("<name>", blogSchema);
    
Method overriding for "put" and "delete" requests:

        1) install method-override package
        2) var methodOverride = require("method-override");
        2) app.use(methodOverride("_method"));
        
        Then in the ejs template in the respective form action at the end of the url, add: "?_method=DELETE" or "?_method=PUT"
        
Express sanitizer:

        1) npm install express-sanitizer package
        2) app.use(expressSanitizer()); 
            --must go after bodyParser, use sanitizer in create and update routes
        --used to prevent a user from entering manuall javascript code in the body of the blog post
            
/* More notes in code */

