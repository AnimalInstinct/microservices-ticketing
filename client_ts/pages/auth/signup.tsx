import { useState } from 'react'
import { useRequest } from '../../hooks'
import Router from 'next/router'

const SignUpForm = () => {
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
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label htmlFor=''>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          className='form-control'
        />
      </div>
      <button className='btn btn-primary'>Sign Up</button>
      {errors}
    </form>
  )
}

export default SignUpForm
