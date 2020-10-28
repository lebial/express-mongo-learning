const express = require('express');

// Include other resource router
const courseRouter = require('./courses');
const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router.route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/:id/photo')
  .put(bootcampPhotoUpload);


module.exports = router;