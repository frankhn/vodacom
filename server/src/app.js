var cors = require('cors');
var path = require('path');
var express = require('express');
var cloudinary = require('cloudinary');


cloudinary.v2.config({
    cloud_name: "camveni",
    api_key: "384589774575885",
    api_secret: "SXTc92FU74XCSdB_LJKOyqetNZs",
    secure: true
});


const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    );

    return next();
});

app.get('/videos', (req, res) => {
    cloudinary.v2.search.expression(
        'folder:vodacom/*'
    ).max_results(30)
        .execute()
        .then((data) => {
            return res.status(200).json({
                status: 200,
                data
            });
        })
        .catch((error) => console.log(error));
});


app.use((req, res) => {
    res.status(400).json({
        status: 400,
        message: 'Check the documentation',
    });
});

module.exports = app
