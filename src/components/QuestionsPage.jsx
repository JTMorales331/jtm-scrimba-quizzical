import { useState, useEffect } from 'react'
import axios from 'axios'

export default function QuestionsPage( { quizzicalArray }) {
  console.log(quizzicalArray[1].question)
  return(
    <div>
      {quizzicalArray.map((quiz, index) => {
        return (
          <div key={index}>
            <h1>{quiz.question}</h1>
          </div>
        )
      })}
    </div>
  )
}