import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.production.min'

const AddAnswer = ({ question, fetchQuestions }) => {
  const [ans, setAns] = useState('')

  const handleAdd = async () => {
    try {
      await axios.post('./api/questions/answer', { _id: question._id, answer: ans })
      fetchQuestions()
      setAns('')
    } catch (e) {
      alert('An error occured, could not update question answer.')
    }
  }

  return (
    <div className="form-group d-grid">
      <label className="form-label" htmlFor="newAns">Answer this question:</label>
      <textarea className="form-control" id="newAns" type="text" onChange={e => setAns(e.target.value)} value={ans} />
      <button className="btn btn-primary mt-3" type="button" onClick={() => handleAdd()}>Submit Answer</button>
    </div>
  )
}

export default AddAnswer
