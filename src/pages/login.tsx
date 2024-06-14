import React, {useState} from 'react'
import {
  ApiResponse,
  LoginUserModel,
  UserModel,
} from '../interfaces'
import {inputHelper} from '../helper'
import {useLoginUserMutation} from '../api/authApi'
import jwt_decode from 'jwt-decode'
import {useAppDispatch} from '../storage/redux/hooks'
import {setLoggedInUser} from '../storage/redux/userAuthSlice'
import {useNavigate} from 'react-router-dom'
import {MainLoader} from '../components/page/common'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState<LoginUserModel>({
    userName: '',
    password: '',
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempUserInput = inputHelper(e, userInput)
    setUserInput(tempUserInput)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const response: ApiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    })

    if (response.data) {
      console.log(response.data)
      const {token} = response.data.result
      const {fullName, id, email, role}: UserModel = jwt_decode(token)
      localStorage.setItem('token', token)
      dispatch(setLoggedInUser({fullName, id, email, role}))
      navigate('/')
    } else if (response.error) {
      console.log(response.error.data.errorMessages[0])
      setError(response.error.data.errorMessages[0])
    }

    setLoading(false)
  }

  return (
    <div className={'container text-center'}>
      {loading && <MainLoader />}
      <form method={'post'} onSubmit={handleSubmit}>
        <h1 className={'mt-5'}>Login</h1>
        <div className={'mt-5'}>
          <div className={'col-sm-6 offset-sm-3 col-xs-12 mt-4'}>
            <input
              type={'text'}
              className={'form-control'}
              placeholder={'Enter Username'}
              value={userInput.userName}
              name={'userName'}
              onChange={handleUserInput}
              required
            />
          </div>

          <div className={'col-sm-6 offset-sm-3 col-xs-12 mt-4'}>
            <input
              type={'password'}
              className={'form-control'}
              placeholder={'Enter Password'}
              value={userInput.password}
              name={'password'}
              onChange={handleUserInput}
              required
            />
          </div>
        </div>

        <div className={'mt-2'}>
          {error && <p className={'text-danger'}>{error}</p>}
          <button
            type={'submit'}
            className={'btn btn-success'}
            style={{width: '200px'}}
          >
            Login
          </button>
        </div>
      </form>
    </div>)
}

export default Login
