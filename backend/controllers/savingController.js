const asyncHandler = require('express-async-handler')

const Saving = require('../models/savingModel')
const User = require('../models/userModel')

// @desc    Get savings
// @route   GET /api/savings
// @access  Private
const getSavings = asyncHandler(async (req, res) => {
  const savings = await Saving.find({ saver: req.user.id })

  res.status(200).json(savings)
})

// @desc    Set saving
// @route   POST /api/savings
// @access  Private
const setSaving = asyncHandler(async (req, res) => {
    const { date, amount, receiver, saver } = req.body;
  if (!date || !amount || !receiver || !saver ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const saving = await Saving.create({
    date, amount, receiver, saver
  })

  res.status(200).json(saving)
})

// @desc    Update saving
// @route   PUT /api/savings/:id
// @access  Private
const updateSaving = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id)

  if (!saving) {
    res.status(400)
    throw new Error('Saving not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user has admin rights
  if (!req.user.isAdmin) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedSaving = await Saving.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedSaving)
})

// @desc    Delete saving
// @route   DELETE /api/savings/:id
// @access  Private
const deleteSaving = asyncHandler(async (req, res) => {
  const saving = await Saving.findById(req.params.id)

  if (!saving) {
    res.status(400)
    throw new Error('Saving not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user has admin rights
  if (!req.user.isAdmin) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await saving.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getSavings,
  setSaving,
  updateSaving,
  deleteSaving,
}
