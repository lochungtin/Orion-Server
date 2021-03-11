const router = require('express').Router();
let Report = require('../models/report.model');

router.route('/').get((req, res) => {
    Report.find()
        .then(rpt => res.json(rpt))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add report
router.route('/add').post((req, res) => {
    const newRpt = new Report({ 
        timestamp: new Date().getTime().toString(),
        connections: req.body.connections,
        transfers: req.body.transfers,
    });

    newRpt.save()
        .then(() => res.json('Report Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get report by id
router.route('/:id').get((req, res) => {
    Report.findById(req.params.id)
        .then(rpt => res.json(rpt))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;