import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";
import { tvApi } from "../api";
import Horizontal from "../components/Horizontal";
import ScrollContainer from "../components/ScrollContainer";
import Title from "../components/Title";
import Vertical from "../components/Vertical";
import { genre, ITV } from "../types.interface";

interface ITVState {
  loading: boolean;
  topRated: ITV[];
  thisWeek: ITV[];
  popular: ITV[];
  airingToday: ITV[];
  genres: genre[];
}

const Container = styled.View`
  background-color: black;
  margin-bottom: 20px;
`;

const TV = () => {
  const [TVs, setTVs] = useState<ITVState>({
    loading: true,
    topRated: [],
    thisWeek: [],
    popular: [],
    airingToday: [],
    genres: [],
  });
  const getData = async () => {
    const page = Math.floor(Math.random() * 5) + 1;
    const {
      data: { results: topRated },
    } = await tvApi.topRated(page);
    const {
      data: { results: thisWeek },
    } = await tvApi.thisWeek(page);
    const {
      data: { results: popular },
    } = await tvApi.popular(page);
    const {
      data: { results: airingToday },
    } = await tvApi.airingToday(page);
    const {
      data: { genres },
    } = await tvApi.genres();
    setTVs({
      loading: false,
      topRated,
      thisWeek,
      popular,
      airingToday,
      genres,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollContainer loading={TVs.loading} refreshFn={getData}>
      <>
        <Container>
          <Title text={"Popular Shows"} />
          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {TVs.popular.map((tv) => {
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
        <Container>
          <Title text={"Top Rated"} />
          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {TVs.topRated.map((tv) => {
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
        <Title text={"Coming soon"} />
        {TVs.airingToday.map((tv) => {
          if (tv.poster_path) {
            return (
              <Horizontal
                key={tv.id}
                poster_path={tv.poster_path}
                title={tv.name}
                vote_average={tv.vote_average}
                genre_ids={tv.genre_ids}
                genres={TVs.genres}
                release_date={tv.first_air_date}
                overview={tv.overview}
              />
            );
          }
        })}
      </>
    </ScrollContainer>
  );
};

export default TV;
