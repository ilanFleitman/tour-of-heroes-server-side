var express = require('express');
var mogodb = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test';
var router = express.Router();

var heroes = [{'id': 1, 'name': 'batman'}, {'id': 2, 'name': 'spiderman'}, {'id': 3, 'name': 'superman'}];

/* GET users listing. */


router.get('/', function (req, res, next) {
    mogodb.connect(url, function (err, db) {
       if(err) {
           db.close();
           res.send(500);
           throw err;
       }
       db.collection("heroes").find().toArray(function (err, result) {
           if(err) {
               db.close();
               res.send(500);
           }
           db.close();
           res.json(result);

       })
    });
});

router.get('/:id', function (req, res, next) {
    for (var hero of heroes) {
        if (hero.id === parseInt(req.params.id)) {
          res.json(hero);
        }
    }

    res.send("error");
});

router.put('/:id', function (req, res) {
    heroes.push(req.body);
    res.send('ok');
})

router.post('/', function (req, res) {
    mogodb.connect(url, function (err, db) {
        if(err) {
            db.close();
            res.send(500);
            throw err;
        }
        db.collection("heroes").insertOne({id: parseInt(req.body._id), name: req.body._name}, function (err, result) {
            if(err) {
                db.close();
                res.send(500);
            }
            db.close();
            res.send('ok');

        })
    });


});

router.delete('/:id', function (req, res) {
    mogodb.connect(url, function (err, db) {
        if(err) {
            db.close();
            res.send(500);
            throw err;
        }
        db.collection("heroes").deleteOne({id: parseInt(req.params.id)}, function (err, result) {
            if(err) {
                db.close();
                res.send(500);
            }
            db.close();
            res.sendStatus(200);

        })
    });
});

router.delete('/?name=term', function (req, res) {
    for (let hero of heroes) {
        if (hero.name.includes(req.query.name)) {
            heroes.splice(heroes.indexOf(hero), 1);
        }
    }

    res.send('deleted');
});
module.exports = router;
