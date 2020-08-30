import { useState, useEffect } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const signUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div
        id='div-register'
        className='col-xs-8 col-sm-8 col-md-6 col-md-offset-2 col-lg-4'
      >
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <div className='form-group'>
            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          {errors}
          <button className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default signUp
