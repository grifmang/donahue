import { useState } from 'react'
import emailjs from 'emailjs-com'
import ReCAPTCHA from 'react-google-recaptcha'
require('dotenv').config()

const initialState = {
  name: '',
  email: '',
  message: '',
  isVerified: false
}
export const Contact = (props) => {
  const [{ name, email, message, isVerified}, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleToken = (token) => {
    setState((prevState) => ({ ...prevState, token: token, isVerified: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    console.log(process.env.REACT_APP_EMAIL_PUBLIC_KEY)
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SITE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text)
          clearState()
        },
        (error) => {
          console.log(error.text)
        }
      )
    setState({
      name: '',
      email: '',
      message: ''
    })
  }
  return (
    <>
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Want a quote?</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible to schedule your quote.
                </p>
              </div>
              <form name='sentMessage' onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleToken}
                />
                <div id='success'></div>
                <button type='submit' disabled={!isVerified} className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p style={{whiteSpace: "pre-line"}}>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <div>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {/* {props.data ? props.data.phone : 'loading'} */}
                  <p>413-579-7130</p>
                <div style={{display: 'flex'}}>
                  <div><a className="btn btn-success" href="sms:+14135797130" role="button">Text Us!</a>{' '}</div>
                  <div><a className="btn btn-success" href="tel:+14135797130" role="button">Call Us!</a></div>
                </div>
              </div>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i>{' '}
                  <a style={{color:'white'}} href="mailto:donahueelectric.inc@gmail.com">Email</a>
                </span>
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : '/'}>
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2022 Advanced IT Solutions. Design by{' '}
            <a href='https://AdvancedItSolutions.net' rel='nofollow'>
              Advanced IT Solutions
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
