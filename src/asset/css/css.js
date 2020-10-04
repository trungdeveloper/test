import { makeStyles } from "@material-ui/core";
import img from "../image/img.jpg";

export const useStyles = makeStyles({
    containerLogin: {
        width: 350,
        height: "100%",
        paddingLeft: "30px",
        paddingRight: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    containerRegister: {
        width: 350,
        height: "auto",
        paddingLeft: "30px",
        paddingRight: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    header: {
        alignSelf: "start",
    },
    label: {
        color: "#aaa",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    boldText: {
        fontWeight: "bold",
    },
    center: {
        alignSelf: "center",
    },
    hover: {
        color: "blue",
        fontWeight: "bold",
        cursor: "pointer",
    },
    customButton: {
        borderRadius: 100,
        background: "#454b60",
        width: "100%",
    },
    margin: {
        width: 25,
    },
    error: {
        color: "red",
        alignSelf: "center",
    },
    BGImage: {
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
    },
    closeSidebar: {
        alignSelf: "flex-end",
        margin: "15px",
    },
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        color: "green",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
});
