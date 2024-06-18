import React from 'react'
import {useAppDispatch} from '../../../storage/redux/hooks'
import {setSearchItem} from '../../../storage/redux/menuItemSlice'

const Banner = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value))
    setValue(e.target.value)
  }

  return (
    <div className={'custom-banner'}>
      <div
        className={'m-auto d-flex align-items-center'}
        style={{
          width: '400px',
          height: '50vh',
        }}
      >
        <div className={'d-flex align-items-center'} style={{width: '100%'}}>
          <input
            type={'text'}
            className={'form-control rounded-pill'}
            style={{
              width: '100%',
              padding: '20px 20px',
            }}
            placeholder={'Search for Food Items!'}
            value={value}
            onChange={handleChange}
          />
          <span style={{position: 'relative', left: '-43px'}}>
            <i className={'bi bi-search'}></i>
          </span>
        </div>
      </div>
    </div>)
}

export default Banner
