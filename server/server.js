var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');

var config = require('./config.js');

var morgan = require('morgan');

var massiveInstance = massive.connectSync({connectionString: config.connectionString});

var app = module.exports = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(cookieParser());

// require('./routes.js')(app, passport);
app.use(cors());
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 14) // 14 days
    }
}));

app.set('db', massiveInstance);
var db = app.get('db');

var nodemailer = require('nodemailer');

var router = express.Router();
app.use('/sayHello', router);
router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

let selfSignedConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: config.email,
        pass: config.pass
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport(selfSignedConfig, {
        host: 'smtp.gmail.com', port: 465, secure: true, // use TLS
        auth: {
            user: config.email, // Your email id
            pass: config.pass // Your password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var text = 'Hello, my name is \n\n' + req.body.firstName + req.body.lastName;
    var mailOptions = {
        from: config.email, // sender address
        to: req.body.email + ', ' + config.email, // list of receivers
        subject: 'Email Example', // Subject line
        // text: text //, // plaintext body
        html: '<div style="color: black"><p>Hello! My name is ' + req.body.firstName + ' ' + req.body.lastName + '.</p><p>I\'m interest in the ' + req.body.suite + '.</p><br><b>Questions or Comments</b><br><p style="border: solid 1px black">' + req.body.comment + '</p><h4><br>You can reach me at ' + req.body.email + ' or ' + req.body.telephone + '.</h4></div>'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("error" + error);
            res.json({yoE: error});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
}
app.post("/contact", handleSayHello);
app.listen(config.port, function() {
    console.log("Yo, it's your port, " + config.port);
});
