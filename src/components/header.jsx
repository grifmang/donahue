import logo from '../images/logo2.png';

export const Header = (props) => {
  return (
    <header id='header'>
      <div id='header-intro' className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {/* {props.data ? props.data.title : 'Loading'} */}
                  <img style={{marginBottom:"20px"}} src={logo} alt="logo" />
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
