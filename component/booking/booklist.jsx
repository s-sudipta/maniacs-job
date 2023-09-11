import Avatar from "@mui/material/Avatar";
import Statusicon from "./statusicon.jsx";
import { getFirestore, collection, getDocs, where, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.js'
import customAlert from "../customalert"
import { useState,useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router.js";
const Booklist =() =>{
    const [bookings, setBookings] = useState([]);
    const [showep,setShowep] = useState(false);
    const [filteredBookings,setFilteredBookings] = useState([]);
    const cookies = parseCookies();
    const uId = cookies.id;
    const router = useRouter()
    const getBookings = async () => {
        const db = getFirestore();
        const bookingsRef = collection(db, 'booking')
    
        const q = query(bookingsRef, where('wId', '==', uId), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const bookings = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        return bookings;
      }
      function handleRefresh(e){
        e.preventDefault();
        getBookings().then((b) => {setBookings(b);setFilteredBookings(b);customAlert("Data Refreshed")});
      }
useEffect(() => {
  getBookings().then((b) => {setBookings(b);setFilteredBookings(b)});
}, []);
function handleClickForCategory(status) {
    let switcher = document.getElementById('category' + status.charAt(0).toUpperCase() + status.slice(1));
    let switchoff = document.getElementsByClassName('active');

    if (!switcher.classList.contains('active')) {
        Array.from(switchoff).forEach(element => {
            element.classList.toggle('active');
        });
        switcher.classList.toggle('active');
    }
    if(status === 'all'){
        setFilteredBookings(bookings);
    }
    else{
        const updatingBookings = bookings.filter(booking => booking.status === status);
        setFilteredBookings(updatingBookings);
    }
}
async function handleConfirm(e,bid){
    e.preventDefault();
    try{
        //console.log(bid)
        let otpvalue = Math.floor(1000 + Math.random() * 9000);
        console.log(otpvalue);
        await updateDoc(doc(db, "booking", bid ), {OTP:otpvalue, status:"ongoing",statusDescription:"Confirmed"}).then(function(){
        customAlert("Confirmed booking","success");
        setShowep(true);
        handleRefresh(e);
    })
}catch(e){
    console.log(e);
    customAlert("error","error");
}
}
async function handleCancel(e,bid){
    e.preventDefault();
    try{
        console.log(bid)
        await updateDoc(doc(db, "booking", bid ), {status:"cancelled",statusDescription:"Booking Cancelled"}).then(function(){
        customAlert("Cancelled booking");
        setShowep(true);
        handleRefresh(e);
    })
}catch(e){
    console.log(e);
    customAlert("error","error");
}
}
function handleShowDetails(e,bid){
    e.preventDefault();
    try{
        router.push('/bookings/'+bid);
    }catch(e){
        customAlert("Can't open :"+e);
    }
}
    return(<>
    <style jsx>{`
    a{
        color: grey;
    }
    a:hover, a:active,.active{
        color: var(--text-color);
        font-weight:bold;
    }
    .backgd{
        background-color: var(--back-gd-color); 
    }
    .theme-color{
        background-color: var(--second-bg-color); 
        color: var(--text-color);
    }
    #status{
        position:absolute;
        top:0;
        right:0;
        width:auto;
        padding-right: 2vw;
    }
    .active{
        color: black;
    }
    .inactive{
        color: grey;
    }
    .refreshbtn {
        background-color:transparent;
        outline:none;
        border:none;
        padding:0;
        font-size:35px;
        color: var(--main-theme-color);
    }
    .refreshbtn span{
        font-size:16px;
        color: var(--text-color);
        opacity:0;
    }
    .refreshbtn:hover span{
        opacity:1;
    }
    .refreshdiv{
        text-align: right;
    }
    #eachItem {
        opacity: 1;
        transform: translateY(0);
        animation: slideIn 0.5s ease-in-out;
      }
      .btn{
        width:120px;
        color:white;
        margin-top:20px;
      }
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
    <div className="container text-center m-top">
      <h2 id="sub-heading">Your Booking List</h2>
    </div>
    <div className="container">
        <div className="row">
        <div className="mx-auto mb-3 col-12 col-sm-10 col-md-3 col-xl-3 col-lg-3">
            <div className="card">
                <div className="card-body theme-color">
                    <div className="row">
                        <a className="active" id="categoryAll" 
                        onClick={() => handleClickForCategory('all')}>All</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryOngoing" 
                        onClick={() => handleClickForCategory('ongoing')}>Ongoing</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryUpcoming" 
                        onClick={() => handleClickForCategory('upcoming')}>Upcoming</a>                         
                    </div>
                    <div className="row">
                        <a className="" id="categoryPrevious" 
                        onClick={() => handleClickForCategory('previous')}>Previous</a>
                    </div>
                    <div className="row">
                        <a className="" id="categoryCancelled" 
                        onClick={() => handleClickForCategory('cancelled')}>Cancelled</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="mx-auto mb-3 col-12 col-sm-10 col-md-8 col-xl-8 col backgd">
        <div className="refreshdiv"><button onClick={(e)=>handleRefresh(e)} className="refreshbtn"><span>Click to Refresh</span><i className="bi bi-arrow-clockwise"></i></button></div>
        {filteredBookings.map(u=>       
            <div id="eachItem" key={u.id} className="mb-3 card">
                <div className="card-body row theme-color"> 
                    
                    <div className="col-3 col-md-2">
                    <div className="image-container">
                        <Avatar src={u?.cProfilePic} sx={{ width: 56, height: 56 }} style={{"backgroundColor":"var(--light-type-color)"}}/>
                    </div>
                    </div>
                    
                    <div className="col-9 col-md-10 row">
                        <div id="status" className="status">
                            <Statusicon status={u.status}/>&nbsp;Status
                        </div>
                        <div id="typename" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Address:</b> {u.cAddress}
                        </div>
                        <div id="fullname" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Date:</b> {u.timestamp.toDate().toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            })}
                        </div>
                        <div id="statusupdate" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>{u.statusDescription}</b>
                        </div>
                        <div id="typename" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Name:</b> {u.cName}
                        </div>
                        <div id="fullname" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Time:</b> {u.timestamp.toDate().toLocaleTimeString('en-GB', {
                             hour: 'numeric',
                             minute: 'numeric',
                             hour12: true,
                            })}
                        </div>
                        <div id="billamount" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Bill:</b> Rs {u.bill==null?"--.--":u.bill}
                        </div>
                        
                        {(u.status!=="upcoming" && u.status!=="cancelled" )?<>
                        <div id="Phone" className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 ">
                            <b>Phone:</b> {u.cPhone}
                        </div>
                        <div id="Email" className="col-12 col-sm-8 col-md-12 col-xl-6">
                            <b>Email:</b> {u.cEmail}
                        </div></>:<></>}
                        {u.status==="upcoming" && <>
                        <button className="bg-primary btn" onClick={(e)=>handleConfirm(e,u.id)}>Confirm</button>
                        <button className="bg-danger btn" onClick={(e)=>handleCancel(e,u.id)}>Cancel</button>
                        </>}
                        {u.status==="ongoing" && <>
                        <button className="bg-primary btn" onClick={(e)=>{if(u.status==="ongoing"){handleShowDetails(e,u.id)}}}>Show Details</button>
                        <button className="bg-danger btn" onClick={(e)=>handleCancel(e,u.id)}>Cancel</button>
                        </>}
                    </div>  
                </div>
            </div>
        )}
        </div>
        </div>
    </div>
    </>)
}
export default Booklist

