import QuizContext from "./quizContext";
import { useEffect, useState } from "react";

const QuizState = (props) => {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState({ 'rightAnswers': 0, 'wrongAnswers': 0 });
    const [next, setNext] = useState(0);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const len = questions.length;
    const [answerList, setAnswerList] = useState([]);

    const fetchQuestions = async (api) => {
        const response = await fetch(api);
        const data = await response.json();
        let results = data.results;
        setQuestions(results);
        setLoading(false);
    };

    // Ensure that the answerList is updated when moving to the next question
    useEffect(() => {
        // Add the new answer to the list when moving to the next question
        if (next > 0 && next <= len) {
            setAnswerList(prevAnswerList => [
                ...prevAnswerList,
                {
                    'question': questions[next - 1].question, // Adjusted to use the correct question
                    'options': questions[next - 1].incorrect_answers, // Adjusted to use the correct options
                    'id': `id${next - 1}`,
                    'category': questions[next - 1].category, // Adjusted to use the correct category
                    'myAnswer': '',
                    'rightAnswer': questions[next - 1].correct_answer // Adjusted to use the correct correct_answer
                }
            ]);
        }
    }, [next, len, questions]);

    useEffect(() => {
        fetchQuestions(url);
    }, [url]);

    return (
        <QuizContext.Provider value={{ answerList, setAnswerList, len, questions, setQuestions, url, setUrl, fetchQuestions, loading, setLoading, score, setScore, next, setNext }}>
            {props.children}
        </QuizContext.Provider>
    )
}

export default QuizState;
