import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

let initialState = {
    user: {},
    loading: false,
    loginError: {},
    registerError: {},
    logged: false,
};

const storeState = JSON.parse(localStorage.getItem("initialState"));
if (storeState) {
    initialState = storeState;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.loginError = {};
            state.registerError = {};
        },
        loginSuccess(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.logged = true;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.loginError = action.payload;
        },
        rememberAccount(state) {
            localStorage.setItem("initialState", JSON.stringify(state));
        },
        logout() {
            localStorage.removeItem("initialState");
            return {
                user: {},
                loading: false,
                loginError: {},
                registerError: {},
                logged: false,
            };
        },
        registerRequest(state) {
            state.loading = true;
            state.loginError = {};
            state.registerError = {};
        },
        registerSuccess(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.logged = true;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.registerError = action.payload;
        },
    },
});

const {
    loginRequest,
    loginSuccess,
    loginFailure,
    rememberAccount,
    registerRequest,
    registerSuccess,
    registerFailure,
} = authSlice.actions;

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const loginAPI = (user, isRememberAccount) => {
    return (dispatch) => {
        dispatch(loginRequest());
        Axios.post(
            "http://tickets-tahiti-api.bustedgame.site/api/v1/auth/login",
            user
        )
            .then((response) => {
                dispatch(loginSuccess(response.data));
                isRememberAccount && dispatch(rememberAccount());
            })
            .catch((error) => {
                dispatch(
                    loginFailure(
                        error.response
                            ? error.response.data
                            : { message: "Connect Error" }
                    )
                );
            });
    };
};

export const registerAPI = (user) => {
    return (dispatch) => {
        dispatch(registerRequest());
        Axios.post(
            "http://tickets-tahiti-api.bustedgame.site/api/v1/auth/register",
            user
        )
            .then((response) => {
                dispatch(registerSuccess(response.data));
            })
            .catch((error) => {
                dispatch(
                    registerFailure(
                        error.response
                            ? error.response.data
                            : { message: "Connect Error" }
                    )
                );
            });
    };
};
