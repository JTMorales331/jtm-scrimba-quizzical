import { useState, useEffect } from 'react'
import StartingPage from './components/StartingPage'
import QuizPage from './components/QuizPage'
import LoadingPage from './components/LoadingPage'
import axios from 'axios'


function App() {

  const [isStarting, setIsStarting] = useState(false)

  const [quizFetched, setQuizFetched] = useState(false)

  const [quizzicalArray, setQuizzicalArray] = useState([])

  function quizStart() {
    console.log("quiz starting")
    setIsStarting(true)
  }

  useEffect(() => {
      const getTrivia = async () =>  {
        try {
          console.log("getting quiz!!")
          // 5 questions, category 31 is anime and manga
          const res = await axios.get(`https://opentdb.com/api.php?amount=5&category=31`)
          const data = res.data
          // return data.results
          setQuizzicalArray(data.results)
          
        } catch (err) {
          // typical error handling data general
          console.error('Error fetching data: ', err)

          //Handle 429 error just to check
          if(err.response && err.response.status === 429) {
            console.log("Too many API Quizzical requests.")
          }
          return []
        }
      }

      const fetchData = async() => {
        if(isStarting & !quizFetched) {
          getTrivia()
          // setQuizFetched to true 
          setQuizFetched(true)
        }
      }

      fetchData()

  }, [isStarting])

  return (
    <>
      {!isStarting && !quizFetched ? 
      ( 
        <StartingPage quizStart={quizStart}/>
      ) : quizzicalArray.length > 0 ? 
      (
        <QuizPage 
          quizzicalArray={quizzicalArray}
        />
      ) : 
      ( 
        <LoadingPage 
        />
      )}
      
    </>
  )
}

export default App
