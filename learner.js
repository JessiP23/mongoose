import mongoose from 'mongoose';

const learnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    enrolled: {
        type: Boolean,
        required: true,
    },

    //message displays when validation fails
    year: {
        type: Number,
        min: 1995,
        message: "The year must be greater than 1995.",
        required: true,
    },

    avg: {
        type: Number,
        required: false,
    },

    //{VALUE} is the output the value that is currently being validated (and failing)
    campus: {
        type: String,
        enum: [
            "Remote",
            "Boston",
            "New York",
            "Denver",
            "Los Angeles",
            "Seattle",
            "Dallas",
        ],
        message: "{VALUE} is not a valid campus location.",
        default: "Remote",
        required: true,
    },
});

//you can build indexing into your schemas
learnerSchema.index({ name: 1 });
learnerSchema.index({ year: 1 });
learnerSchema.index({ avg: 1 });
learnerSchema.index({ campus: 1 });

//You can add methods of instances of a Mongoose model, which is simply a document object with its own instance methods
learnerSchema.methods.getPeers = function (cb) {
    return mongoose
        .model("Learner")
        .find({ campus: this.campus, year: this.year }, cb);
};

//You can also add static methods to a model for common tasks
learnerSchema.statics.findPassing = function () {
    return this.find({ avg: {$gte: 70 } });
};
learnerSchema.statics.findByCampus = function (campus) {
    return this.find({ campus });
};

//You ca add query helpers to models using the schema.query method
//allowing to extend chainable query builder API
learnerSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
};

learnerSchema.virtual("passing").get(function () {
    return this.avg >= 70;
});

export default mongoose.model("Learner", learnerSchema);