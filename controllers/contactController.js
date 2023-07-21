const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc get all contacts
//@route GET /api/contact
//@access private
const getContact = asyncHandler(async (req, res) => {
   const contacts = await Contact.find({user_id: req.user.id})
   res.status(200).json({
      message:"Get all contacts",
      data: contacts
   })
})

//@desc get a specific contact
//@route GET /api/contact/:id
//@access private
const getContactWithId = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if (!contact) {
      res.status(404)
      throw new Error("Contact was not found")
   }
   res.status(200).json({
      message: `Contact with id ${req.params.id} got successfully`,
      contact
   })
})

//@desc create new contact
//@route POST /api/contact
//@access private
const createContact = asyncHandler(async (req, res) => {
   const { name, email, phone } = req.body
   if (!name || !email || !phone) {
      res.status(400)
      throw new Error("All fields are mandatory")
   }
   const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id
   })
   res.status(201).json({
      message: "Data Posted Successfully",
      data: contact
   })
}
)
//@desc update a contact
//@route PUT /api/contact/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)
   if (!contact) {
      res.status(404)
      throw new Error("Contact not found")
   }

   if (contact.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("You don't have permission to update contact for this user")
   }
   const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
   )
   res.status(202).json({
      message: `Contact with id ${req.params.id} has been update successfully`,
      updatedContact,
   })
})

//@desc delete a contact
//@route DELETE /api/contact/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id)

   if (!contact) {
      res.status(404).json({
         message: "Requested Conact cannot be found"
      })
   }
   if (contact.user_id.toString() !== req.user.id) {
      res.status(403)
      throw new Error("You don't have permission to delete contact for this user")
   }
   await Contact.deleteOne({_id: req.params.id})
   res.status(202).json({
      message: `Contact with id ${req.params.id} has been deleted successfully`,
      contact,
   })
})
module.exports = {getContact, getContactWithId, createContact, updateContact, deleteContact}