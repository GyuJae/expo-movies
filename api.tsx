import axios from "axios";

const api = (pageNum?: number) =>
  axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
      api_key: "962cebc1820ada99a807125b7f1fdcbf",
      language: "en-US",
      page: pageNum,
    },
  });

export const moviesApi = {
  nowPlaying: (pageNum: number) => api(pageNum).get("movie/now_playing"),
  upcoming: (pageNum: number) => api(pageNum).get("movie/upcoming"),
  popular: (pageNum: number) => api(pageNum).get("movie/popular"),
  discover: (pageNum: number) => api(pageNum).get("discover/movie"),
  genres: () => api().get("/genre/movie/list"),
  movieDetail: (id: string) =>
    api(1).get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term: string, pageNum: number) =>
    api(pageNum).get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: (pageNum: number) => api(pageNum).get("tv/top_rated"),
  thisWeek: (pageNum: number) => api(pageNum).get("/tv/on_the_air"),
  popular: (pageNum: number) => api(pageNum).get("tv/popular"),
  airingToday: (pageNum: number) => api(pageNum).get("tv/airing_today"),
  genres: () => api().get("/genre/tv/list"),
  showDetail: (id: string) =>
    api(1).get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term: string, pageNum: number) =>
    api(pageNum).get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const apiImage = (path: string) =>
  `https://image.tmdb.org/t/p/original${path}`;
