import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const questionnaireSchema = new mongoose.Schema({
    questions: {
        type: [questionSchema],
        required: true
    }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

export default Questionnaire;
