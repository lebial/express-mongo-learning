// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

// @desc    Create a singe bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private 
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create a bootcamps' });
};

// @desc    Update single Bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private 
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Displays bootcamp ${req.params.id}` });
};

// @desc    Delete single Bootcamp
// @route   DELETE /api/v1/bootcamps
// @access  Private 
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};