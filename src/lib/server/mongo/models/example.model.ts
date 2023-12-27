import { Schema } from 'mongoose';

const Example = new Schema({
	name: { type: String, default: 'hahaha' },
	age: { type: Number, min: 18, index: true }
});

// middleware
Example.pre('save', function (next) {
	next();
});
