// Initialize express router
const router = require('express').Router();
// Import the methods from the thought-controller
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// GET and POST at /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;