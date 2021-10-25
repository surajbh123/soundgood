import React, { useEffect, useRef, useState } from 'react'


let index;

function TestArea() {
  let SpeechRecognition;
  let recognition;
  try {
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  }
  catch (e) {
    console.error(e);
  }

  useEffect(() => {
  }, [])

  const textAreaRef = useRef();

  const [noteContent, setNoteContent] = useState("");

  function startSpeechRecognition(){
    recognition.continuous = true;
    recognition.start();
  }
  function stopSpeechRecognition(){
    recognition.stop();

  }

  recognition.onresult = (e) => {
      console.log(e.resultIndex);
      index = e.resultIndex;
      console.log(e.results[index][0].transcript);
      const transcript = e.results[index][0].transcript
      setNoteContent((noteContent) => noteContent + ""+ transcript );
  }



  return (
    <>
      <div className="container" >
        <p className="fs-2 text-center">Sound Recognition</p>
        <div className="form-floating">
          <textarea ref={textAreaRef} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={noteContent} />
          <label htmlFor="floatingTextarea2">Comments</label>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
          <button className="btn btn-success me-md-2" type="button" onClick={startSpeechRecognition}>Start </button>
          <button className="btn btn-danger" onClick={stopSpeechRecognition} type="button">End</button>
          <button className="btn btn-info" type="button">Save</button>
        </div>
      </div>
    </>
  )
}

export default TestArea
