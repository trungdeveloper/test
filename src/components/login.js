import * as React from "react";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    TextField,
} from "@material-ui/core";
import { useStyles } from "../asset/css/css";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../redux/slices/authSlice";

const Login = ({ setShowLogin }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        email: "",
        password: "",
    });
    const [isCheck, setIsCheck] = React.useState(false);
    const [forgetPassHover, setForgetPassHover] = React.useState(false);
    const [signUpHover, setSignUpHover] = React.useState(false);
    const [validate, setValidate] = React.useState({});
    const dispatch = useDispatch();

    const login = (data, isRememberAccount) =>
        dispatch(loginAPI(data, isRememberAccount));

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        setValidate((prevState) => ({
            ...prevState,
            [id]: "",
        }));
    };

    const validator = () => {
        let ok = true;
        for (const key in state) {
            if (!state[key]) {
                setValidate((prevValue) => ({
                    ...prevValue,
                    [key]: "Field cannot be empty",
                }));
                ok = false;
            }
        }
        return ok;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validator()) {
            login(state, isCheck);
        }
    };

    const loginError = useSelector((state) => state.auth.loginError);
    const loading = useSelector((state) => state.auth.loading);

    const sameProps = (whatEver) => ({
        id: whatEver,
        variant: "outlined",
        color: "secondary",
        fullWidth: true,
        required: true,
        onChange: handleChange,
        value: state[whatEver],
        error: !!validate[whatEver],
        helperText: validate[whatEver],
    });

    return (
        <>
            <form onSubmit={handleSubmit} className={classes.containerLogin}>
                <h2 className={classes.header}>Log in</h2>
                <TextField label="Email" type="email" {...sameProps("email")} />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    {...sameProps("password")}
                />
                <div className={classes.row}>
                    <FormControlLabel
                        classes={{ label: classes.label }}
                        control={
                            <Checkbox
                                checked={isCheck}
                                onChange={() => setIsCheck(!isCheck)}
                            />
                        }
                        label="Remember me"
                    />
                    <span
                        onMouseOver={() => setForgetPassHover(true)}
                        onMouseLeave={() => setForgetPassHover(false)}
                        className={[
                            classes.boldText,
                            forgetPassHover && classes.hover,
                        ].join(" ")}
                    >
                        Forgot password?
                    </span>
                </div>
                {loginError.message && (
                    <span className={classes.error}>{loginError.message}</span>
                )}
                <div className={classes.wrapper}>
                    <Button
                        classes={{ root: classes.customButton }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Log in
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </form>
            <p className={classes.center}>
                Don&apos;t have an account?{" "}
                <span
                    onMouseOver={() => setSignUpHover(true)}
                    onMouseLeave={() => setSignUpHover(false)}
                    className={[
                        classes.boldText,
                        signUpHover && classes.hover,
                    ].join(" ")}
                    onClick={() => setShowLogin(false)}
                >
                    Sign up
                </span>
            </p>
        </>
    );
};

export default Login;
