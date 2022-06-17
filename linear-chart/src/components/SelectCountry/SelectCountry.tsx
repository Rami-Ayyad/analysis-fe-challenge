import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCountry, selectCamp, selectSchool } from '../features/chartData/chartDataSlice';

interface Props {
  selectOptions: string[]
}

const SelectCountry = ({ selectOptions }: Props) => {

  const dispatch = useDispatch()
  const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)

  return (
    <div>
      <label>Select Country
        <select value={selectedCountry} onChange={e => dispatch<any>(selectCountry(e.currentTarget.value))}>
          <option>Select</option>
          {selectOptions.map((country: string, index: number) => (
            <option key={index}>{country}</option>
          ))}
        </select>
      </label>
      <div>{selectedCountry === "Select" ? "Please Select Country" : null}</div>
    </div>
  )


}
export default SelectCountry