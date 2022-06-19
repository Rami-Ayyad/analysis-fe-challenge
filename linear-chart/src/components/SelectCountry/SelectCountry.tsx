import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { selectCountry } from '../features/chartData/chartDataSlice';
import './SelectCountry.css'
interface Props {
  selectOptions: string[]
}

const SelectCountry:React.FC<Props> = ({ selectOptions }: Props):ReactElement => {

  const dispatch = useDispatch()
  const selectedCountry: string = useSelector((state: RootState) => state.chartData.selectedCountry)

  return (
    <div>
      <label className='select-label'>Select Country
        <select className='select-input' value={selectedCountry} onChange={e => dispatch(selectCountry(e.currentTarget.value))}>
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