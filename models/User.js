// dependencies
const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// userSchema for User model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            // getters: true 
        },
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
