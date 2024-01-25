import React, { useContext } from 'react';
import quizContext from '../../context/quizContext';
import ReviewAnswerBox from './../../components/ReviewAnswerBox/ReviewAnswerBox';

const ReviewAnswer = () => {
  const context = useContext(quizContext);
  const { answerList } = context;

  console.log(answerList)
  return (
    <>
      {answerList.map((item, index) => (
        <ReviewAnswerBox
          key={`${item.question}_${index}`} // Combine question and index
          myAnswer={item.myAnswer}
          rightAnswer={item.rightAnswer}
          question={item.question}
          options={item.options}
          category={item.category}
          num={index + 1}
        />
      ))}
    </>
  );
};

export default ReviewAnswer;
