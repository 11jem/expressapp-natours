const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//////////////////////////////////
// User Actions
//////////////////////////////////

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//////////////////////////////////
// Protected Routes
//////////////////////////////////

// Protecting all routes after this middleware
router.use(authController.protect);

// Password update
router.patch('/updateMyPassword', authController.updatePassword);

// Users getting their own data
router.get('/me', userController.getMe, userController.getUser);

// Users updating their own data
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

// Deleting (deactivating) user
router.delete('/deleteMe', userController.deleteMe);

//////////////////////////////////
// Administrator Actions
//////////////////////////////////

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
