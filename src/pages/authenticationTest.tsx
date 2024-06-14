import React from 'react'
import {withAuth} from '../hoc'

const AuthenticationTest = () => {
  return (
    <div>
      <h4>This page can be accessed by any logged in user</h4>
    </div>
  )
}

export default withAuth(AuthenticationTest)
