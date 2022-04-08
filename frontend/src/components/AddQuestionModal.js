import React, { useState } from 'react'
import axios from 'axios'
import { handle } from 'express/lib/application'

const AddQuestionModal = ({ fetchQuestions }) => {
  const [question, setQuestion] = useState('')

  const handleSubmit = async () => {
    try {
      await axios.post('/api/questions/add', { questionText: question })
      fetchQuestions()
    } catch (e) {
      alert('An error occured. Unable to add question.')
    }
  }

  return (
    <div
      className="modal fade"
      id="newQuestion"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Add Question:</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              data-bs-target="#newQuestion"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <input className="form-control" type="text" onChange={e => setQuestion(e.target.value)} value={question} />
            <button
              className="btn btn-primary mt-2"
              type="button"
              data-bs-dismiss="modal"
              data-bs-target="#newQuestion"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestionModal
