import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import useUser from '../../hooks/user/useUser'
import {  Image, List, Button, Pagination, Input, Loader, Dimmer, Modal, Form } from 'semantic-ui-react'
import useInput from '../../hooks/common/useInput';

import profileImg from '../../img/profile.png'
import {Link} from 'react-router-dom'
import { useRouter } from '../../hooks/common/useRouter';
import Responsive from '../common/Responsive';
const UserBlock = styled(Responsive)`
    padding : 2rem;
    .page-bar{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .top{
        display : flex;
        justify-content : space-between;
    }
`;

const User = () => {
    const {userList, handleRemove, handleUpdateUser, onChange, handleCreateUser, input, handleGetUser} = useUser();
    const router = useRouter();
    const [activePage, setActivePage] = useState(router.query.page ? router.query.page : 1 );
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const search = useInput("search")
    if (!userList){
        return (
            <UserBlock>
                <Dimmer active inverted>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </UserBlock>
        )
    }
    console.log(userList);

    const onRemove = (id) =>{
        const accept = window.confirm("정말 삭제하시겠습니까?");
        if(!accept){
            return;
        }
        handleRemove(id)
    }
    const onChangePage = (e : any, { activePage } : any)=>{
        setActivePage(activePage)
        router.history.push(`?page=${activePage}`)
    }

    const show = () => {
        setOpen(true);
    }
    const close = () => setOpen(false);
    
    const updateShow = (i) => {
        setUpdateOpen(true);
        
        handleGetUser(i);
    }
    const updateClose = () => setUpdateOpen(false);
    
    const filterUser = userList?.filter(user => user[1]?.name?.indexOf(search.value.trim()) !== -1);
    const users = filterUser?.map((user, i)=>{
        const {profileImg, phoneNumber, position, id, name } = user[1];
        
        if(((activePage - 1) * 13 <= i && i<= ((activePage - 1) * 13) + 13)){
            return(
                <List.Item key={i}>
                    
                    <List.Content floated='right'>
                        <Button onClick={()=>onRemove(user[0])}>삭제</Button>
                    </List.Content>
                    <List.Content floated='right'>
                        <Button primary onClick={()=>updateShow(user[0])}>수정</Button>
                    </List.Content>
                    <Image avatar src={profileImg}/>
                    <List.Content>{name} <br/>{position ? ("위치 : "+  position) : ""}<br/>{phoneNumber} </List.Content>
                    <List.Content> </List.Content>
                </List.Item>
            )
        }
        
    })
    
    return (
        <UserBlock>
            <p className="top">총 회원수 : {users.length}명 <Button primary onClick={show}>회원추가</Button></p>
            <Input icon='search' fluid placeholder='Search...' {...search}/>
            <List divided verticalAlign='middle'>
               {users} 
            </List>
            <div className="page-bar">
                <Pagination
                    totalPages={Math.floor(users?.length / 13) }
                    activePage={activePage}
                    onPageChange={onChangePage}
                />
            </div>
            <Modal size="tiny" open={open} onClose={close}>
                    <Modal.Header>회원 추가</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Input type="text" onChange={onChange} name="name" label="회원 이름"/>
                            <Form.Input type="text" onChange={onChange} name="phoneNumber" label="전화번호"/>
                            <Form.Input type="text" onChange={onChange} name="position" label="위치"/>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={close}>취소</Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='추가하기'
                            onClick={()=>{
                                handleCreateUser({name : input.name, phoneNumber : input.phoneNumber, position : input.position}, users.length);
                                close();
                            }}
                        />
                    </Modal.Actions>
                </Modal>
                <Modal size="tiny" open={updateOpen} onClose={updateClose}>
                    <Modal.Header>회원 수정</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Input type="text" onChange={onChange} value={input.name} name="name" disabled={true} label="회원 이름"/>
                            <Form.Input type="text" onChange={onChange} value={input.phoneNumber} name="phoneNumber" label="전화번호"/>
                            <Form.Input type="text" onChange={onChange} value={input.position} name="position" label="위치"/>
                            
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={updateClose}>취소</Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='수정하기'
                            onClick={()=>{
                                handleUpdateUser({name : input.name, phoneNumber : input.phoneNumber, position : input.position},input.i );
                                updateClose();
                            }}
                        />
                    </Modal.Actions>
                </Modal>
        </UserBlock>
    )
}

export default User;