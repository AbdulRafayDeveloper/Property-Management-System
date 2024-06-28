const mongoose = require("mongoose");
const validator = require('validator');

const applicationSchema = new mongoose.Schema(
	{
		listing: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Listing'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Users'
		},
		isStudent: { type: Boolean, default: false },
		moveInDate: {
			type: Date,
			required: true
		},
		moveOutDate: {
			type: Date,
			required: true
		},
		monthlyIncome: {
			type: Number,
			required: true,
			validate(value) {
				if (value < 0) {
					throw new Error('Monthly income must be a positive number');
				}
			}
		},
		currentLandlord: {
			name: {
				type: String,
				required: true
			},
			phone: {
				type: String,
				required: true,
				// validate(value) {
				// 	if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
				// 		throw new Error('Invalid phone number format');
				// 	}
				// }
			},
			email: {
				type: String,
				required: true,
				validate(value) {
					if (!validator.isEmail(value)) {
						throw new Error('Invalid email address');
					}
				}
			}
		},
		coApplicant: {
			name: {
				type: String
			},
			phone: {
				type: String,
				// validate(value) {
				// 	if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
				// 		throw new Error('Invalid phone number format');
				// 	}
				// }
			},
			email: {
				type: String,
				validate(value) {
					if (value && !validator.isEmail(value)) {
						throw new Error('Invalid email address');
					}
				}
			}
		},
		introduction: {
			type: String,
			required: true
		},
		documents: {
			proofOfEarnings: {
				type: [String],
				required: true
			},
			workConfirmation: {
				type: [String]
			},
			studentDocuments: {
				uniConfirmation: {
					type: [String]
				},
				guarantorLetter: {
					type: [String]
				}
			},
			referenceLetter: {
				type: [String],
				required: true
			},
			idUpload: {
				type: String,
				required: false
			}
		},
		status: {
			type: String,
			enum: ['Sent', 'Unfinished', 'Processing', 'Rejected', 'Accepted'],
			default: 'Unfinished'
		},
		requestDocuments: {
			type: [String],
			default: []
		}
	},
	{
		timestamps: true
	}
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
