import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { selectCamp } from '../features/chartData/chartDataSlice';
import './SelectCamp.css'

interface Props {
  selectOptions: string[]
}

const SelectCamp:React.FC<Props> = ({ selectOptions }: Props):ReactElement => {

  const dispatch = useDispatch()
  const selectedCamp: string = useSelector((state: RootState) => state.chartData.selectedCamp)


  return (
    <div>
      <label className='select-label'>Select Camp
        <select className='select-input' value={selectedCamp} onChange={e => dispatch(selectCamp(e.currentTarget.value))}>
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