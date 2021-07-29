import React from "react";
import styled from "styled-components/native";

interface IVotes {
  votes: number;
}

const Container = styled.Text`
  color: rgb(220, 220, 220);
  font-weight: 500;
  font-size: 12px;
`;

const Votes: React.FC<IVotes> = ({ votes }) => (
  <Container>⭐️ {votes} / 10</Container>
);

export default Votes;
