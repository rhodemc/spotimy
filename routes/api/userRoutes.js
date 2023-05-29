// Initialize express router
const router = require('express').Router();

// Import user controller and functions
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Set up GET all to get all users and POST to create a user
router.route('/').get(getAllUser).post(createUser);

// Set up GET user by ID, PUT to update a user by ID, and DELETE to delete a user by ID
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Set up POST to add a new friend to a user's friend list and DELETE to remove a friend from a user's friend list
router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;