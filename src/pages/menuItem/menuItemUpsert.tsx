import React, {useEffect, useState} from 'react'
import {inputHelper, toastNotify} from '../../helper'
import {useCreateMenuItemMutation, useGetMenuItemByIdQuery, useUpdateMenuItemMutation} from '../../api/menuItemApi'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import {MainLoader} from '../../components/page/common'
import {Category} from '../../utility/sd'

const Categories = [
  Category.APPETIZER,
  Category.BEVERAGES,
  Category.DESSERT,
  Category.ENTREE,
]

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: Categories[0],
  price: '0',
}

const MenuItemUpsert = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imageToStore, setImageToStore] = useState<any>()
  const [imageToDisplay, setImageToDisplay] = useState<string>('')
  const [menuItemInput, setMenuItemInput] = useState(menuItemData)
  const [createMenuItem] = useCreateMenuItemMutation()
  const [updateMenuItem] = useUpdateMenuItemMutation()

  const {data} = useGetMenuItemByIdQuery(id)


  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      }

      setMenuItemInput(tempData)
      setImageToDisplay(data.result.image)
    }
  }, [data])

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
        setImageToStore('')
        toastNotify('Image size should be less than 1MB', 'error')
        return
      } else if (imageTypeValid.length === 0) {
        setImageToStore('')
        toastNotify('Invalid image type. Must be jpeg, png, or jpg', 'error')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      setImageToStore(file)
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImageToDisplay(imageUrl)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!imageToStore && !id) {
      toastNotify('Please upload an image', 'error')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('Name', menuItemInput.name)
    formData.append('Description', menuItemInput.description)
    formData.append('SpecialTag', menuItemInput.specialTag ?? '')
    formData.append('Category', menuItemInput.category)
    formData.append('Price', menuItemInput.price)
    if (imageToStore) {
      formData.append('File', imageToStore)
    }

    let response
    if (id) {
      formData.append('id', id)
      response = await updateMenuItem({data: formData, id})
      toastNotify('Menu Item updated Successfully', 'success')
    } else {
      response = await createMenuItem(formData)
      toastNotify('Menu Item created Successfully', 'success')
    }

    if (response) {
      setLoading(false)
      navigate('/menuItem/menuitemlist')
    }

    setLoading(false)
  }

  return (
    <div className={'container border mt-5 p-5'}>
      {loading && <MainLoader/>}
      <h3 className={'px-2 text-success'}>
        {id ? 'Edit Menu Item' : 'Add Menu Item'}
      </h3>
      <form method={'post'} encType={'multipart/form-data'} onSubmit={handleSubmit}>
        <div className={'row mt-3'}>
          <div className={'col-md-7'}>
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
            <select
              className={'form-control mt-3 form-select'}
              value={menuItemInput.category}
              name={'category'}
              onChange={handleMenuitemInput}
            >
              {Categories.map((category, index) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
            <div className={'row'}>
              <div className={'col-6'}>
                <button
                  type={'submit'}
                  className={'btn btn-success form-control mt-3'}
                >
                  {id ? 'Update' : 'Create'}
                </button>
              </div>
              <div className={'col-6'}>
                <a
                  className={'btn btn-secondary form-control mt-3'}
                  onClick={() => navigate('/menuItem/menuitemlist')}
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
            <div className={'text-center'}>
            </div>
          </div>
          <div className={'col-md-5 text-center'}>
            <img
              src={imageToDisplay}
              style={{width: '100%', borderRadius: '30px'}}
              alt=''
            />
          </div>
        </div>
      </form>
    </div>)
}

export default MenuItemUpsert
