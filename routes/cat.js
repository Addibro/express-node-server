var _ = require('lodash');
var Cat = require('../models/cat_model');

module.exports = function (app) {

    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({info: 'error during cat creation', error: err});
            }
            res.json({info: 'cat creation successful'});
        })
    });

    /* Read */
    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.json({info: 'error during cat retrieval', error: err});
            }
            res.json({info: 'successfully found the cats', data: cats});
        })
    });

    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({info: 'error during cat retrieval', error: err});
            }
            if (cat) {
                setTimeout(function () {
                    res.json({info: 'cats found successfully', data: dogs});
                }, 10000);
                // res.json({info: 'successfully found ' + req.params.name, data: cat});
            } else {
                res.json({info: 'cat not found'});
            }
        })
    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function (err) {
                    if (err) {
                        res.json({info: 'error during cat update', error: err});
                    }
                    res.json({info: 'cat updated successfully'});
                });
            } else {
                res.json({info: 'cat not found'});
            }
        })
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err) {
            if(err) {
                res.json({info: 'error during delete cat', error: err});
            } else {
                res.json({info: 'cat removed successfully'});
            }
        });
    });
};