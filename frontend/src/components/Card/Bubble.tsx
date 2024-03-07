import styled from 'styled-components';
import { fontSizes } from '../../Styles/theme';

type BubblePropsType = {
  image: string;
  description: string;
  content: string;
};

const Bubble = ({ image, description, content }: BubblePropsType) => {
  return (
    <BubbleBox>
      <CardIcon src={image} alt={description} />
      <Content>{content}</Content>
    </BubbleBox>
  );
};

export default Bubble;

const BubbleBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const CardIcon = styled.img`
  width: 44px;
  height: 44px;
`;

const Content = styled.div`
  padding: 8px 14px;
  display: inline-block;

  position: relative;

  border-radius: 14px;
  background-color: ${({ theme }) => theme.bubble};

  font-size: ${fontSizes.small};

  &::before {
    content: '';

    width: 16px;
    height: 16px;

    position: absolute;
    top: -4px;
    left: -3px;

    background-image: url(${(props) => props.theme.bubbleTail});

    background-size: 16px;
    background-repeat: no-repeat;
  }
`;
