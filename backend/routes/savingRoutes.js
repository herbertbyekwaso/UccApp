const express = require('express')
const router = express.Router()
const {
  getSavings,
  setSaving,
  updateSaving,
  deleteSaving,
} = require('../controllers/savingController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSavings).post(protect, setSaving)
router.route('/:id').delete(protect, deleteSaving).put(protect, updateSaving)

module.exports = router
