import React from 'react'
import {useGetMenuItemsQuery} from '../../api/menuItemApi'
import {MenuItemModel} from '../../interfaces'
import {MainLoader} from '../../components/page/common'
import {useNavigate} from 'react-router-dom'

const MenuItemList = () => {
  const navigate = useNavigate()
  const {data, isLoading} = useGetMenuItemsQuery(null)

  return (
    <>
      {isLoading && <MainLoader/>}
      {!isLoading && (
        <div className={'table p-5'}>
          <div className={'d-flex align-items-center justify-content-between'}>
            <h1 className={'text-success'}>MenuItem List</h1>
            <button
              className={'btn btn-success'}
              onClick={() => navigate(`/menuitem/menuitemupsert`)}
            >
              Add New
            </button>
          </div>
          <div className={'p-2'}>
            <div className={'row border'}>
              <div className={'col-1'}>Image</div>
              <div className={'col-1'}>ID</div>
              <div className={'col-2'}>Name</div>
              <div className={'col-2'}>Category</div>
              <div className={'col-1'}>Price</div>
              <div className={'col-2'}>Special Tag</div>
              <div className={'col-2'}>Action</div>
            </div>
            {data.result.length > 0 && data.result.map((item: MenuItemModel) => (
              <div className={'row border'} key={item.id}>
                <div className={'col-1'}>
                  <img
                    src={item.image}
                    alt={'no content'}
                    style={{width: '100%', maxWidth: '120px'}}
                  />
                </div>
                <div className={'col-1'}>{item.id}</div>
                <div className={'col-2'}>{item.name}</div>
                <div className={'col-2'}>{item.category}</div>
                <div className={'col-1'}>${item.price}</div>
                <div className={'col-2'}>{item.specialTag}</div>
                <div className={'col-2'}>
                  <button className={'btn btn-success'}>
                    <i
                      className={'bi bi-pencil-fill'}
                      onClick={() => navigate(`/menuitem/menuitemupsert/${item.id}`)}
                    ></i>
                  </button>
                  <button className={'btn btn-danger mx-2'}>
                    <i className={'bi bi-trash-fill'}></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuItemList
