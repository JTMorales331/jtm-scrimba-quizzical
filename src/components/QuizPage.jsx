import { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import '../quiz.css'

export default function QuestionsPage( { quizzicalArray }) {

  // tracking number of correct answers
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const [showAnswers, setShowAnswers] = useState(false)

  const [shuffledChoicesArray, setShuffledChoicesArray] = useState([])

  function checkAnswers() {
    setShowAnswers(() => true)
  }

  // to shuffle an array and its choices. Fisher-Yates Shuffle Algorithm
  function shuffleArray(array) {
    const shuffled = array.slice()
    for (let i = shuffled.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
  }


  // this useEffect tries to only shuffle choicesArray if and only if quizzicalArray changes
  useEffect(() => {

    const shuffledChoices = quizzicalArray.map((quiz) => {
      const correctAnswer = decode(quiz.correct_answer)

      const incorrectAnswers = quiz.incorrect_answers.map((answer) => decode(answer))
      
      // stores correct answer and incorrect answers in choicesArray
      const choicesArray = shuffleArray([correctAnswer, ...incorrectAnswers])

      return choicesArray
    })

    setShuffledChoicesArray(shuffledChoices)

  }, [quizzicalArray]) // runs when quizzicalArray changes

  return(
    <div className="quiz-container">
      {quizzicalArray.map((quiz, quizIndex) => {

        // using html-entities, we decode quiz.question
        const decodedQuestion = decode(quiz.question)

        return (
          <>
            <div className="quiz-card" key={quizIndex}>
              <h3 className="quiz-question">{decodedQuestion}</h3>
              <form className="possible-choices">
                {shuffledChoicesArray[quizIndex]?.map((choice, choiceIndex) => {

                console.log('shuffling choices!')

                return (
                  <div className="radio-choice" key={choiceIndex}>
                    <input
                      type="radio"
                      name={`question-${quizIndex}`}
                      id={`answer-${quizIndex}-${choiceIndex}`}
                      value={choice}
                    />
                    <label htmlFor={`answer-${quizIndex}-${choiceIndex}`}>
                      {choice}
                    </label>
                  </div>
                )
              })}

              </form>
            </div>
          </>
        )
      })}
      <div className="checking-container">
        {showAnswers ? ( <h3>Your correct Answers: {correctAnswers}/5</h3> ) : ( " " )}
        <button
          alt="button to check correct answers"
          className="btn-primary" 
          onClick={checkAnswers}
        >
          Check Answers
        </button>
      </div>
    </div>
  )
}