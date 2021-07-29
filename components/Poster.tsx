import React from "react";
import styled from "styled-components/native";
import { apiImage } from "../api";

const Image = styled.Image`
  width: 110px;
  height: 160px;
  border-radius: 4px;
`;

interface IPoster {
  url: string;
}

const Poster: React.FC<IPoster> = ({ url }) => {
  return <Image source={{ uri: apiImage(url) }}></Image>;
};

export default Poster;
