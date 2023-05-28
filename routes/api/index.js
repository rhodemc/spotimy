const router = require('express').Router();
const friendRoutes = require('./friendRoutes');
const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/friend', friendRoutes);
router.use('/reaction', reactionRoutes);
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;