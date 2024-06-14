const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem('token')
    console.log(accessToken)
    if (!accessToken) {
      window.location.replace('/login')
      return null
    }
    return <WrappedComponent {...props} />
  }
}

export default withAuth;
