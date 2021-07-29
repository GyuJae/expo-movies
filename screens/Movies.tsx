import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import Swiper from "react-native-web-swiper";
import { genre, IMovie } from "../types.interface";
import { MovieSlide } from "../components/Slide";
import Title from "../components/Title";
import Poster from "../components/Poster";
import Vertical from "../components/Vertical";
import Horizontal from "../components/Horizontal";
import ScrollContainer from "../components/ScrollContainer";

interface IMovieState {
  loading: boolean;
  nowPlaying: IMovie[];
  upcoming: IMovie[];
  popular: IMovie[];
  genres: genre[];
}

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  background-color: black;
  margin-bottom: 20px;
`;

const SwiperContainer = styled.View`
  width: 100%;
  height: ${height / 3}px;
  margin-bottom: 4px;
`;

const Movies = ({ navigation }: any) => {
  const [movies, setMovies] = useState<IMovieState>({
    loading: true,
    nowPlaying: [],
    upcoming: [],
    popular: [],
    genres: [],
  });
  const page = Math.floor(Math.random() * 5) + 1;
  const getData = async () => {
    const {
      data: { results: nowPlaying },
    } = await moviesApi.nowPlaying(page);
    const {
      data: { results: upcoming },
    } = await moviesApi.upcoming(page);
    const {
      data: { results: popular },
    } = await moviesApi.popular(page);

    const {
      data: { genres },
    } = await moviesApi.genres();

    setMovies({
      loading: false,
      nowPlaying,
      upcoming,
      popular,
      genres,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollContainer loading={movies.loading} refreshFn={getData}>
      <>
        <SwiperContainer>
          <Swiper controlsEnabled={false} loop timeout={5}>
            {movies.nowPlaying.map((movie) => (
              <MovieSlide {...movie} genres={movies.genres} key={movie.id} />
            ))}
          </Swiper>
        </SwiperContainer>
        <Container>
          <Title text={"Popular Movie"} />
          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {movies.popular.map((movie) => {
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
        <Title text={"Coming soon"} />
        {movies.upcoming.map((movie) => {
          if (movie.poster_path) {
            return (
              <Horizontal
                key={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
                genre_ids={movie.genre_ids}
                genres={movies.genres}
                release_date={movie.release_date}
                overview={movie.overview}
              />
            );
          }
        })}
      </>
    </ScrollContainer>
  );
};

export default Movies;
