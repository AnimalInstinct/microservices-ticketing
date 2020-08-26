import { useState } from 'react'
import { useRequest } from '../../hooks'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
  })

  const onSubmit = async (event) => {
    event.preventDefault()
    doRequest()
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
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
      <button className='btn btn-primary'>Sign In</button>
      {errors}
    </form>
  )
}

export default SignUpForm
