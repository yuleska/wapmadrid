'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * Walker Schema
 */
var WalkerSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: 'Please fill Walker firstName',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        required: 'Please fill Walker lastName',
        trim: true
    },
    datebirth: {
        type: Date,
        required: 'Please fill Walker date of birth',
        trim: true
    },
    sex: {
        type: Number,
        default: 0,
        required: 'Please fill Walker sex',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: {
        type: String
    },
    phone: {
        type: String
    },
    weight: [{
        value: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        },
        imc: {
            type: Number
        }
    }],
    height: {
        type: Number
    },
    smoker: {
        type: Number
    },
    alcohol: {
        type: Number
    },
    groups: [{
        groupID: {
            type: Schema.ObjectId,
            ref: 'Group'
        }
    }],
    routes: [{
        routeID: {
            type: Schema.ObjectId,
            ref: 'Route'
        }
    }],
    stats: [{
        distance: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        },
        kcal: {
            type: Number
        }
    }],
    diet: [{
        answer: {
            type: Number
        }
    }],
    exercise: [{
        answer: {
            type: Number,
            default: 0
        }
    }]
});

/**
 * Hook a pre save method to hash the password
 */
WalkerSchema.pre('save', function(next) {
    if (this.password && this.password.length > 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
WalkerSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
WalkerSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('Walker', WalkerSchema);
