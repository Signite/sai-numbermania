import { useCallback, useEffect, useState } from "react";

import './playForm.css';

/* eslint-disable react/prop-types */
const PlayForm = ({ back, options }) => {

  const [secodns, setSeconds] = useState(0);
  const [score, setScore] = useState(0);
  const [setup] = useState({ ...options });
  const [level, setLevel] = useState({ number1: '0', operation: '+', number2: '0' });
  const [answer, setAnswer] = useState('');
  const [answerCollor, setAnswerCollor] = useState('');
  const [processed, setProcessed] = useState(false);

  const keyLisnter = useCallback((e) => {
    // console.log(e);
    if (processed) return;
    if (Number(e.key) == e.key) {
      // if (answer.length === 0 && e.key == '0') return;
      setAnswer((prev) => prev + e.key);
    } else if (e.key === 'Backspace') {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (e.key === 'Enter') {
      checkLevel();
    }
  });

  const checkLevel = () => {
    setProcessed(true);
    let result = 'bad';
    if (answer == level.correctAnswer) {
      let scores = 20 - Math.floor((Date.now() - level.startTime) / 1000);
      if (scores < 0) scores = 0;
      setScore(prev => prev + scores);
      result = 'good';
    }
    setAnswerCollor(result);
    setTimeout(() => {
      setAnswerCollor('');
      if (result === 'good') createLevel()
      else continuteLevel();
    }, 1500);

  }

  const continuteLevel = () => {
    setProcessed(false);
    setAnswer('');
  }

  const createLevel = () => {
    setProcessed(false);
    setAnswer('');
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * (0 + setup.enablePlus + setup.enableMinus))];
    const firstNumber = Math.floor(Math.random() * (setup.maxNumber + 1))
    let secondNumber = '+';
    let correctAnswer = '';
    if (operator === '+') {
      secondNumber = Math.floor(Math.random() * (setup.maxNumber + 1 - firstNumber));
      correctAnswer = firstNumber + secondNumber;
    } else if (operator === '-') {
      secondNumber = Math.floor(Math.random() * (firstNumber + 1));
      correctAnswer = firstNumber - secondNumber;
    }

    // console.log(firstNumber);
    setLevel({ number1: firstNumber, operation: operator, number2: secondNumber, correctAnswer, startTime: Date.now() })
    // console.log(0 + setup.enablePlus + setup.enableMinus);
  }

  useEffect(() => {
    createLevel();
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', keyLisnter)
    return () => {
      window.removeEventListener('keydown', keyLisnter);
    }
  }, [answer])

  return (
    <div className="col-elements">
      <button onClick={back}>В меню</button>
      <div className="row-elements">
        <h4>Время: {secodns} секунд</h4>
        <h4>Счёт: {score}</h4>
      </div>
      <div className="example-block">
        <h2>{level.operation}</h2>
        <h2>{level.number1}</h2>
        <h2>{level.number2}</h2>
      </div>
      <input className={`answer-input ${answerCollor}`} type="number" value={answer} readOnly></input>
      <div className="number-buttons" >
        <button onClick={() => keyLisnter({ key: 7 })}>7</button>
        <button onClick={() => keyLisnter({ key: 8 })}>8</button>
        <button onClick={() => keyLisnter({ key: 9 })}>9</button>
        <button onClick={() => keyLisnter({ key: 4 })}>4</button>
        <button onClick={() => keyLisnter({ key: 5 })}>5</button>
        <button onClick={() => keyLisnter({ key: 6 })}>6</button>
        <button onClick={() => keyLisnter({ key: 1 })}>1</button>
        <button onClick={() => keyLisnter({ key: 2 })}>2</button>
        <button onClick={() => keyLisnter({ key: 3 })}>3</button>
        <button onClick={() => keyLisnter({ key: 0 })}>0</button>
        <button className="enter-button" onClick={() => keyLisnter({ key: 'Enter' })}>Ввод</button>
      </div>

    </div>
  );
};

export default PlayForm;
