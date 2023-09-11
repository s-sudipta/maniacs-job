import customAlert from "../component/customalert";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore"; 
import { useState,useEffect,useRef } from "react";
import {db} from "../firebase.js"
import { useAuth } from '../context/AuthContext'
import 'firebase/firestore'

const Signup = function() {
  const [typeArray,setTypeArray] = useState([]);
  const [ratingArray,setRatingArray] = useState([]);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [star,setStar] = useState('');
  const [availability,setAvailability] = useState('Yes');

  const [passwordShown, setPasswordShown] = useState(false);
  const [fillup,setFillup] = useState(false);
  const [emailRef,setemailRef] = useState("")
  const [passwordRef,setpasswordRef] = useState("")
  const [repasswordRef,setrepasswordRef] = useState("")
  
  const router = useRouter()
  const { user, signup, dataset} = useAuth()
  
  
 
  const userIdRef = useRef()
  const userEmailRef = useRef()
  //used to show the password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //entry data to the database(firestore and authentication)
  const entryDataSet= async(e) => {
    e.preventDefault()
    try {
      const authRef = await signup(emailRef, passwordRef)
      userIdRef.current= authRef.user.uid
      customAlert("User Created","success");
      setFillup(true)
    }catch (err) {
      customAlert(err.message,"error")
    }
  }


  useEffect(()=>{
    const fetchdata = () =>{
      const typeList = require("../component/categoriesJson.js")
      const temptypeArray = typeList.map((item) => item.type);
      setTypeArray([...temptypeArray]);
      setRatingArray([1,1.5,2,2.5,3,3.5,4,4.5,5]);
    }
    fetchdata();
  },[])
  const handleOptionChange = (event) => {
    setProfession(event.target.value);
  };
  const handleOptionChangeForStar = (event) =>{
    setStar(event.target.value);
  }
  const handleAnswerChange = (event) => {
    setAvailability(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    try{
      if(userIdRef.current)
      {
      await setDoc(doc(db, "worker", userIdRef.current), {
        name,
        profession,
        email,
        availability,
        phone,
        type:"worker",
        email:emailRef,
        address1,
        address2,
        pincode,
        state,
        country,
        age,
        star
      });
      customAlert("Registered","success");
      await dataset(userIdRef.current);
    }
      customAlert("Worker added successfully");
        setName("");
        setProfession("");
        setEmail("");
        setAvailability("");
        setPhone("");
        setAddress1("");
        setAddress2("");
        setPincode("");
        setState("");
        setCountry("");
        setAge("");
        setStar("");
        router.push('setprofile')
    } catch (error) {
      customAlert(error.message,"error")
    }
  }
  
  return(
    <>
      <style jsx>{`  
      #signupForm{
        background-color: var(--second-bg-color);;
        height:auto;
        padding: 2.5%;
        margin: 100px 0px;
      }
        input[type=text], input[type=password],input[type=email]{
          outline: none;
          border-radius: 5px;
          border-color: var(--main-theme-color);
          background-color: var(--second-bg-color);
          border-width: 2px;
          padding: 10px 5px;
          color:var(--text-color);
          width:100%;
        }
        input[type=text]:focus, input[type=password]:focus,input[type=email]:focus{
          background-color: var(--back-gd-color);
          border-color: var(--main-theme-color);
        }
        input[type=checkbox]{
          width:15px;
          height: 15px;
        }
        label{
          color:var(--text-color);
        }
        label{
          font-size: 18px;
          margin: 5px;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bold;
        }
        .signupSubmit{
          padding: 10px 20px;
          position:relative;
          left:50%;
          transform: translate(-50%,0);
          border-radius: 5px;
          outline: none;
          border:0;
          background-color: var(--main-theme-color);
        }
        .signupSubmit:hover, .signupSubmit:active{
          background-color: var(--sub-theme-color);
        }
        .closeBox{
          color: black !important;
          position:absolute;
          left:100%;
          top:0;
          transform: translate(-150%,0);
        }
        .closeBox i{
          font-size:20px;
          color: var(--main-theme-color);
          font-weight:bold;
        }
    `}</style>
      
        <div className="d-flex justify-content-center">
        <div className="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-4" id="signupForm">
          <h1 className="text-center" id="sub-heading">Sign Up</h1>
         
          {!fillup ?
          <>
      <label>Email</label><br/>
        <input id="email" 
        type="email" 
        value={emailRef} 
        onChange={e=>setemailRef(e.target.value)}/><br/>
      <label>Set Password</label><br/>
            <input id="password" 
        type={passwordShown ? "text" : "password"} 
        value={passwordRef} 
        onChange={e=>setpasswordRef(e.target.value)}/><br/>
      <label>Confirm Password</label><br/>
      <input id="repassword" 
        type={passwordShown ? "text" : "password"} 
        value={repasswordRef} 
        onChange={e=>setrepasswordRef(e.target.value)}/><br/>
      <input 
        type="checkbox" 
        id="rememberMe" 
        value="remember" onClick={togglePassword}/>
        <label>&nbsp;Show Password</label><br/>
      <button type="submit" className="signupSubmit" id="signupSubmit" onClick={entryDataSet}>Signup</button><br/>
          </>
            :
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="profession">Profession:</label>
              <select className="form-control" id="profession" value={profession} onChange={handleOptionChange}>
                <option value="" disabled>Select an option</option>
                {typeArray.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="text" className="form-control" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="address1">Address Line 1:</label>
              <input type="text" className="form-control" id="address1" value={address1} onChange={(event) => setAddress1(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address Line 2:</label>
              <input type="text" className="form-control" id="address2" value={address2} onChange={(event) => setAddress2(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode:</label>
              <input type="text" className="form-control" id="pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" className="form-control" id="state" value={state} onChange={(event) => setState(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input type="text" className="form-control" id="country" value={country} onChange={(event) => setCountry(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input type="text" className="form-control" id="age" value={age} onChange={(event) => setAge(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="star">Rating:</label>
              <select className="form-control" id="rating" value={star} onChange={handleOptionChangeForStar}>
                <option value="" disabled>Select an option</option>
                {ratingArray.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} STAR
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 form-group">
          <label>Are you Available?</label>
          <div>
            <label className='m-2'>
              <input
                type="radio"
                value="Yes"
                checked={availability === 'Yes'}
                onChange={handleAnswerChange}
              />
              Yes
            </label>
            <label className='m-2'>
              <input
                type="radio"
                value="No"
                checked={availability === 'No'}
                onChange={handleAnswerChange}
              />
              No
            </label>
          </div>
        </div>
            <button type="submit" className="btn btn-primary">Add Worker</button>
          </form>
          }
        </div>
        </div>
      
    </>
  )
}
export default Signup