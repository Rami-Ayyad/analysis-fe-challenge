import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners'
import { RootState } from '../../services/store';
import './Spinner.css'

interface Props {

}

const SelectCamp: React.FC = ():ReactElement => {

    const dispatch = useDispatch()
    const isLoading: boolean = useSelector((state: RootState) => state.chartData.isLoading)

    return (

        <div className='spinner-container'>
            <BeatLoader size={70} color="#8DD0FA" loading={isLoading} />
        </div>

    )


}
export default SelectCamp