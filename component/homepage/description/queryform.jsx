import { useState } from "react"
import Faq from "./faq"
const Queryform = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    
    function handleSubmit(event) {
      event.preventDefault()
      const formData = { email, message }
      console.log(formData);
    }
    
    return (
        <>
        <style jsx>{`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
  }
  *{
    color:var(--text-color);
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
  }

  input,
  textarea {
    padding: 10px;
    border-radius: 5px;
    border: 2px solid var(--sub-theme-color);
    outline:none;
    width: 100%;
    background-color:var(--second-bg-color);
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #0070f3;
    color: var(--text-color);
    cursor: pointer;
  }
  .queryform{
    border: 1px solid var(--main-theme-color);
  }
  @media screen and (max-width: 480px) {
    label {
      margin-bottom: 10px;
    }

    input,
    textarea {
      
      padding: 5px;
      font-size: 14px;
    }

    button {
      padding: 5px;
      font-size: 14px;
    }
  }

`}</style>
        <div className="row">
        <div id="queryform" className="col-12 col-md-6 col-xl-6 mb-5">
          <h3 className="text-center">Do you have any query?</h3>
          <h5 className="text-center">feel free to ask us, anytime</h5>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={event => setMessage(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      <Faq/>
      </div>
        </>
      
    )
}
export default Queryform;