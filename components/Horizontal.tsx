import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { genre } from "../types.interface";
import { sliceText } from "../utils";
import Genres from "./Genres";
import Poster from "./Poster";
import Votes from "./Votes";

interface IHorizontal {
  poster_path: string;
  vote_average: number;
  title: string;
  genre_ids?: number[];
  genres: genre[];
  release_date: string;
  overview: string;
}

const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0px 20px;
`;

const Data = styled.View`
  margin-left: 10px;
  flex-direction: column;
  width: 70%;
`;

const Title = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 15px;
`;

const ReleaseDate = styled.Text`
  color: white;
  font-size: 12px;
  margin-right: 10px;
`;

const GenreDateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: white;
  opacity: 0.8;
`;

const Horizontal: React.FC<IHorizontal> = ({
  poster_path,
  vote_average,
  title,
  genre_ids,
  genres,
  release_date,
  overview,
}) => {
  return (
    <TouchableOpacity>
      <Container>
        <Poster url={poster_path as string} />
        <Data>
          <Title>{sliceText(title, 33)}</Title>
          <GenreDateContainer>
            <ReleaseDate>{release_date}</ReleaseDate>
            {genre_ids && genres && (
              <Genres genre_ids={genre_ids} genres={genres} />
            )}
          </GenreDateContainer>
          <Votes votes={vote_average} />
          <Overview numberOfLines={4}>{overview}</Overview>
        </Data>
      </Container>
    </TouchableOpacity>
  );
};

export default Horizontal;
