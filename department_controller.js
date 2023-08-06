const express = require('express');
var router = express.Router();
var Department = require('./department');

router.post('/', function (req, res) {
    console.log(req.body);

    let department = new Department({ name: req.body.name });
    department.save((err, dep) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(department);
    })
})

router.get('/', function (req, res) {
    console.log(req.body);

    Department.find().exec((err, departments) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(departments);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Department.deleteOne({ _id: id }, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    })
})

router.patch('/:id', (req, res) => {
    Department.findById(req.params.id, (err, department) => {
        if (err)
            res.status(500).send(err);
        else if (!department)
            res.status(404).send({});
        else {
            department.name = req.body.name;
            department.save()
                .then((dep) => res.status(200).send(dep))
                .catch((err) => res.status(500).send(err));
        }
    })
})

module.exports = router;