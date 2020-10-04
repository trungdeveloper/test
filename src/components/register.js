import * as React from "react";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useStyles } from "../asset/css/css";
import { useDispatch, useSelector } from "react-redux";
import { registerAPI } from "../redux/slices/authSlice";

const Register = ({ setShowLogin }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        phoneNumber: "",
        address: "",
        postCode: "",
        email: "",
        password: "",
    });
    const [confirmPassword, setConirmPassword] = React.useState("");
    const [signInHover, setSignInHover] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [validate, setValidate] = React.useState({});
    const dispatch = useDispatch();

    const register = (data) => dispatch(registerAPI(data));

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
            if (state.password === confirmPassword) {
                setError(false);
                register({
                    ...state,
                });
            } else {
                setError(true);
            }
        }
    };

    const loading = useSelector((state) => state.auth.loading);
    const registerError = useSelector((state) => state.auth.registerError);

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
            <form onSubmit={handleSubmit} className={classes.containerRegister}>
                <h2 className={classes.header}>Sign up</h2>
                <div className={classes.row}>
                    <TextField label="First Name" {...sameProps("firstName")} />
                    <div className={classes.margin} />
                    <TextField label="Last Name" {...sameProps("lastName")} />
                </div>
                <br />
                <div className={classes.row}>
                    <TextField label="City" {...sameProps("city")} />
                    <div className={classes.margin} />
                    <TextField label="Country" {...sameProps("country")} />
                </div>
                <br />
                <TextField label="Phone Number" {...sameProps("phoneNumber")} />
                <br />
                <TextField label="Address" {...sameProps("address")} />
                <br />
                <TextField
                    label="Post Code"
                    type="number"
                    {...sameProps("postCode")}
                />
                <br />
                <TextField label="Email" type="email" {...sameProps("email")} />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    {...sameProps("password")}
                />
                <br />
                <TextField
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    color="secondary"
                    value={confirmPassword}
                    onChange={(e) => setConirmPassword(e.target.value)}
                    error={error}
                    helperText={error && "Password does not match"}
                    fullWidth
                    required
                />
                <br />
                {registerError.message && (
                    <span className={classes.error}>
                        {registerError.message}
                    </span>
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
                        Sign Up
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </form>
            <br />
            <p className={classes.center}>
                Aldready have an account?{" "}
                <span
                    onMouseOver={() => setSignInHover(true)}
                    onMouseLeave={() => setSignInHover(false)}
                    className={[
                        classes.boldText,
                        signInHover && classes.hover,
                    ].join(" ")}
                    onClick={() => setShowLogin(true)}
                >
                    Sign in
                </span>
            </p>
        </>
    );
};

export default Register;
