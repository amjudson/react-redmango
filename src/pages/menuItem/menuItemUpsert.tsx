import React, {useState} from 'react'
import {inputHelper, toastNotify} from '../../helper'

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: '',
  price: '0',
}

const MenuItemUpsert = () => {
  const [imageToBeStore, setImageToBeStore] = useState<any>()
  const [imageToBeDisplay, setImageToBeDisplay] = useState<string>('')
  const [menuItemInput, setMenuItemInput] = useState(menuItemData)

  const handleMenuitemInput = (e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >) => {
    const tempData = inputHelper(e, menuItemInput)
    setMenuItemInput(tempData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const imageType = file.type.split('/')[1]
      const validImageTypes = ['jpeg', 'png', 'jpg']
      const imageTypeValid = validImageTypes.filter(e => e === imageType)
      if (file.size > 1000 * 1024) {
        setImageToBeStore('')
        toastNotify('Image size should be less than 1MB', 'error')
        return
      } else if (imageTypeValid.length === 0) {
        setImageToBeStore('')
        toastNotify('Invalid image type. Must be jpeg, png, or jpg', 'error')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      setImageToBeStore(file)
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImageToBeDisplay(imageUrl)
      }
    }
  }

  return (
    <div className={'container border mt-5 p-5'}>
      <h3 className={'offset-2 px-2 text-success'}>Add Product</h3>
      <form method={'post'} encType='multipart/form-data'>
        <div className={'row mt-3'}>
          <div className={'col-md-5 offset-2'}>
            <input
              type={'text'}
              className={'form-control'}
              placeholder={'Enter Name'}
              value={menuItemInput.name}
              name={'name'}
              onChange={handleMenuitemInput}
              required
            />
            <textarea
              className={'form-control mt-3'}
              placeholder={'Enter Description'}
              value={menuItemInput.description}
              rows={5}
              name={'description'}
              onChange={handleMenuitemInput}
            ></textarea>
            <input
              type={'text'}
              className={'form-control mt-3'}
              placeholder={'Enter Special Tag'}
              value={menuItemInput.specialTag}
              name={'specialTag'}
              onChange={handleMenuitemInput}
            />
            <input
              type={'text'}
              className={'form-control mt-3'}
              placeholder={'Enter Category'}
              value={menuItemInput.category}
              name={'category'}
              onChange={handleMenuitemInput}
            />
            <input
              type={'number'}
              className={'form-control mt-3'}
              required
              placeholder={'Enter Price'}
              value={menuItemInput.price}
              name={'price'}
              onChange={handleMenuitemInput}
            />
            <input
              type={'file'}
              className={'form-control mt-3'}
              onChange={handleFileChange}
            />
            <div className={'text-center'}>
              <button
                type={'submit'}
                style={{width: '50%'}}
                className={'btn btn-success mt-5'}
              >
                Submit
              </button>
            </div>
          </div>
          <div className={'col-md-5 text-center'}>
            <img
              src={imageToBeDisplay}
              style={{width: '100%', borderRadius: '30px'}}
              alt=''
            />
          </div>
        </div>
      </form>
    </div>)
}

export default MenuItemUpsert
