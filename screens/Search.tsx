import React from "react";
import styled from "styled-components/native";
import SearchInput from "../components/SearchInput";

const Container = styled.View`
  background-color: black;
  height: 100%;
  color: white;
`;

const Search = () => {
  return (
    <Container>
      <SearchInput />
    </Container>
  );
};

export default Search;
