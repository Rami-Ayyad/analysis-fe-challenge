import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCamp } from '../features/chartData/chartDataSlice';
import './SelectCamp.css'

interface Props {
  selectOptions: string[]
}

const SelectCamp = ({ selectOptions }: Props) => {

  const dispatch = useDispatch()
  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)
 

  return (
    <div>
      <label className='select-label'>Select Camp
        <select className='select-input' value={selectedCamp} onChange={e => dispatch<any>(selectCamp(e.currentTarget.value))}>
          <option>Select</option>
          {selectOptions.map((camp: string, index: number) => (
            <option key={index}>{camp}</option>
          ))}
        </select>
      </label>
      <div className='select-warning'>{selectedCamp === "Select" ? "Please Select Camp" : null}</div>
    </div>
  )


}
export default SelectCamp