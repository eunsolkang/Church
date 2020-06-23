import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette'
import useAttend from '../../hooks/user/useAttend';
import { Icon, Input, List } from 'semantic-ui-react';
import Responsive from '../common/Responsive';
const AttendBlock = styled(Responsive)`
.date{
        display : flex;
        flex-direction : row;   
        justify-content: center;
        align-items : center;
        margin-top : 1rem;
        user-select: none;
        
        .content{
            /* border-radius : 8px; */
            text-align : center;
            width: 120px;
            font-size : 1.5rem;
            margin-right : 1rem;
            margin-left : 1rem;
            border : none;
            border-bottom : 3px solid rgb(118, 118, 118);
            /* background-color : ${palette.cyan[5]}; */
            padding-top : .75rem;
            padding-bottom : .75rem;
            color : black;
            font-weight : 700;
        }
        .icon{
            cursor: pointer;
        }
    }
`;

const Attend = () => {
    const {attendList, handleLeftDate, onChange, handleRightDate, date} = useAttend();

    console.log(attendList);
    
    const attends = attendList?.find(a => a[0] === date) && attendList?.find(a => a[0] === date)[1]
    const list = attends && Object.entries(attends);

    const mapList  = list?.map((l, i)=> {
        const {time, user} = l[1] as any;
        return (
            <List.Item key={i}>
                    <List.Content floated='right'>
                        {time}
                    </List.Content>
                    <List.Content>{user.name} <br/>{user.position ? ("위치 : "+  user.position) : ""}<br/>{user.phoneNumber} </List.Content>
            </List.Item>
        )
    }) as any;

    return (
        <AttendBlock>
            <div className="date">
                <span> <Icon color="grey" onClick={handleLeftDate} name="angle left" size="big"/> </span>
                <Input type="date" value={date} onChange={onChange} />
                <span> <Icon color="grey" onClick={handleRightDate} name="angle right" size="big"/> </span>
            </div>
            <List divided verticalAlign='middle'>
               {mapList ? mapList : "명단없음!"} 
            </List>
        </AttendBlock>
    )
}

export default Attend;