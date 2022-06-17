import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCountry} from '../features/chartData/chartDataSlice';
import './SelectCountry.css'
interface Props {
  selectOptions: string[]
}

const SelectCountry = ({ selectOptions }: Props) => {

  const dispatch = useDispatch()
  const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)

  return (
    <div>
      <label className='select-label'>Select Country
        <select className='select-input' value={selectedCountry} onChange={e => dispatch<any>(selectCountry(e.currentTarget.value))}>
          <option>Select</option>
          {selectOptions.map((country: string, index: number) => (
            <option key={index}>{country}</option>
          ))}
        </select>
      </label>
      <div className='select-warning'>{selectedCountry === "Select" ? "Please Select Country" : null}</div>
    </div>
  )


}
export default SelectCountry