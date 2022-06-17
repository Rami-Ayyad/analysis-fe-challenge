import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners'
import './Spinner.css'

interface Props {
    
}

const SelectCamp = ({  }: Props) => {

    const dispatch = useDispatch()
    const isLoading = useSelector((state: any) => state.chartData.isLoading)

    return (

        <div className='spinner-container'>
            <BeatLoader size={70} color="#8DD0FA" loading={isLoading} />
        </div>

    )


}
export default SelectCamp