import { useState } from 'react'


function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  function beginQuiz() {
    setStartQuiz(prevStartQuiz => !prevStartQuiz)
  }

  return (
    <>
      <div className="starting-page">
        
        <h1>Quizzical</h1>
        <h3>Some description if needed</h3>
        <button className="btn-primary" onClick={beginQuiz}>Start Quiz</button>
      </div>
    </>
  )
}

export default App
