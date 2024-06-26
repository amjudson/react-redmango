import React, {useState} from 'react'
import {Roles} from '../utility/sd'
import {
  ApiResponse,
  RegisterUserModel,
} from '../interfaces'
import {inputHelper, toastNotify} from '../helper'
import {useRegisterUserMutation} from '../api/authApi'
import {useNavigate} from 'react-router-dom'
import {MainLoader} from '../components/page/common'

const Register = () => {
  const navigate = useNavigate()
  const [registerUser] = useRegisterUserMutation()
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState<RegisterUserModel>({
    userName: '',
    name: '',
    password: '',
    role: '',
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempUserInput = inputHelper(e, userInput)
    setUserInput(tempUserInput)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const response: ApiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
      role: userInput.role,
    })

    if (response.data) {
      toastNotify('Registration successfully! Please login to continue')
      navigate('/login')
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], 'error')
    }

    setLoading(false)
  }

  return (
    <div className={'container text-center'}>
      {loading && <MainLoader />}
      <form method={'post'} onSubmit={handleSubmit}>
        <h1 className={'mt-5'}>Register</h1>
        <div className={'mt-5'}>
          <div className={'col-sm-6 offset-sm-3 col-xs-12 mt-4'}>
            <input
              type={'text'}
              className={'form-control'}
              placeholder={'Enter Email'}
              value={userInput.userName}
              name={'userName'}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className={'col-sm-6 offset-sm-3 col-xs-12 mt-4'}>
            <input
              type={'text'}
              className={'form-control'}
              placeholder={'Enter Name'}
              value={userInput.name}
              name={'name'}
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
          <div className={'col-sm-6 offset-sm-3 col-xs-12 mt-4'}>
            <select
              className={'form-control form-select'}
              value={userInput.role}
              name={'role'}
              onChange={handleUserInput}
              required
            >
              <option value=''>--Select Role--</option>
              <option value={`${Roles.CUSTOMER}`}>Customer</option>
              <option value={`${Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className={'mt-5'}>
          <button
            type={'submit'}
            className={'btn btn-success'}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
    </div>)
}

export default Register
