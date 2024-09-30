import { useState, useEffect } from 'react'
import StartingPage from './components/StartingPage'
import QuizPage from './components/QuizPage'
import LoadingPage from './components/LoadingPage'
import axios from 'axios'
import Overlays from './components/Overlays'
import '../src/overlays.css'

import { useSetAtom } from 'jotai'
import { uiAtom } from './State'


function App() {

  const setUi = useSetAtom(uiAtom)

  const [isStarting, setIsStarting] = useState(false)

  const [quizFetched, setQuizFetched] = useState(false)

  const [quizzicalArray, setQuizzicalArray] = useState([])

  function quizStart() {
    console.log("quiz starting")
    setIsStarting(true)
  }

  const getTrivia = async () =>  {
    try {
      console.log("getting quiz!!")
      // 5 questions, category 31 is anime and manga
      const res = await axios.get(`https://opentdb.com/api.php?amount=5&category=31`)
      const data = res.data
      // return data.results
      setQuizzicalArray(data.results)
      setQuizFetched(true)
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

  function newQuiz() {
    console.log("new quiz!!!")
    setQuizFetched(false)

    setUi(prev => ({
      ...prev,
      modal: false, // Opens modal by setting it to `false`
    }))

    document.getElementById('root').classList.remove('unclickable')
  }

  useEffect(() => {
    const fetchData = async() => {
      if(isStarting & !quizFetched) {
        await getTrivia()
        
      }
    }
    fetchData()
  }, [isStarting, quizFetched])

  function newQuizModal() {
    setUi(prev => ({
      ...prev,
      modal: true, // Opens modal by setting it to `true`
    }))

    // makes root div unclickable
    document.getElementById('root').classList.add('unclickable')
  }

  const closeModal = () => {
    setUi(prev => ({
      ...prev,
      modal: false, // Close modal by setting it to `false`
    }))

    // makes root div unclickable
    document.getElementById('root').classList.remove('unclickable')
  }

  console.log('App.jsx: ', quizzicalArray)

  return (
    <>
      <Overlays newQuiz={newQuiz} closeModal={closeModal}/>

      {!isStarting && !quizFetched ? 
      ( 
        <StartingPage quizStart={quizStart}/>
      ) : quizzicalArray.length > 0 ? 
      (
        <QuizPage 
          quizzicalArray={quizzicalArray}
          newQuizModal={newQuizModal}
        />
      ) : 
      ( 
        <LoadingPage />
      )}
      
    </>
  )
}

export default App
