export default function Footer(){
  return(<>
  <style jsx>{`
        footer{
            background-color: var(--sub-theme-color);
      }
      p{
        color: var(--light-type-color);
      }
      a{
        color: var(--light-type-color);
      }
      a:hover{
        color: white;
        font-weight: bold;
      }
      `}</style>
    <footer className="container-fluid text-center text-lg-start text-white">
      <div className="pb-0">
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                2022 Copyright :&nbsp;
                <a className="text-white" href="">Maniacs.com</a>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-facebook m-3"></i></a>
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-twitter m-3"></i></a>
              <a className="btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-google m-3"></i></a>
              <a className=" btn-outline-light btn-floating m-1" role="button"><i
                  className="bi bi-instagram m-3"></i></a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  </>)
}