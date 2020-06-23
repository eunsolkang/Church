import react, {useCallback, useEffect, useState} from 'react';
import  {getUserList, removeUser, updateUser, createUser, getUser} from '../../lib/firebase'

export default function useUser(){

    const [userList, setUserList] = useState();
    const [remove, setRemove] = useState(false);
    const [update, setUpdate] = useState(false);

    const [input, setInput] = useState({
        name : '',
        phoneNumber : '',
        position : '',
        i : 0
    })
    const handleUserList = async() =>{
        try{
            const value = await getUserList();
            const list = value.val();
            setUserList(Object.entries(list) as any);
            
        }catch(e){
            console.log(e);
        }
    }
    const handleRemove = async(id) =>{
        try{
            const isRemove = await removeUser(id);
            console.log(isRemove);
            setRemove(true)
            
        }catch(e){
            console.log();
        }
    }
    const handleGetUser = async(i) =>{
        const user = await getUser(i);
        setInput({
            name : user.val().name,
            phoneNumber : user.val().phoneNumber,
            position : user.val().position,
            i : i
        });
        
    }
    const handleUpdateUser = async(id, payment) =>{
        try{
            await updateUser(id, payment);
            setUpdate(true);
        }catch(e){
            console.log(e);
        }
    }
    const onChange = (e) =>{
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }
    const handleCreateUser = async(data, i) =>{
        try{
            console.log(data, i);
            
            
            await createUser(data, i);
            setUpdate(true);
        }catch(e){
            console.log(e);
            
        }
    }
    useEffect(
        ()=>{
            handleUserList();
        }, []
    )
    useEffect(
        ()=>{
            handleUserList();
            setRemove(false);
            setUpdate(false);
        },[remove, update]
    )
    return {
        userList, handleRemove, handleUpdateUser, onChange, handleCreateUser, input, handleGetUser
    }
}