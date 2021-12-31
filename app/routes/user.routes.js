const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller.js');
const verifyToken = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin.js');
const User = require('../models/user.model')

// Create a new User
router.post('/', user.create);

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/auth', verifyToken, async (req, res) => {
	try {
		const user = await User.find({email:req.email}).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		if(user[0].role){
			return res.json({ success: true, user, isAdmin: true })
		}
		res.json({ success: true, user, isAdmin:false })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


// login
router.post('/login', user.login);

// login by google
router.post('/loginGoogle', user.loginGoogle);

// Retrieve all user
router.get('/', user.findAll);

// Retrieve a single User with UserId
router.get('/:id', user.findOne);

// Retrieve a single User with UserId
router.get('/findEmail/:email', user.findOneEmail);

// Update a User with UserId
router.put('/:id', user.update);

// Update username with User mail
router.put('/updateUsername/:email', user.updateUsername);

// Update pass with User mail
router.post('/updatePasswordCheck/:email', user.updatePasswordCheck);
router.put('/updatePassword/:email', user.updatePassword);

// Delete a User with UserId
router.delete('/:id', user.delete);

//mapping id student
router.put('/studentId/:id', user.updateStudentId)

//mapping id student when know email
router.put('/studentId/email/:email', user.updateStudentIdByEmail)

//lock user
router.put('/lock/:email', user.lockUser)

//unlock user
router.put('/unlock/:email', user.unlockUser)

module.exports = router