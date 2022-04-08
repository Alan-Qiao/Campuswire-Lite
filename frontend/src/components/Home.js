import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import AddAnswer from './AddAnswer'
import AddQuestionModal from './AddQuestionModal'

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [questions, setQuestions] = useState([{ questionText: 'Add a Question!', author: '', answer: '' }])
  const [active, setActive] = useState(0)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const checkAuthentication = async () => {
    try {
      const resp = await axios.get('/authenticated')
      setAuthenticated(resp.data)
      setUsername(resp.data)
    } catch (e) {
      alert('Error, authentification failed.')
    }
  }

  const handleLogOut = async () => {
    try {
      await axios.post('/account/logout')
      await checkAuthentication()
    } catch (e) {
      alert('Error, failed to logout.')
    }
  }

  const handleLogin = async () => {
    if (!authenticated) {
      navigate('/login')
    }
  }

  const fetchQuestions = async () => {
    try {
      const resp = await axios.get('/api/questions')
      setQuestions(resp.data)
    } catch (e) {
      console.log(e)
      alert('An error occured while fetching questions')
    }
  }

  useEffect(() => {
    checkAuthentication()
    fetchQuestions()
    const interval = setInterval(async () => {
      await fetchQuestions()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="mt-2 mb-2 d-flex">
        <div className="flex-grow-1">
          <h1>Campuswire Lite</h1>
        </div>
        <div className="d-flex flex-row">
          { authenticated && (
          <p className="fs-5 my-auto">
            Hi
            {' '}
            {username}
          </p>
          )}
          { authenticated && <button className="btn" type="button" onClick={() => handleLogOut()}>Log out</button>}
        </div>
      </div>
      <div className="row border-top pt-4">
        <div className="col col-4 border-end">
          <div>
            <div className="row mb-2 ms-1 me-1">
              <button className="btn btn-success p-3" type="button" data-bs-toggle={authenticated && 'modal'} data-bs-target="#newQuestion" onClick={() => handleLogin()}>{authenticated ? 'Add New Question' : 'Log in to submit a question'}</button>
            </div>
            <div className="row ms-1">
              <div className="list-group">
                {questions.map((value, index) => <button key={value.questionText} type="button" className={`list-group-item list-group-item-action ${active === index && 'active'}`} onClick={() => setActive(index)}>{value.questionText}</button>)}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row mx-auto my-auto">
            <div className="card card-body">
              <h2 className="card-title pb-4">{questions[active].questionText}</h2>
              <h5 className="card-subtitle">Author:</h5>
              <p className="card-text">{questions[active].author}</p>
              <h5 className="card-subtitle">Answer:</h5>
              <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>{questions[active].answer}</p>
            </div>
          </div>
          <div className="row mt-4 mb-4" />
          <div className="row my-auto mx-auto">
            { authenticated && <AddAnswer question={questions[active]} fetchQuestions={fetchQuestions} />}
          </div>
        </div>
      </div>
      <AddQuestionModal fetchQuestions={fetchQuestions} />
    </>
  )
}

export default Home
