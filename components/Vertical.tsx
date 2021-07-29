import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { sliceText } from "../utils";
import Poster from "./Poster";
import Title from "./Title";
import Votes from "./Votes";

const Container = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Content_Title = styled.Text`
  color: white;
  font-weight: 600;
  margin: 10px 0px 5px 0px;
`;

interface IVertical {
  poster_path: string;
  title: string;
  vote_average: number;
}

const Vertical: React.FC<IVertical> = ({
  poster_path,
  title,
  vote_average,
}) => {
  return (
    <Container>
      <TouchableOpacity>
        <Poster url={poster_path as string} />
      </TouchableOpacity>
      <Content_Title>{sliceText(title, 10)}</Content_Title>
      <Votes votes={vote_average} />
    </Container>
  );
};

export default Vertical;
