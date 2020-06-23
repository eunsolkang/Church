import react, {useCallback, useEffect, useState} from 'react';
import  {getAttendList} from '../../lib/firebase'
import moment from 'moment';

export default function useAttend(){

    const [attendList, setAttendList] = useState();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const handleAttendList = async() =>{
        try{
            const value = await getAttendList();
            const list = value.val();
            setAttendList(Object.entries(list) as any);
            
        }catch(e){
            console.log(e);
        }
    }
    const handleRightDate = ()=>{
        setDate(moment(date).add('d', 1).format('YYYY-MM-DD'))
        
    }
    const handleLeftDate = ()=>{
        setDate(moment(date).add('d', -1).format('YYYY-MM-DD'))
    }
    const onChange = (e) =>{
        const { name, value } = e.target;
        setDate(value);
    }
  
    useEffect(
        ()=>{
            handleAttendList();
        }, []
    )
    useEffect(
        ()=>{
            handleAttendList();
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        attendList, handleAttendList, handleLeftDate, onChange, handleRightDate, date
    }
}