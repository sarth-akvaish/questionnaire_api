import express from "express";
import Questionnaire from "../model.js";
import authenticateToken from "../auth.js";

const router = express.Router();

router.post('/createQuestionnaire', authenticateToken, async (req, res) => {
    const { questions } = req.body;

    if (!questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const questionnaire = new Questionnaire({ questions });
        await questionnaire.save();
        res.status(201).json({ message: 'Questionnaire created successfully', questionnaire });
    } catch (err) {
        console.error('Failed to save questions', err);
        res.status(500).json({ error: 'Failed to save questions' });
    }
});

router.get('/getQuestions/:id', async (req, res) => {

    const { id } = req.params;
    const { page = 1 } = req.query;
    const questionsPerPage = 10;
    const skip = (page - 1) * questionsPerPage;

    try {
        const questionnaire = await Questionnaire.findById({ _id: id })
            .select('questions')
            .slice('questions', [skip, questionsPerPage]);

        if (!questionnaire) {
            return res.status(404).json({ error: 'Questionnaire not found' });
        }

        res.status(200).json({ questionnaire });
    } catch (err) {
        console.error('Failed to fetch questionnaire', err);
        res.status(500).json({ error: 'Failed to fetch questionnaire' });
    }
});

router.post('/submitAnswers/:id', async (req, res) => {
    const { id } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const questionnaire = await Questionnaire.findById(id);

        if (!questionnaire) {
            return res.status(404).json({ error: 'Questionnaire not found' });
        }

        let score = 0;
        answers.forEach(answer => {
            const question = questionnaire.questions.find(q => q.id.toString() === answer.questionId.toString());
            if (question && question.answer === answer.selectedOption) {
                score++;
            }
        });

        res.status(200).json({ score });
    } catch (err) {
        console.error('Failed to submit answers:', err);
        res.status(500).json({ error: 'Failed to submit answers' });
    }
});

export default router;