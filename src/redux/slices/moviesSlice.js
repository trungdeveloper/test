import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
    movies: [],
    error: {},
    loading: false,
};

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        fetchMoviesRequest(state) {
            state.loading = true;
            state.error = {};
        },
        fetchMoviesSuccess(state, action) {
            state.loading = false;
            state.movies = action.payload;
        },
        fetchMoviesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const {
    fetchMoviesRequest,
    fetchMoviesSuccess,
    fetchMoviesFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies = () => {
    return (dispatch, getState) => {
        const token = getState().auth.user.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        dispatch(fetchMoviesRequest());
        Axios.get(
            "http://tickets-tahiti-api.bustedgame.site/api/v1/movies/all",
            config
        )
            .then((response) => {
                dispatch(fetchMoviesSuccess(response.data));
            })
            .catch((error) => {
                dispatch(
                    fetchMoviesFailure(
                        error.response
                            ? error.response.data
                            : { message: "Connect Error" }
                    )
                );
            });
    };
};
