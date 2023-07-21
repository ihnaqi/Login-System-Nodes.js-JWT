const express  = require('express')
const {getContact, getContactWithId, createContact, updateContact, deleteContact} = require('../controllers/contactController')
const validateToken = require('../middlewares/validateTokenHandler')

const router = express.Router()

// All the routes are protected routes and need verification
router.use(validateToken)

router.route("/")
   .get(getContact)
   .post(createContact)

router.route("/:id")
   .get(getContactWithId)
   .put(updateContact)
   .delete(deleteContact)

module.exports = router