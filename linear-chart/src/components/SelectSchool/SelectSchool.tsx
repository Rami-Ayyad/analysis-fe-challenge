import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectSchool } from '../features/chartData/chartDataSlice';

interface Props {
    selectOptions: string[]
}

const SelectSchool = ({ selectOptions }: Props) => {

    const dispatch = useDispatch()
    const selectedSchool = useSelector((state: any) => state.chartData.selectedSchool)

    return (
        <div>
            <label>Select Country
                <select value={selectedSchool} onChange={e => dispatch<any>(selectSchool(e.currentTarget.value))}>
                    <option>Select</option>
                    <option>Show all</option>
                    {selectOptions.map((school: string, index: number) => (
                        <option key={index}>{school}</option>
                    ))}
                </select>
            </label>
            <div>{selectedSchool === "Select" ? "Please Select Country" : null}</div>
        </div>
    )


}
export default SelectSchool