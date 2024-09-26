import { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import axios from 'axios'
import '../quiz.css'

export default function QuestionsPage( { quizzicalArray }) {

  // to shuffle an array and its choices. Fisher-Yates Shuffle Algorithm
  function shuffleArray(array) {
    const shuffled = array.slice()
    for (let i = shuffled.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
  }

  return(
    <div className="quiz-container">
      {quizzicalArray.map((quiz, index) => {

        // using html-entities, we decode quiz.question
        const decodedQuestion = decode(quiz.question)
        
        const correctAnswer = decode(quiz.correct_answer)

        const incorrectAnswers = quiz.incorrect_answers.map((answer) => {
          return decode(answer)
        })
        
        // stores correct answer and incorrect answers in choicesArray
        const choicesArray = [correctAnswer, ...incorrectAnswers]
        
        // console.log('answers array: ', choicesArray)
        let shuffledChoices = []

        // if choicesArray is more than just true or false, it shuffles array
        // if just true or false which is max two choices, then don't shuffle array
        choicesArray.length > 2 ? 
        (shuffledChoices = shuffleArray(choicesArray)) :
        (shuffledChoices = choicesArray)

        // stores the buttons in choices
        const choices = shuffledChoices.map((answer, index) => {
          return (
            <div className="radio-choice">
              <input
                key={index}
                type="radio"
                name="answer"
                id={answer}
                value={answer}
              />
              <label htmlFor={answer}>
                {answer}
              </label>
            </div>
          )
        })

        return (
          <div className="quiz-card">
            <h3 className="quiz-question">{decodedQuestion}</h3>
            <div className="possible-choices">{choices}</div>
          </div>
        )
      })}
    </div>
  )
}