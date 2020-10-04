import * as React from "react";
import Sidebar from "../components/sideBar";
import { useStyles } from "../asset/css/css";

const UnAuthPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.BGImage}>
            <Sidebar />
        </div>
    );
};

export default UnAuthPage;
