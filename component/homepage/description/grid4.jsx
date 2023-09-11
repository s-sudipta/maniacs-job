const Grid4 = () => {
    return (<>
    <style jsx>{`
    .outermain{
        width:90vw;
        margin: 0 auto;
    }
    .grid{
        padding: calc(2vh + 2vw); 
    }
    *{
      color:var(--text-color);
    }
    .feature-icon{
        background-color: var(--main-theme-color);
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 .5rem 0.5rem rgba(0,0,0,.2) !important;
        left:50%;
        transform: translate(-50%,0);
      }
      .feature-icon i{
        font-size:36px;
        color: var(--light-type-color);
      }
    `}</style>
    <div className="outermain row">
    <div className="col-6 col-sm-6 col-md-3 col-xl-3 d-flex justify-content-center mb-5 grid">
        <div className="text-center">
        <div className="feature-icon mb-3" id="feature-icon">
            <i className="bi bi-send-exclamation"></i>
          </div>
          <h5>Apply Now</h5>
            <p>See something you want to be part of? Just select the job and apply in the above section.</p>
        </div>
    </div>
    <div className="col-6 col-sm-6 col-md-3 col-xl-3 d-flex justify-content-center mb-5 grid">
        <div className="text-center">
        <div className="feature-icon mb-3" id="feature-icon">
            <i className="bi bi bi-chat-dots"></i>
          </div>
          <h5>Discussion</h5>
            <p>If we like what we see in your profile, we'll reach out for a written/technical interview as a precursor to the next big thing.</p>
        </div>
    </div>
    <div className="col-6 col-sm-6 col-md-3 col-xl-3 d-flex justify-content-center mb-5 grid">
        <div className="text-center">
        <div className="feature-icon mb-3" id="feature-icon">
            <i className="bi bi-globe2"></i>
          </div>
            <h4>Personal Interview</h4>
            <p>Here's where we meet you and find out if you have what it takes to become part of our thriving team.</p>
        </div>
    </div>
    <div className="col-6 col-sm-6 col-md-3 col-xl-3 d-flex justify-content-center mb-5 grid">
        <div className="text-center">
        <div className="feature-icon mb-3" id="feature-icon">
            <i className="bi bi-journal-medical"></i>
          </div>
            <h4>Final Review</h4>
            <p>We'll be right back with you after a short discussion internally. Hold tight until then! </p>
        </div>
    </div>        
    </div>
    </>);
}
export default Grid4;