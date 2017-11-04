var express = require('express');
var router = express.Router();

var heroes = [{'id': 1, 'name': 'batman'}, {'id': 2, 'name': 'spiderman'}, {'id': 3, 'name': 'superman'}];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json(heroes);
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
   heroes.push(req.body);
   res.send('ok');

});

router.delete('/:id', function (req, res) {
    for (let hero of heroes) {
        if (hero.id === parseInt(req.params.id)) {
            heroes.splice(heroes.indexOf(hero), 1);
        }
    }

    res.send('deleted');
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
