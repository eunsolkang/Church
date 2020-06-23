import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import {Link} from 'react-router-dom';
import { Dropdown, Icon, Button } from 'semantic-ui-react'
import { useRouter } from '../../hooks/common/useRouter';

const HeaderBlock = styled.div`
    position : fixed;
    width: 100%;
    z-index : 100;
    box-shadow : 0px 2px 4px rgba(0, 0, 0, 0.08);
    background : white;
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display : flex;
    flex-direction: row;
    align-items: center;
    justify-content : space-between;
    .logo-box{
        display: flex;
        flex-direction: row;
        .logo{
            font-size : 1.125rem;
            font-weight : 800;
            letter-spacing : 2px;
            margin-left: 2rem;
        }
        
    }
    
    .right{
        display : flex;
        align-items : center;
    }
    .nav{
       margin-left : 1rem;
    }
`
const Spacer = styled.div`
    height : 4rem;
`;

function Header() {
    const router = useRouter()
    return (
        <>
        <HeaderBlock>
            <Wrapper>
                <div className="logo-box">
                    <Link className="logo" to="/user">수서교회 출입대장</Link>
                </div>
                <nav>
                    {/* <Link className="nav" to="/chat">채팅관리</Link> */}
                    <Link className="nav" to="/user">회원관리</Link>
                    <Link className="nav" to="/attend">출석관리</Link>
                </nav>
            </Wrapper>
        </HeaderBlock>
        <Spacer/>
        </>
    )
}

export default Header;
