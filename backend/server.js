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

//add new international event
server.post('/intEvent', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");



    const reqbody = req.body;
    const id = reqbody.id;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");

    const insertbody = [reqbody.year, reqbody.name_event, reqbody.country, reqbody.sportsman, reqbody.weight, reqbody.result, date, date];
    const updatebody = [reqbody.year, reqbody.name_event, reqbody.country, reqbody.sportsman, reqbody.weight, reqbody.result, date, id];

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


//delete international eventby id
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

//get list of all local events
server.get('/localEvents', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query("SELECT * FROM local_event", function (err, tmpres) {
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
                city: a.city,
                sportsman: a.sportsman,
                weight: a.weight_kg,
                result: a.result,
                changed: a.createdAt,
                updated: a.updatedAt
            });
        });
        res.json(out);
        console.log('Get all local events');
    });
});

//add new local event
server.post('/localEvent', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const reqbody = req.body;
    const id = reqbody.id;


    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");

    const insertbody = [reqbody.year, reqbody.event, reqbody.city, reqbody.sportsman, reqbody.weight, reqbody.result, date, date];
    const updatebody = [reqbody.year, reqbody.event, reqbody.city, reqbody.sportsman, reqbody.weight, reqbody.result, date, id];

    connection.query("SELECT * FROM local_event WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE local_event SET year=?, name_event=?, city=?, sportsman=?, weigt_kg=?, result=?, updatedAt=? WHERE id=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO local_event (year, name_event, city, sportsman, weigt_kg, result, createdAt, updatedAt) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new local event -> ' + reqbody.event + ' ' + reqbody.sportsman);
    });
});


//delete local event by id
server.del('/localEvent/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
        'ess-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,A' +
        'uthorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.id;
    connection.query("DELETE FROM local_event WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        res.json({success: true});
        console.log('Delete data from local events by id: ' + id);
    });
});

//get list of all trainers
server.get('/trainers', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query("SELECT * FROM trainers", function (err, tmpres) {
        if (err) {
            console.log("query failed!" + req.params + err);
            return;
        }
        var out = [];
        tmpres.forEach(function (a) {
            out.push({
                id: a.id,
                name: a.name,
                surname: a.surname,
                phone: a.phone,
                category: a.category,
                changed: a.created,
                updated: a.updated
            });
        });
        res.json(out);
        console.log('Get all trainers');
    });
});


//add new trainer
server.post('/trainer', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const reqbody = req.body;
    const id = reqbody.id;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");

    const insertbody = [reqbody.name, reqbody.surname, reqbody.phone, reqbody.category, date, date];
    const updatebody = [reqbody.name, reqbody.surname, reqbody.phone, reqbody.category, date, id];

    connection.query("SELECT * FROM trainers WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE trainers SET name=?, surname=?, phone=?, category=?, updated=? WHERE id=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO trainers (name, surname, phone, category, updated, created ) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new trainer -> ' + reqbody.name + ' ' + reqbody.surname);
    });
});


//delete trainer by id
server.del('/trainer/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
        'ess-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,A' +
        'uthorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.id;
    connection.query("DELETE FROM trainers WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        res.json({success: true});
        console.log('Delete trainer by id: ' + id);
    });
});



//get list of allsportsmen
server.get('/allSportsmen', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query("SELECT * FROM sportsmen", function (err, tmpres) {
        if (err) {
            console.log("query failed!" + req.params + err);
            return;
        }
        var out = [];
        tmpres.forEach(function (a) {
            out.push({
                id: a.id,
                name: a.name,
                surname: a.surname,
                birthday: a.bithday_date,
                phone: a.phone,
                changed: a.created,
                updated: a.updated
            });
        });
        res.json(out);
        console.log('Get all sportsmen');
    });
});


//add new sportsman - to do later
server.post('/sportsman', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const reqbody = req.body;
    const id = reqbody.id;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");

    const insertbody = [reqbody.name, reqbody.surname, null, reqbody.phone, date, date];
    const updatebody = [reqbody.name, reqbody.surname, null, reqbody.phone, date, id];

    connection.query("SELECT * FROM sportsmen WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE sportsmen SET name=?, surname=?, bithday_date=?, phone=?, updated=? WHERE id=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO sportsmen (name, surname, bithday_date, phone, updated, created ) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new sportsman -> ' + reqbody.name + ' ' + reqbody.surname );
    });
});


//delete sportsman by id - to do later
server.del('/sportsman/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
        'ess-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,A' +
        'uthorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.id;
    connection.query("DELETE FROM sportsmen WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        res.json({success: true});
        console.log('Delete sportsman by id: ' + id);
    });
});


//get list of allsportsmen
server.get('/allTrainings', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    connection.query("SELECT * FROM plan", function (err, tmpres) {
        if (err) {
            console.log("query failed!" + req.params + err);
            return;
        }
        var out = [];
        tmpres.forEach(function (a) {
            out.push({
                id: a.id,
                task: a.task,
                day: a.day,
                morning: a.morning,
                evening: a.evenig,
                description: a.description,
                changed: a.created,
                updated: a.updated
            });
        });
        res.json(out);
        console.log('Get all tasks from plan');
    });
});


//add new sportsman - to do later
server.post('/training', bodyParser(), function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    const id = req.params.id;
    const reqbody = req.body;

    const date_ = Date.now();
    const date = dateFormat(date_, "yyyy-mm-dd h:MM:ss");
    // const birthday = dateFormat(reqbody.birthday, "yyyy-mm-dd");

    const insertbody = [reqbody.task, reqbody.day, reqbody.morning, reqbody.evening, reqbody.description, date, date];
    const updatebody = [reqbody.task, reqbody.day, reqbody.morning, reqbody.evening, reqbody.description, date, reqbody.id];

    connection.query("SELECT * FROM plan WHERE id = ?", [reqbody.id], function (err, tmpres) {
        if (err) {
            console.log("query failed!" + err);
            res.json({success: false});
        }
        if( tmpres.length !== 0 ){
            connection.query("UPDATE plan SET task=?, day=?, morning=?, evenig=?, description=?, updated=? WHERE id=?", updatebody,
                function(err, r){
                    if( err ) {
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        } else {
            connection.query("INSERT INTO plan (task, day, morning, evenig, description, updated, created ) VALUES (?)", [insertbody],
                function(err, r){
                    if( err ){
                        console.log(err);
                        res.json({success: false});
                    }
                    res.json({success: true});
                })
        }
        console.log('Add new task -> ' + reqbody.task);
    });
});


//delete sportsman by id - to do later
server.del('/training/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
        'ess-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,A' +
        'uthorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.id;
    connection.query("DELETE FROM plan WHERE id = ?", [id], function (err, tmpres) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        res.json({success: true});
        console.log('Delete task from plan: ' + id);
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
