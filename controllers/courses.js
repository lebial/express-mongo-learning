const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all courses 
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) =>{
  const { bootcampId } = req.params;
  if (bootcampId) {
    const courses = await Course.find({ bootcamp: bootcampId });
    return res.status(200).json({
      sucess: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get a course 
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc    ADd a course 
// @route   Post /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params
  req.body.bootcamp = bootcampId;

  const bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id of ${bootcampId} found`),
      404,
    )
  }

  const course = await Course.create(req.body);

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc    Update a course 
// @route   Post /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id} found`),
      404,
    )
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @desc    Update a course 
// @route   Delete /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with id of ${req.params.id} found`),
      404,
    )
  }
  
  course.remove();

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  res.status(201).json({
    success: true,
    data: {},
  });
});
