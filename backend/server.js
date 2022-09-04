/*Test Internat App API version 1.0
Author: Juri*/

var restify = require('restify');
var Connection = require('tedious').Connection;
const fetch = require('node-fetch');
var server = restify.createServer();
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var uuid = require('uuid');
var dateFormat = require('dateformat');
const bcrypt = require('bcrypt')


var connection = mysql.createConnection({server: '127.0.0.1:3306', user: 'yuriy', password: 'Test1234!', database: 'internat'});
//var connection = mysql.createConnection({server: '127.0.0.1:3306', user: 'root', password: 'root', database: 'grundsteuer'});

server.listen(7081, function () {
    console.log('listening at -> %s', server.url);
});

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

//get list of all events
server.get('/getAllEvents', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query("SELECT * FROM international_events", function (err, tmpres) {
        if (err) {
            console.log("query failed!" + req.params + err);
            return;
        }
        var out = [];
        tmpres.forEach(function (a) {
            out.push({
                id: a.id,
                year: a.year,
                event: a.name_event,
                country: a.country,
                sportsman: a.plz,
                weight: a.weight_kg,
                result: a.result,
                changed: a.createdAt,
                created: a.updatedAt
            });
        });
        res.json(out);
        console.log('Get all events');
    });
});

//get customer by year
server.get('/getResultByYear/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const year = req.params.id;
    connection.query("SELECT * FROM international_events WHERE year=?", [year], function (err, tmpres) {
            if (err) {
                console.log("query failed!" + req.params + err);
                return;
            }
            var out = [];
            tmpres.forEach(function (a) {
                out.push({
                    id: a.id,
                    year: a.year,
                    event: a.name_event,
                    country: a.country,
                    sportsman: a.plz,
                    weight: a.weight_kg,
                    result: a.result,
                    changed: a.createdAt,
                    created: a.updatedAt
                });
            });
            res.json(out);
            console.log('Get all events by year');
        });
});

//get customer by id
server.get('/getResultByWeight/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const year = req.params.id;
    connection.query("SELECT * FROM international_events WHERE weight_kg=?", [year], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + req.params + err);
            return;
        }
        var out = [];
        tmpres.forEach(function (a) {
            out.push({
                id: a.id,
                year: a.year,
                event: a.name_event,
                country: a.country,
                sportsman: a.plz,
                weight: a.weight_kg,
                result: a.result,
                changed: a.createdAt,
                created: a.updatedAt
            });
        });
        res.json(out);
        console.log('Get all events by weight');
    });
});

//add new customer - to do later
server.post('/intEvent', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    const id = req.params.id;
    const reqbody = req.body;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");
    // const birthday = dateFormat(reqbody.birthday, "yyyy-mm-dd");

    const insertbody = [reqbody.year, reqbody.name_event, reqbody.country, reqbody.sportsman, reqbody.weight, reqbody.result, date, date];
    const updatebody = [reqbody.year, reqbody.name_event, reqbody.country, reqbody.sportsman, reqbody.weight, reqbody.result, date, date];

    connection.query("SELECT * FROM international_events WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE international_events SET year=?, name_event=?, country=?, sportsman=?, weight_kg=?, result=?, updatedAt=? WHERE id=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO international_events (year, name_event, country, sportsman, weight_kg, result, createdAt, updatedAt) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new international event -> ' + reqbody.name_event + ' ' + reqbody.sportsman );
    });
});


//delete customer by id - to do later
server.del('/intEvent/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
        'ess-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,A' +
        'uthorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.id;
    connection.query("DELETE FROM international_events WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        res.json({success: true});
        console.log('Delete data from international events by id: ' + id);
    });
});

//add new customer - to do later
server.post('/customer/:surname', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    const surname = req.params.surname;
    const reqbody = req.body;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");
    const birthday = dateFormat(reqbody.birthday, "yyyy-mm-dd");

    const insertbody = [reqbody.mandant, reqbody.anrede, reqbody.titel, reqbody.phone, reqbody.postfach, reqbody.hausExt, reqbody.plzAus, reqbody.land, reqbody.name, reqbody.surname, reqbody.postcode, reqbody.city, reqbody.street, reqbody.haus, reqbody.idNumber, birthday, reqbody.steuerberater, reqbody.stbAddress, reqbody.wohnFinanzamt, reqbody.steuernumber, date, date];
    const updatebody = [reqbody.mandant, reqbody.anrede, reqbody.titel, reqbody.phone, reqbody.postfach, reqbody.hausExt, reqbody.plzAus, reqbody.land, reqbody.postcode, reqbody.city, reqbody.street, reqbody.haus, reqbody.idNumber, birthday, reqbody.steuerberater, reqbody.stbAddress, reqbody.wohnFinanzamt, reqbody.steuernumber, reqbody.name, date, reqbody.surname];

    connection.query("SELECT * FROM customers WHERE surname = ? AND geburtsdatum = ?", [surname, birthday], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE customers SET mandant=?, anrede=?, titel=?, phone=?, postfach=?, hausExt=?, postcodeAus=?, country=?, plz=?, ort=?, strasse=?, hausNummer=?, identifikationsnummer=?, geburtsdatum=?, steuerberater=?, adresseStb=?, wohnsitzFinanzamt=?, steuernummer=?, name=?, changed=? WHERE surname=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO customers (mandant, anrede, titel, phone, postfach, hausExt, postcodeAus, country, name, surname, plz, ort, strasse, hausNummer, identifikationsnummer, geburtsdatum, steuerberater, adresseStb, wohnsitzFinanzamt, steuernummer, changed, created) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new customer -> ' + surname);
    });
});

//login call - to do later
server.post('/adminlogin', bodyParser(), async function(req, res, next){
    const { email, password } = req.body;
    console.log(`try to login as: ` + email)
    connection.query("SELECT * FROM adminusers WHERE email = ?", [email], function(err, tmpres){
        if( err) {
            console.log(err)
            res.json({success: false, message:"Database error!"});
            return;
        }
        if( tmpres !== undefined && tmpres.length !== 0){
            bcrypt.compare(password, tmpres[0].password).then((equal)=>{
                if( equal)
                    res.json({success: true, message:"Login success!", data: tmpres});
                else
                    res.json({success:false, message: "User not found!", data: null});
            }).catch(()=>{
                res.json({success:false, message: "User not found!", data: null});
            })
        } else {
            res.json({success:false, message: "User not found!", data: null});
        }
    })
})

// admin register - to do later
server.post('/adminregister', bodyParser(), async function(req, res, next){
    const { fullname, email, password } = req.body;
    const hashpass = await hashPassword(password.toLowerCase());
    const date = new Date();
    var _date = dateFormat(date, "yyyy-mm-dd h:MM:ss");
    connection.query("SELECT * FROM adminusers WHERE email  = ?", [email], function(err, tmpres){
        if( err) {
            res.json({success: false, message:"Database error!"});
            return;
        }
        if( tmpres && tmpres.length !== 0 ){
            res.json({success: false, message:"This user already exists!"});
            return;
        } else {
            connection.query("INSERT INTO adminusers (fullname, email, password, createdAt, updatedAt) VALUES (?)", [[fullname, email, hashpass, _date, _date]],
                function(err2, tmpres2) {
                    if( err2 ){
                        res.json({success:false, message: "Register failed!"});
                        return;
                    }
                    res.json({success: true, message:"New admin user registered successfully!"});
                })
        }
    })
})
