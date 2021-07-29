import React, { useState } from "react";
import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import { genre, IMovie, ITV } from "../types.interface";
import Horizontal from "./Horizontal";
import ScrollContainer from "./ScrollContainer";
import Title from "./Title";
import Vertical from "./Vertical";

interface ISearchInput {
  term: string;
}

const Container = styled.View``;

const TermInput = styled.TextInput`
  background-color: #fff;
  margin: 0px 30px;
  padding: 5px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  outline: none;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.Text``;

interface IState {
  movies: IMovie[];
  tvs: ITV[];
  genres: genre[];
  loading: boolean;
}

const SearchInput = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchInput>();
  const onSubmit: SubmitHandler<ISearchInput> = async ({ term }) => {
    await getData(term);
  };

  const [results, setResults] = useState<IState>({
    movies: [],
    tvs: [],
    genres: [],
    loading: false,
  });

  const getData = async (term: string) => {
    await setResults({ movies: [], genres: [], tvs: [], loading: true });
    const {
      data: { results: movies },
    } = await moviesApi.search(term, 1);
    const {
      data: { results: tvs },
    } = await tvApi.search(term, 1);
    const {
      data: { genres },
    } = await moviesApi.genres();
    setResults({ movies, genres, tvs, loading: false });
  };

  return (
    <ScrollContainer loading={results.loading} refreshFn={onSubmit}>
      <Container>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TermInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="term"
          defaultValue=""
        />
        {errors.term && <ErrorMessage>This is required</ErrorMessage>}

        <Container>
          {results.movies.length !== 0 && <Title text={"Movies"} />}
          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {results.movies.map((movie) => {
              if (movie.poster_path) {
                return (
                  <Vertical
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                );
              }
            })}
          </ScrollView>
        </Container>
        <Container>
          {results.tvs.length !== 0 && <Title text={"TV Shows"} />}
          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {results.tvs.map((tv) => {
              if (tv.poster_path) {
                return (
                  <Vertical
                    key={tv.id}
                    poster_path={tv.poster_path}
                    title={tv.name}
                    vote_average={tv.vote_average}
                  />
                );
              }
            })}
          </ScrollView>
        </Container>
      </Container>
    </ScrollContainer>
  );
};

export default SearchInput;
