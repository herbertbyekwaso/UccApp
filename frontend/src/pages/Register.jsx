
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FormControl, Select, MenuItem } from "@material-ui/core";

const Register = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    password2: '',
    image: '',
    isAdmin: false,
  })
  const [selected, setSelected] = useState([0]);
  const options = [
    {
      id:"1",
      displayText: "Yes"
    },
    {
      id:"0",
      displayText: "No"
    }
  ]
  const handleListChange =(e) =>{
    console.warn("The selected value is: "+e.target.value);
    setSelected(e.target.value);
  }
  const { fullname, email, password, password2, image } = formData
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        fullname,
        email,
        password,
        image,
        isAdmin: selected,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className='heading'>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='fullname'
            name='fullname'
            value={fullname}
            placeholder='Enter your fullname'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='image'
            name='image'
            value={image}
            placeholder='Enter image Url'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
        <Select 
        displayEmpty
        value={selected} 
        onChange={handleListChange}>  
        <MenuItem value="" disabled>Is Admin</MenuItem>
        { options && options.map((option, index) => {
          return <MenuItem value={option.id}>{option.displayText}</MenuItem>;
        })}
      </Select>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>
  )
}

export default Register