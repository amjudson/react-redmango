import React from 'react'
import {NavLink} from 'react-router-dom'
import {useAppSelector} from '../../storage/redux/hooks'

let logo = require('../../../src/assets/images/mango.png')

const Header = () => {
  const shoppingCartFromStore = useAppSelector((state) => state.shoppingCart ?? [])

  return (
    <div>
      <nav className={'navbar navbar-expand-lg bg-dark navbar-dark'}>
        <div className={'container-fluid'}>
          <NavLink className={'nav-link'} aria-current={'page'} to={'/'}>
            <img alt={'logo'} src={logo} style={{height: '40px'}} className={'m-1'}/>
          </NavLink>
          <button className={'navbar-toggler'} type={'button'} data-bs-toggle={'collapse'}
                  data-bs-target={'#navbarSupportedContent'}
                  aria-controls={'navbarSupportedContent'}
                  aria-expanded={'false'}
                  aria-label={'Toggle navigation'}>
            <span className={'navbar-toggler-icon'}></span>
          </button>
          <div className={'collapse navbar-collapse'} id={'navbarSupportedContent'}>
            <ul className={'navbar-nav me-auto mb-2 mb-lg-0 w-100'}>
              <li className={'nav-item'}>
                <NavLink className={'nav-link'} aria-current={'page'} to={'/'}>
                  Home
                </NavLink>
              </li>
              <li className={'nav-item'}>
                <NavLink className={'nav-link'} aria-current={'page'} to={'/shoppingCart'}>
                  <i className={'bi bi-cart4'}></i>
                  {shoppingCartFromStore.cartItems?.length ? (
                    <span className={'badge bg-success ms-1'}>{`${shoppingCartFromStore.cartItems.length}`}</span>
                  ) : null}
                </NavLink>
              </li>
              <li className={'nav-item dropdown'}>
                <a className={'nav-link dropdown-toggle'} href={'/'} role={'button'} data-bs-toggle={'dropdown'}
                   aria-expanded={'false'}>
                  Admin Panel
                </a>
                <ul className={'dropdown-menu'}>
                  <li><a className={'dropdown-item'} href={'/'}>Action</a></li>
                  <li><a className={'dropdown-item'} href={'/'}>Another action</a></li>
                  <li><a className={'dropdown-item'} href={'/'}>Something else here</a></li>
                </ul>
              </li>
              <div className={'d-flex'} style={{marginLeft: 'auto'}}>
                <li>
                  <button
                    className={'btn btn-success btn-outlined rounded-pill text-white mx-2 logout'}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <NavLink
                    className={'nav-link'}
                    to={'/register'}
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={'btn btn-success btn-outlined rounded-pill text-white mx-2 logout'}
                    to={'/login'}
                  >
                    Login
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
