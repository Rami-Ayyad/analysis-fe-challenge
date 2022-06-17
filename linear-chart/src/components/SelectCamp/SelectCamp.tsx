import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCamp } from '../features/chartData/chartDataSlice';

interface Props {
  selectOptions: string[]
}

const SelectCamp = ({ selectOptions }: Props) => {

  const dispatch = useDispatch()
  const selectedCap = useSelector((state: any) => state.chartData.selectCamp)

  return (
    <div>
      <label>Select Country
        <select value={selectedCap} onChange={e => dispatch<any>(selectCamp(e.currentTarget.value))}>
          <option>Select</option>
          {selectOptions.map((camp: string, index: number) => (
            <option key={index}>{camp}</option>
          ))}
        </select>
      </label>
      <div>{selectedCap === "Select" ? "Please Select Country" : null}</div>
    </div>
  )


}
export default SelectCamp