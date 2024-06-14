import React from 'react'
import {withAdminAuth} from '../hoc'

const AuthenticationTestAdmin = () => {
  return (
    <div>
      <h4>This page can be accessed if the user role is ADMIN</h4>
    </div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin)
