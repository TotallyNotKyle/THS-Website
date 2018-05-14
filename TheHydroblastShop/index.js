// Express, to serve the webpages
let express = require('express');
// Instance of express
let app = express();
let router = express.Router();
// The port the server runs on
let port = 1337;

// Location of files the client uses
app.use(express.static('public'));

// Routes
getRoute('/', 'home.html');
getRoute('/home/', 'home.html');
getRoute('/about/', 'about.html');
getRoute('/faq/', 'faq.html');
getRoute('/contact/', 'contact.html');
getRoute('/pricing/', 'pricing.html');
getRoute('/gallery/', 'gallery.html');
//getRoute('/projects/', 'projects.html');
getRoute('/', 'home.html');
getRoute('/home.html', 'home.html');
getRoute('/about.html', 'about.html');
getRoute('/faq.html', 'faq.html');
getRoute('/contact.html', 'contact.html');
getRoute('/pricing.html', 'pricing.html');
getRoute('/gallery.html', 'gallery.html');
getRoute('/projects.html', 'gallery.html');


function getRoute(route, path) {
    console.log("Run getRoute " + route);
    router.get(route, function (req, res, next) {
        console.log(req.params.id)
        res.sendFile(__dirname + '/public/views/' + path);
    });
}

// Catches 404
getRoute('/*', '404.html');

// mount the router on the app
app.use('/', router)

// Hosts the server on port
app.listen(port, function() {
    console.log('App listening on port ' + port);
});