export default function StartingPage({ quizStart }) {
  return (
    <div className="starting-page">
        
        <h1>Quizzical</h1>
        <h3>Some description if needed</h3>
        <button className="btn-primary" onClick={quizStart}>Start Quiz</button>
      </div>
  )
}