import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actionCreator from './store/actionCreator'
const Index = () => {
  const s = useSelector(state => state.indexReducer)
  const dispatch = useDispatch()
  const handleAdd = () => {
    dispatch(actionCreator.addClickNum())
    // console.log('click', s, actionCreator.addClickNum())
  }
  return <>
    <div onClick={handleAdd}>click me</div>
    {s.clickNum}
  </>
}

export default Index
