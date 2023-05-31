// dependencies
const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

// ReactionSchema for Thought model
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // default value set to a new ObjectId
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: [1, 'Your reaction must be at least 1 character long.'],
        maxlength: [280, 'Your reaction must be less than 280 characters long.']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // default value set to current timestamp
        default: Date.now,
        // use dayjs to format date
        get: (createdAtVal) => dayjs(createdAtVal).format('MMMM D, YYYY h:mm A')
    }
});

//thoughtSchema for Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Your thought must be at least 1 character long.'],
        maxlength: [280, 'Your thought must be less than 280 characters long.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use dayjs to format date
        get: (createdAtVal) => dayjs(createdAtVal).format('MMMM D, YYYY h:mm A')
    },
    username: {
        type: String,
        required: true
    },
    // use ReactionSchema to validate data for a reply
    reactions: [ReactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;