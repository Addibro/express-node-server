var r = require('request').defaults({
    json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

module.exports = function(app) {

    /* Read */
    app.get('/pets', function (req, res) {

        // simulates a request to cat server and then execute the function after
        async.parallel({
            cats: function (callback) {
                r({uri: 'http://localhost:3002/cat'}, function (err, response, body) {
                    if (err) {
                        callback({service: 'cats', error: err});
                        return;
                    }
                    if (!err && response.statusCode === 200) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },
            dogs: function (callback) {
                // look in redis (client.get) and see if this string/key exists
                client.get('http://localhost:3003/dog', function (err, dog) {
                    if (err) throw err;
                    if (dog) {
                        // if it does, then stringify it, turn it back info an object and send it
                        // (means that redis has cached it)
                        callback(null, JSON.parse(dog));
                    } else {
                        // Otherwise we have to get it
                        r({uri: 'http://localhost:3003/dog'}, function (err, response, body) {
                            if (err) {
                                callback({service: 'dogs', error: err});
                                return;
                            }
                            if (!err && response.statusCode === 200) {
                                callback(null, body.data);
                                // put the url (a new key) in the cache
                                // with a value of the body of the dog server
                                // set the expiry time to 10 secs
                                client.setex('http://localhost:3003/dog', 10, JSON.stringify(body.data), function (err) {
                                    if (err) throw err;
                                });
                            } else {
                                callback(response.statusCode);
                            }
                        });
                    }
                });
            }
        }, function (err, results) {
            res.json({
                error: err,
                results: results
            })
        });
    });

    app.get('/ping', function (req, res) {
        res.json({pong: Date.now()});
    });

};