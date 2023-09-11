const Faq = () => {
    const faqList = require("./json/faq.js")
    const handleClick = (id) =>{
        const textId = document.getElementById(id);
    const arrtextid = [];
    faqList.filter(item => item.textid !== id).map(e=>{arrtextid.push(e.textid)});
    for(let i=0;i<arrtextid.length;i++){
        document.getElementById(arrtextid[i]).classList.remove("show");
    }
    console.log(arrtextid);
    textId.classList.toggle("show"); 

    }
    return (<>
    <style jsx>{`
    .container{
        max-width:700px;
        margin: 0 auto;
    }
    h5{
        font-weight:600;
    }
    i{
        position:absolute;
        right:0;
        font-size:25px;
        color:var(--main-theme-color);
    }
    p{
        text-align:center;
    }
    a,p{
        color:var(--text-color);
    }
    .display-text{
        max-height: 0;
        overflow: hidden;
    }
    ul,li{
        background-color:var(--bg-color) !important;
        color: var(--text-color) !important;
    }
    .display-text.show{
        max-height: 1000px; 
        opacity:1;
        animation: slide-down 1s ease-in-out;
      }
      @keyframes slide-down {
        from {
          max-height: 0;
          opacity:0;
        }
        to {
          max-height: 1000px; /* adjust as needed */
          opacity:1'
        }
      }
    `}</style>
    <div id="faqpanel" className="col-12 col-md-6 col-xl-6 mb-5">
    <h2 id="sub-heading">FAQ`s</h2>
    <div className="container">
    {faqList.map(e=>{return(
        <div key={e.key}>
        <ul className="list-group">
            <li onClick={()=>handleClick(e.textid)} className="list-group-item" id="question"><h5>{e.ques}<i className="bi bi-patch-plus-fill"></i></h5>
            <p id={e.textid} className="display-text">{e.text}</p>
            </li>
        </ul>
        </div>
    )})}
    </div>
    </div>
    </>);
}
export default Faq;