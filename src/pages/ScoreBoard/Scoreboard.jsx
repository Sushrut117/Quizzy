import React, { useContext } from 'react';
import './Scoreboard.css';
import { AiOutlineHome, AiOutlineEye } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';
import quizContext from '../../context/quizContext';
import { Link as ReachLink } from 'react-router-dom';

const Scoreboard = (props) => {
  const context = useContext(quizContext);
  const { setNext, setScore, setAnswerList } = context;
  const { total_que, correct_que, wrong_que } = props;
  const percentage = (correct_que / total_que) * 100;
  const Attempted = ((correct_que + wrong_que) / total_que) * 100;

  const handleGoHome = () => {
    window.location.reload();
  };

  const handlePlayAgain = () => {
    setNext(0);
    setScore({ rightAnswers: 0, wrongAnswers: 0 });
    setAnswerList([]);
  };

  const handleShare = () => {
    const quizUrl = 'https://your-quiz-url.com'; // Replace with your actual quiz URL

    if (navigator.share) {
      navigator
        .share({
          title: 'Quiz Score',
          text: `I scored ${percentage.toFixed(2)}% in the quiz! Try it out: ${quizUrl}`,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      alert('Web Share API not supported in your browser. Share this link: ' + quizUrl);
    }
  };

  return (
    <>
      <div className="main">
        <div className="score">
          Your Score <br />
          <span>{percentage.toFixed(2)} <small>%</small></span>
        </div>
        <div className="point-table">
          <div className="semi-table">
            <div style={{ backgroundColor: '#A45EDA' }} className="circle"></div>
            <div className='mx-2'>
              <div className="point-info">
                Attempted
              </div>
              <div style={{ color: '#fff', width: "5.8rem", background: "#212832", padding: "0.5rem", borderRadius: "0.5rem" }} className="point">{Attempted.toFixed(2)}%</div>
            </div>
          </div>
          <div className="semi-table">
            <div style={{ backgroundColor: '#A45EDA' }} className="circle"></div>
            <div className='mx-2'>
              <div className="point-info">
                Total Questions
              </div>
              <div style={{ color: '#fff', width: "5.8rem", background: "#212832", padding: "0.5rem", borderRadius: "0.5rem" }} className="point">{total_que}</div>
            </div>
          </div>
          <div className="semi-table">
            <div style={{ backgroundColor: 'rgb(6 143 86)' }} className="circle"></div>
            <div className='mx-2'>
              <div className="point-info">
                Correct
              </div>
              <div style={{ color: '#fff', background: "#212832", padding: "0.5rem", width: "5.8rem", borderRadius: "0.5rem" }} className="point">{correct_que}</div>
            </div>
          </div>
          <div className="semi-table">
            <div style={{ backgroundColor: 'rgb(223 75 75)' }} className="circle"></div>
            <div className='mx-2'>
              <div className="point-info">
                Wrong
              </div>
              <div style={{ color: '#fff', width: "5.8rem", background: "#212832", padding: "0.5rem", borderRadius: "0.5rem" }} className="point">{wrong_que}</div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="text-center" onClick={handleGoHome}>
            <div style={{ backgroundColor: '#BE709F' }} className="home-btn">
              <AiOutlineHome />
            </div>
            <div className='footer-text'>Home</div>
          </div>
          <div className="text-center" onClick={handleShare}>
            <div style={{ backgroundColor: '#755ED3' }} className="home-btn">
              <BsShare />
            </div>
            <div className='footer-text'>Share Score</div>
          </div>
          <div className="text-center">
            <ReachLink to='/review'>
              <div style={{ backgroundColor: '#BF8D6F' }} className="home-btn">
                <AiOutlineEye />
              </div>
            </ReachLink>
            <div className='footer-text'>
              Review Answer
            </div>
          </div>
          <div className="text-center" onClick={handlePlayAgain}>
            <div style={{ backgroundColor: '#5492B3' }} className="home-btn">
              <BiReset />
            </div>
            <div className='footer-text'>Play Again</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scoreboard;
