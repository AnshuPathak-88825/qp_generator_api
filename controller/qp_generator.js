
module.exports.questionPaperGenerator = async (req, res, next) => {
    if(req.body.easy+req.body.medium+req.body.hard!=100)
    {
        return res.status(400).json({message:"enter valid input"})
    }
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, '../model/question.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    const questions = JSON.parse(jsonData);
    function findQuestionCombinations(questions, targetMarks) {
        const combinations = [];

        function backtrack(currentQuestions, currentSum, startIndex) {
            if (combinations.length == 1) {
                return;
            }
            if (currentSum === targetMarks) {
                combinations.push([...currentQuestions]);
                return;
            }

            if (currentSum > targetMarks || startIndex === questions.length) {
                return;
            }

            for (let i = startIndex; i < questions.length; i++) {
                const currentQuestion = questions[i];
                const newQuestions = [...currentQuestions, currentQuestion];
                const newSum = currentSum + currentQuestion.marks;

                backtrack(newQuestions, newSum, i + 1);
            }
        }

        backtrack([], 0, 0);
        return combinations;
    }
    const getquestion = (total_marks, difficulty) => {
        const e_marks = Math.floor((difficulty.easy / 100) * total_marks);
        const m_marks = Math.floor((difficulty.medium / 100) * total_marks);
        const h_marks = Math.floor((difficulty.hard / 100) * total_marks);
        const em_marks = ((difficulty.easy * total_marks) % 100) / 100;
        const mm_marks = ((difficulty.medium * total_marks) % 100) / 100;
        const hm_marks = ((difficulty.hard * total_marks) % 100) / 100;
        const combinations1 = findQuestionCombinations(questions.easy, e_marks);
        const combinations2 = findQuestionCombinations(questions.medium, m_marks);
        const combinations3 = findQuestionCombinations(questions.hard, h_marks);
        let question = [];
        question.push(...combinations1, ...combinations2, ...combinations3);
        if (em_marks > 0) {
            questions.random[0].marks = em_marks;
            question.push(...[questions.random[0]]);
        }
        if (mm_marks > 0) {
            questions.random[1].marks = mm_marks;
            question.push(...[questions.random[1]]);
        }
        if (hm_marks > 0) {
            questions.random[2].marks = hm_marks;
            question.push(...[questions.random[2]]);
        }
        return question;
    };
    const question = getquestion(req.body.marks, { easy: req.body.easy, medium: req.body.medium, hard: req.body.hard });
    const oneDArray = [].concat(...question);
   
    res.status(200).json({ success: true, oneDArray });
};
