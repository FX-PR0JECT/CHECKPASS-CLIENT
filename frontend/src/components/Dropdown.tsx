import styled from 'styled-components';
import auth from '../Hooks/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DropDown = () => {
  const navigate = useNavigate();

  const { userId } = auth();
  const [view, setView] = useState<Boolean>(false);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setView(!view);
  };

  const handleOutsideClick = () => {
    setView(false);
  };

  const onLogOut = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      navigate('/signIn');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Dropdown>
      <Profile onClick={handleProfileClick}></Profile>
      {view && (
        <Menu>
          <Link to={`/${userId}`}>
            <ProfileList>내 정보</ProfileList>
          </Link>
          <ProfileList onClick={onLogOut}>로그아웃</ProfileList>
        </Menu>
      )}
    </Dropdown>
  );
};

export default DropDown;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-family: 'AppleGothicL';
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;

  border: 1px solid ${({ theme }) => theme.profileBorder};
  border-radius: 100%;

  background-color: transparent;

  cursor: pointer;
`;

const Menu = styled.ul`
  width: 100px;
  margin-top: 50px;
  list-style: none;

  position: absolute;

  background-color: ${({ theme }) => theme.itemColor};
  border-radius: 8px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);

  @keyframes dropdown {
    0% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  animation: dropdown 0.4s ease;
`;

const ProfileList = styled.li`
  padding: 14px 20px;
  display: block;

  color: ${({ theme }) => theme.color};
  cursor: pointer;

  &:hover {
    color: #06c0eb;
  }
`;
