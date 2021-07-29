import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../api";
import { genre, IMovie } from "../types.interface";
import { sliceText } from "../utils";
import Genres from "./Genres";
import Poster from "./Poster";
import Votes from "./Votes";

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackdropImg = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.6;
  position: absolute;
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Data = styled.View`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
`;

const SubContainer = styled.View`
  margin-bottom: 2px;
`;

const VotesContainer = styled.View`
  margin-bottom: 3px;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.7;
  font-size: 13px;
  font-weight: 500;
`;

const Button = styled.View`
  margin-top: 10px;
  background-color: #e74c3c;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
`;

interface IMovieSlid {
  id: number;
  backdrop_path?: string;
  title: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  genre_ids: number[];
  genres: genre[];
}

export const MovieSlide: React.FC<IMovieSlid> = ({
  id,
  backdrop_path,
  title,
  vote_average,
  overview,
  poster_path,
  genre_ids,
  genres,
}) => {
  if (backdrop_path && poster_path) {
    return (
      <Container key={id}>
        <BackdropImg key={id} source={{ uri: apiImage(backdrop_path) }} />
        <Content>
          <Poster url={poster_path} />
          <Data>
            <Title>{sliceText(title, 30)}</Title>
            <SubContainer>
              <VotesContainer>
                <Votes votes={vote_average} />
              </VotesContainer>
              <Genres genre_ids={genre_ids} genres={genres} />
            </SubContainer>
            <Overview numberOfLines={4}>{overview}</Overview>
            <TouchableOpacity>
              <Button>
                <ButtonText>View Details</ButtonText>
              </Button>
            </TouchableOpacity>
          </Data>
        </Content>
      </Container>
    );
  }
  return (
    <Container key={id}>
      <Content>
        <Overview>Nothing erro</Overview>
      </Content>
    </Container>
  );
};
