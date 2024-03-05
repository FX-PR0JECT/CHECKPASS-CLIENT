import styled from 'styled-components';

const Modal = ({ text, isClose }: any) => {
  if (!isClose) {
    return null;
  }

  return (
    <Container>
      <Background onClick={isClose}></Background>
      <ModalContainer>
        <Header>
          <CloseButton onClick={isClose}>
            <i className="fa-solid fa-xmark"></i>
          </CloseButton>
        </Header>
        <Message>
          <span>{text}</span>
        </Message>
      </ModalContainer>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;

  width: 450px;
  height: 200px;

  border: 1px solid #4e4e4e;
  border-radius: 20px;

  background-color: #fff;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  padding: 13px;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;

  font-size: 26px;
  cursor: pointer;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(200px - 100px);
`;
