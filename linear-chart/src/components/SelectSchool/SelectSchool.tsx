import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSchool } from '../features/chartData/chartDataSlice';
import './SelectSchool.css'

interface Props {
    selectOptions: string[]
}

const SelectSchool = ({ selectOptions }: Props) => {

    const dispatch = useDispatch()
    const selectedSchool = useSelector((state: any) => state.chartData.selectedSchool)

    return (
        <div>
            <label className='select-label'>Select School
                <select className='select-input' value={selectedSchool} onChange={e => dispatch<any>(selectSchool(e.currentTarget.value))}>
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