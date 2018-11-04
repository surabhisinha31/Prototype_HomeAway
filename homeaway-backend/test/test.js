
var assert = require('chai').assert;
var first = require('../routes/users.js');
var second = require('../routes/search.js');
var third = require('../routes/dashboard.js');
var fourth = require('../routes/booking.js');
var request = require("request");
var expect = require("chai").expect;
var util = require("util");
var app = require('../app.js')
var chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


var request = require('request'), assert = require("assert"), http = require("http");
describe('API testing of  major functionalities', function() {
  it('Checking whether a user who has not account can sign up', function(done) {
      request.post('http://localhost:3001/users/signup', {
          form : {
              firstName : 'Archita',
              lastName : 'Sinha',
              username : 'archita2903@gmail.com',
              password : 'secret'
          }
      }, function(error, response) {
          //console.log("mocha response",response);
          expect(response).to.have.status(200);
          assert.equal(200, response.statusCode);
          done();
      });
  });

    it('Checking whether a user who has account can login', function(done) {
        request.post('http://localhost:3001/users/travelerlogin', {
            form : {
                username : 'archita2903@gmail.com',
                password : 'secret'
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('Checking whether a user who has an account can update his profile', function(done) {
        request.post('http://localhost:3001/users/updateProfile', {
            form : {
                        "email" : "archita2903@gmail.com",
                        "firstName": "Akash",
                        "lastName":"Gupta",
                        "aboutMe":"Seeking internship opportunity",
                        "city":"San Jose",
                        "company":"Student",
                        "school":"SJSU",
                        "hometown":"INDIA",
                        "language":"English",
                        "gender":"Female",
                        "contactNumber":"1234567890"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('Checking whether a logged in user can view his profile details', function(done) {
        request.post('http://localhost:3001/users/getProfile', {
            form : {
                        "email": "archita2903@gmail.com"
                    }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('Checking whether a logged in user can search for a property as per his entered criteria', function(done) {
        request.post('http://localhost:3001/search/search', {
            form : {
                email : "archita2903@gmail.com",
                propertyLocation : "Fremont,CA",
                availabilityStartDate : "2018-10-28",
                availabilityEndDate : "2018-10-28",
                accomodation : "2"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether an owner who has not account can sign up', function(done) {
        request.post('http://localhost:3001/users/ownersignup', {
            form : {
                firstName : 'Kirti',
                lastName : 'Singh',
                username : 'kirti2903@gmail.com',
                password : 'secret'
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether an owner who has account can login', function(done) {
        request.post('http://localhost:3001/users/ownerlogin', {
            form : {
                username : 'kirti2903@gmail.com',
                password : 'secret'
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether an owner can post property', function(done) {
        request.post('http://localhost:3001/search/propertypost', {
            form : {
                    "propertyDetails":  { "propertyLocation": "Fremont,CA",
                                          "propertyHeadline":"Hilton Grand Vacations Suites on the Las Vegas Strip",
                                          "propertyDescription":"This room is furnished with a microwave, coffee-making facilities",
                                          "propertyArea":"1725",
                                          "propertyType":"Hotel Suite",
                                          "bedroomNumber":"2",
                                          "bathroomNumber":"2",
                                          "accomodation":"5"
                                        },
                    "bookingType":"Instant",
                    "availabilityStartDate":"2018-10-28",
                    "availabilityEndDate":"2018-12-21",
                    "propertyPricing":"1000",
                    "nightStay":"100",
                    "email":"akashgupta2903@gmail.com"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether an owner is authenticated on not', function(done) {
        request.post('http://localhost:3001/search/ownerpost', {
            form : {
                currentuser : 'kirti2903@gmail.com'
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
    it('Checking whether a traveler can book a property', function(done) {
        request.post('http://localhost:3001/booking/booking', {
            form : {
                        "propertyId" :"5bc2bbf557908b459587e459",
                        "startDate":"2018-11-07",
                        "endDate":"2018-11-07",
                        "ownerEmail":"akashgupta2903@gmail.com",
                        "userEmail":"sushma3108@gmail.com",
                        "availability_start_date": "2018-10-18 00:00:00.000Z",
                        "availability_end_date": "2018-12-15 00:00:00.000Z",
                        "total_pricing": "80",
                        "accommodation": "2",
                        "property_headline" : "Beautiful Studio available on the Fremont Strip"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it('Checking whether a traveler can view his dashboard', function(done) {
        request.post('http://localhost:3001/dashboard/userdashboard', {
            form : {
                "uidfromtoken" : "sushma3108@gmail.com"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
        it('Checking whether an owner can view his dashboard', function(done) {
        request.post('http://localhost:3001/dashboard/ownerdashboard', {
            form : {
                "email" : "akashgupta2903@gmail.com"
            }
        }, function(error, response) {
            //console.log("mocha response",response);
            expect(response).to.have.status(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });
      it('Checking whether a traveler can send message to owner or not', function(done) {
      request.post('http://localhost:3001/travelerOwnerEmail/travelermail', {
          form : {
            "property_id" :"5bc2bbf557908b459587e459",
            "startDate":"2018-11-07",
            "endDate":"2018-11-07",
            "currentUser":"sushma3108@gmail.com",
            "owner_email":"akashgupta2903@gmail.com",
            "message" : "Hey there Owner.!!",
            "property_headline" : "Beautiful Studio available on the Fremont Strip"
          }
      }, function(error, response) {
          //console.log("mocha response",response);
          expect(response).to.have.status(200);
          assert.equal(200, response.statusCode);
          done();
      });
    });
    it('Checking whether a owner can reply to message sent from traveler', function(done) {
    request.post('http://localhost:3001/travelerOwnerEmail/ownermail', {
        form : {
          "sent_message" : "Hey traveler.!!",
          "mail_id" : "5bd6383b4bb96f6d6fc516c4"
        }
    }, function(error, response) {
        //console.log("mocha response",response);
        expect(response).to.have.status(200);
        assert.equal(200, response.statusCode);
        done();
    });
  });
    it('Checking whether a owner can view his inbox', function(done) {
    request.post('http://localhost:3001/travelerOwnerEmail/fetchmail', {
        form : {
          "currentUser" : "akashgupta2903@gmail.com"
        }
    }, function(error, response) {
        //console.log("mocha response",response);
        expect(response).to.have.status(200);
        assert.equal(200, response.statusCode);
        done();
    });
  });
    it('Checking whether a traveler can view his inbox', function(done) {
    request.post('http://localhost:3001/travelerOwnerEmail/fetchTravelermail', {
        form : {
          "currentUser" : "sushma3108@gmail.com"
        }
    }, function(error, response) {
        //console.log("mocha response",response);
        expect(response).to.have.status(200);
        assert.equal(200, response.statusCode);
        done();
    });
  });
});
