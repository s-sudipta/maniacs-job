import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {db} from "../../../firebase";
import { getDoc, doc ,updateDoc, serverTimestamp } from 'firebase/firestore';
import MyMap from "../../../component/tomtommap/mymap";
import customAlert from "../../../component/customalert";
const Bookdetails = () => {
    const router = useRouter();
    const [bd,setbdata] = useState([]);
    const [billAmount,setBillAmount] = useState(0);
    const [otp,setOtp] = useState("");
    const [isData,setIsData] = useState(false);
    const {book} = router.query;
    useEffect(() => {
        const fetchData = async () => {
          getDoc(doc(db, "booking", book)).then((docSnap) => {
              if (docSnap.exists()) {
                const docObj = docSnap.data();
                setbdata({ ...docObj });
                setIsData(true);                
              }
          })
        };
        if (book) {
          fetchData()
        }
      }, [book]);
      const handleBillAmount = async(e) =>{
        e.preventDefault();
        try{
        await updateDoc(doc(db, "booking", book ), {status:"previous",statusDescription:"Completed", bill:billAmount, endTime:serverTimestamp()}).then(function(){
          customAlert("Generating Bill","success");
        })
      }catch(e){
          console.log(e);
          customAlert("error","error");
        }
      }
      const handleConfirmOtp = async(e) =>{
        e.preventDefault();
        try{
          if(otp == bd?.OTP){
            await updateDoc(doc(db, "booking", book ), {statusDescription:"Working", startTime:serverTimestamp()}).then(function(){
              customAlert("Started Working","success");
            })
          }else{
            customAlert("Invalid OTP","error");
          }
          }catch(e){
              console.log(e);
              customAlert("error","error");
            }
          
      }
    return ( <> <style jsx>{`
    .mapdiv{
      width:360px;
      height:360px;
    }
    .btn{
      color:white;

    }
    `}</style>{isData &&
    <div className="container mt-5">
    
        <div className="col-xl-12">
            <div className="row">
            <h1 className="text-center mt-5" id="sub-heading">Booking Details</h1>
            <div className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 mt-5">
                    <div className="text-center">
                        <Image src={bd?.cProfilePic} style={{"width":"60%", "height" :"auto"}}/> 
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4  mt-5">
                    <b>Name: </b><p>{bd.cName}</p><hr/>
                    <b>Address: </b><p>{bd.cAddress}</p><hr/>
                    <b>Phone: </b><p>{bd.cPhone}</p><hr/>
                    <b>Email: </b><p>{bd.cEmail}</p><hr/>
                </div>
                
                <div className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4 mt-5">
                <b>Location:</b>
                <div className="mapdiv"><MyMap latitude={bd.clocationlat} longitude={bd.clocationlon}/></div>
                </div>
            </div>
            <div className="row my-5">
              <div className="container text-center content-align-center m-auto">
                  <button className="btn shadow m-2 bg-danger" onClick={()=> window.open(`https://www.google.com/maps/dir/?api=1&destination=${bd.clocationlat},${bd.clocationlon}&dirflg=d`, '_blank')}>Open in Google map</button>
                  <button className="btn shadow m-2 bg-primary" onClick={()=>window.location.href = `tel:${bd.cPhone}`}>Call the Customer</button>
                  <button className="btn shadow m-2 bg-success" onClick={()=>window.location.href = `mailto:${bd.cEmail}`}>Email the Customer</button>
              </div>
            </div>
            <div className="row m-5">
                <div className="col-12 col-sm-6 col-md-12 col-xl-4 col-xl-4">
                  {bd.statusDescription == "Confirmed" ? 
                  <>
                  <label><b>Enter OTP:</b></label><br/>
                  <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)}></input><br/>
                  <button className="btn my-2 bg-warning" onClick={(e)=>handleConfirmOtp(e)}>Start</button>
                  </>:<>
                  <label htmlFor="bill"><b>Total Bill Amount</b></label><br/>
                  {bd.bill===null ? <>
                  <input type="text" value={billAmount} onChange={(e)=>setBillAmount(e.target.value)}/><br/>
                  <button className="btn my-2 bg-warning" onClick={(e)=>handleBillAmount(e)}>Go {' >'}</button></>:
                  <>
                  <p>Total Amount : ₹ {bd.bill}</p>
                  </>
                  }</>}

                </div>
            </div>
        </div>
    </div>}
    </> );
}
export default Bookdetails;