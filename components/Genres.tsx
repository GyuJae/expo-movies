import React from "react";
import styled from "styled-components/native";
import { genre } from "../types.interface";

interface IGenres {
  genre_ids?: number[];
  genres: genre[];
}

const GenreContainer = styled.View`
  flex-direction: row;
`;

const Genre = styled.Text`
  color: white;
  font-size: 9px;
  margin-right: 5px;
  opacity: 0.8;
`;

const Genres: React.FC<IGenres> = ({ genre_ids, genres }) => {
  return (
    <GenreContainer>
      {genre_ids
        ? genre_ids.map((id) => {
            const genre = genres.find((genre) => genre.id === id) as genre;
            return <Genre key={genre.id}>{genre.name}</Genre>;
          })
        : genres.map((genre, idx) => <Genre key={idx}> {genre.name}</Genre>)}
    </GenreContainer>
  );
};

export default Genres;
