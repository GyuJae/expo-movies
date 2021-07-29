import React from "react";
import styled from "styled-components/native";

interface ITitle {
  text: string;
}

const TitleContainer = styled.View`
  background-color: black;
  margin: 7px 0px;
`;

const TitleText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 700;
  margin-left: 15px;
`;

const Title: React.FC<ITitle> = ({ text }) => {
  return (
    <TitleContainer>
      <TitleText>{text}</TitleText>
    </TitleContainer>
  );
};

export default Title;
