import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { selectSchool } from '../features/chartData/chartDataSlice';
import './SelectSchool.css'

interface Props {
    selectOptions: string[]
}

const SelectSchool:React.FC<Props> = ({ selectOptions }: Props):ReactElement => {

    const dispatch = useDispatch()
    const selectedSchool: string = useSelector((state: RootState) => state.chartData.selectedSchool)

    return (
        <div>
            <label className='select-label'>Select School
                <select className='select-input' value={selectedSchool} onChange={e => dispatch(selectSchool(e.currentTarget.value))}>
                    <option>Select</option>
                    <option>Show all</option>
                    {selectOptions.map((school: string, index: number) => (
                        <option key={index}>{school}</option>
                    ))}
                </select>
            </label>
            <div className='select-warning'>{selectedSchool === "Select" ? "Please Select School" : null}</div>
        </div>
    )


}
export default SelectSchool