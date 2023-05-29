const { User, Thought } = require('../models');

// user controller
const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get all users written differently than above
    // async getAllUser(req, res) {
    //     try {
    //         const dbUserData = await User.find();
    //         const users = await dbUserData.populate('thoughts').populate('friends');
    //         const userObj = {
    //             users,
    //             dbUserData
    //         }

    //         res.json(userObj);
    //     } catch (err) {
    //         console.log(err);
    //         res.sendStatus(500).json(err);
    //     }
    // },

    // get one user by id
    getUserById({ params }, res) {
        user.findone({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((dbUserData) => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },
    
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // delete user and users associated thoughts
    // ** MAKE SURE THIS WORKS, WRITTEN A LITTLE DIFFERENTLY THAN WEEKLY PROJECT **
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted!' });
            })
            .catch((err) => res.json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch((err) => res.json(err));
    },
}; //end userController()

module.exports = userController;
