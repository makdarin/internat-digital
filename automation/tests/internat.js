/*
 * Internat APIs - test calls 
 * */

var
    config = require('../config/config_internat.json'),
    async = require('async'),
        chai = require('chai'),
        expect = chai.expect,
        should = chai.should(),
        request = require('request'),
        logger = require('../include/logger.js'),
        log = logger.logger

var getAPIUrl = function(path) {
    return config.api.host;
};


chai.Assertion.addProperty('json', function() {
    JSON.parse(this._obj);
});

// Internat API Calls
var ENDPOINT_API_SPORTSMEN = getAPIUrl('/sportsman');
var ENDPOINT_API_INTERNATIONAL_EVENT = getAPIUrl('intEvent')

var token = null;

// Start of testing process
describe('Internat - automation testing', function(cb) {

//===========================================STRART POST REQUESTS==================================================


    //Хотим протестировать добавление нового спортсмена в базу данных через апи
    it('should be possible to insert new sportsmen ' + config.internat.sportsmen.name, function(cb) {
        this.timeout(6000);
        console.log("Starting with POST requests...");

        request.post("http://95.217.210.206/api/v1/internat/sportsman", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            },
            body: {
                name: config.internat.sportsmen.name,
                surname: config.internat.sportsmen.surname,
                phone: config.internat.phone
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to insert new sportsmen - POST request: " + config.internat.sportsmen.name;
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });

    //Хотим протестировать добавление нового международного турнира в базу данных через апи
    it('should be possible to insert new international event ' + config.internat.int_event.name_event, function(cb) {
        this.timeout(6000);
        // console.log(ENDPOINT_API_SPORTSMEN)
        request.post("http://95.217.210.206/api/v1/internat/intEvent", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            },
            body: {
                year: config.internat.int_event.year,
                name_event: config.internat.int_event.name_event,
                country: config.internat.int_event.country,
                sportsman: config.internat.int_event.sportsman,
                weight: config.internat.int_event.weight,
                result: config.internat.int_event.result
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to insert new international event - POST request: " + config.internat.int_event.name_event;
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });

    //Хотим протестировать добавление нового тренерав базу данныз через апи
    it('shoud be possible to insert new trainer' + config.internat.trainers.name, function(cb) {
        this.timeout(6000);
        // console.log(ENDPOINT_API_TRAINERS)
        request.post("http://95.217.210.206/api/v1/internat/trainer", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            },
            body: {
                name: config.internat.trainers.name,
                surname: config.internat.trainers.surname,
                phone: config.internat.trainers.phone,
                category: config.internat.trainers.category
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to insert new trainer - POST request: " + config.internat.trainers.trainer;
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
            }
            cb();
        });
    });

    //Хотим протестировать добавление нового местного турнира в базу данных через апи
    it('should be possible to insert new local event ' + config.internat.local_event.event, function(cb) {
        this.timeout(6000);
        // console.log(ENDPOINT_API_SPORTSMEN)
        request.post("http://95.217.210.206/api/v1/internat/localEvent", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            },
            body: {
                year: config.internat.local_event.year,
                event: config.internat.local_event.event,
                city: config.internat.local_event.city,
                sportsman: config.internat.local_event.sportsman,
                weight: config.internat.local_event.weight,
                result: config.internat.local_event.result
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to insert new local event - POST request: " + config.internat.local_event.event;
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });

//===========================================END POST REQUESTS==================================================

//===========================================STRART GET REQUESTS==================================================
    console.log("Starting with GET requests...");

    //Хотим вытащить все местные турниры с базы данных через апи
    it('should be possible to get local events ', function(cb) {
        this.timeout(6000);
        request.get("http://95.217.210.206/api/v1/internat/localEvents", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to get new local event - GET request: ";
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });

      //Хотим вытащить все международных турниров с базы данных через апи
    it('should be possible to get international events ', function(cb) {
        this.timeout(6000);
        console.log("Starting...");
        // console.log(ENDPOINT_API_SPORTSMEN)
        request.get("http://95.217.210.206/api/v1/internat/getAllEvents", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession-Token': token
            }
        }, function(err, res, body) {
            try {
                console.log(body);
                // console.log(err)
                // console.log(res)
                var testCase = "should be possible to get new international event - GET request: ";
                should.not.exist(err);
                should.exist(body);
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });


//Хотим вытащить все данныз спортсменов ч базы данных через апи
it('should be possible to get sportsmen ', function(cb) {
    this.timeout(6000);
    console.log("Starting...");
    //console.log(ENDPOINT_API_SPORTSMEN)
    request.get("http://95.217.210.206/api/v1/internat/allSportsmen",{
        json: true,
        strictSSL: config.api.checkCertificate,
        headers: {
            'X-CSession-Token': token
        }
    },function(err,res,body) {
        try {
            console.log(body);
            var testCase = "should be possible to get list of sportsman - GET request: ";
            should.not.exist(err)
            should.exist(body);
            res.statusCode.should.equal(200);
            switch (res.statusCode == 200) {
                case true:
                log.info("Passed:" + testCase);
                break;

            }
        }catch (err) {
            log.error("Failed: " + testCase + '->' + err);
            should.throw(err);
        }
        cb();
    });
});

//Хотим вытащить все данныз тренеров  С базы данных через апи 
it('should be possible to get trainers ', function(cb) {
    this.timeout(6000);
    console.log("Starting...");
    // console.log(ENDPOINT_API_TRAINERS)
    request.get("http://95.217.210.206/api/v1/internat/trainers", {
        json: true,
        strictSSL: config.api.checkCertificate,
        headers: {
            'X-CSession-Token': token
        }
    }, function(err,res,body) {
        try {
            console.log(body);
            // console.log(err)
            // console.log(res)
            var testCase = "should be possible to get new trainer - GET request: ";
            should.not.exist(err);
            should.exist(body);
            res.statusCode.should.equal(200);
            switch (res.statusCode == 200) {
                case true:
                log.info("Passed:" + testCase);
                break;
            }
        }catch (err) {
            log.error("Failed: " + testCase + '->' + err);
            should.throw(err);
        }
        cb();
    });
});

//===========================================STOP GET REQUESTS=================================================


//===========================================START DELETE REQUESTS=================================================
it('should be possible to delete international event:',
     function(cb) {
        this.timeout(6000);
        request.del("http://95.217.210.206/api/v1/internat/intEvent/34", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession': token

            }
        }, function(err,res,body) {
            try {
                console.log(body);
                var testCase= "should be possible to delete inernational event: ";
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break
                }
            }catch (err) {
                log.err("Failded: " + testCase + ' ->' + err);
                should.throw(err);
            }
            cb();
        });
     });

    it('should be possible to delete trainer: ',
    function(cb) {
        this.timeout(6000);
        request.del("http://95.217.210.206/api/v1/internat/trainers/34", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession': token
            }
        }, function(err,res,body) {
            try {
                console.log(body);
                var testCase = "should be possible to delete trainer: ";
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break;
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });

    it('should be possibl to delete sportsman: ',
    function(cb) {
        this.timeout(6000);
        request.del("http://95.217.210.206/api/v1/internat/allSportsmen/34", {
            json: true,
            strictSSL: config.api.checkCertificate,
            headers: {
                'X-CSession': token
            }
        }, function(err,res,body) {
            try {
                console.log(body);
                var testCase = "should be possible to delete sportsman: ";
                res.statusCode.should.equal(200);
                switch (res.statusCode == 200) {
                    case true:
                        log.info("Passed: " + testCase);
                        break
                }
            } catch (err) {
                log.error("Failed: " + testCase + '->' + err);
                should.throw(err);
            }
            cb();
        });
    });
    
it('should be possible to delete local event: ', 
    function(cb) {
            this.timeout(6000);
            request.del("http://95.217.210.206/api/v1/internat/localEvent/34", {
                json: true,
                strictSSL: config.api.checkCertificate,
                headers: {
                    'X-CSession': token
                }
            }, function(err, res, body) {
                try {
                    console.log(body);
                    var testCase = "should be possible to delete local event: ";
                    res.statusCode.should.equal(200);
                    switch (res.statusCode == 200) {
                        case true:
                            log.info("Passed: " + testCase);
                            break;
                    }
                } catch (err) {
                    log.error("Failed: " + testCase + ' ->' + err);
                    should.throw(err);
                }
                cb();
            });
        });


        
//===========================================STOP DELETE REQUESTS=================================================

});
    /*           

    const SUCCESS = {
        statuscode: 200,
        success: true,
        errorcode: 0
    };

    const INVALID_INPUT = {
        statuscode: 406,
        success: false,
        message: "Invalid input"
    };

    const CUSTOMER_NOT_FOUND = {
        statuscode: 404,
        success: false,
        message: 'customer not found'
    };

    const UNEXPECTED_ERROR = {
        statuscode: 500,
        success: false,
        message: 'Unexpected error'
    };
    var token = null; */

