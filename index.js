const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const path = require('path');

const customer_routes =
require('./router/auth_users.js').authenticated;

const genl_routes =
require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// IMPORTANT SESSION FIX
app.use(session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));


app.use(
    "/customer/auth/*",
    function auth(req, res, next) {

        if (!req.session.authorization) {

            return res.status(403).json({
                message: "User not logged in"
            });
        }

        let accessToken =
        req.session.authorization.accessToken;

        jwt.verify(
            accessToken,
            "access",
            (err, decoded) => {

                if (err) {

                    return res.status(403).json({
                        message: "Invalid Token"
                    });
                }

                req.user = decoded;
                next();
            }
        );
    }
);

app.use(express.static(
    path.join(__dirname, 'public')
));

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});