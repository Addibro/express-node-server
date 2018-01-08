var _ = require('lodash');
var Dog = require('../models/dog_model');

module.exports = function (app) {

    /* Create */
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if (err) {
                res.json({info: 'error during dog creation', error: err});
            }
            res.json({info: 'dog creation successful'});
        })
    });

    /* Read */
    app.get('/dog', function (req, res) {
        Dog.find(function (err, dogs) {
            if (err) {
                res.json({info: 'error during dog retrieval', error: err});
            }
            // res.json({info: 'successfully found dogs', data: dogs});
            // due to the asynchronous nature of Node, no matter how long
            // dog is taking to load, pet.js is not waiting for dog to finish
            // and will let dogs finish its work, but will process other
            // stuff in the meantime (event loop), and keep checking

            // in pet.js we cach the dog db so the second time you hit
            // the server it will load instantly
            setTimeout(function () {
                res.json({info: 'dogs found successfully', data: dogs});
            }, 10000);
        });
    });

    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({info: 'error during dog retrieval', error: err});
            }
            if (dog) {
                res.json({info: 'successfully found ' + req.params.name, data: dog});
            } else {
                res.json({info: 'dog not found'});
            }
        })
    });

    /* Update */
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({info: 'error during find dog', error: err});
            }
            if (dog) {
                _.merge(dog, req.body);
                dog.save(function (err) {
                    if (err) {
                        res.json({info: 'error during dog update', error: err});
                    }
                    res.json({info: 'dog updated successfully'});
                });
            } else {
                res.json({info: 'dog not found'});
            }
        })
    });

    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err) {
            if(err) {
                res.json({info: 'error during delete dog', error: err});
            } else {
                res.json({info: 'dog removed successfully'});
            }
        });
    });
};