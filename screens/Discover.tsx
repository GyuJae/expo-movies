import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { moviesApi } from "../api";
import { IMovie } from "../types.interface";

const Discover = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const page = Math.floor(Math.random() * 5) + 1;
    const {
      data: { results },
    } = await moviesApi.discover(page);
    setMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>{movies.length}</Text>
    </View>
  );
};

export default Discover;
