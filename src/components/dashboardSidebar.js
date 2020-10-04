import * as React from "react";
import { MenuOpen } from "@material-ui/icons";
import { Button, Drawer } from "@material-ui/core";
import { useStyles } from "../asset/css/css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const DashboardSidebar = ({ show, handleShow }) => {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const signout = () => dispatch(logout());

    return (
        <Drawer open={show} onClose={() => handleShow(false)}>
            <MenuOpen
                className={classes.closeSidebar}
                onClick={() => handleShow(false)}
                fontSize="large"
            />
            <div className={classes.containerLogin}>
                <p>
                    Hello,{" "}
                    <span className={classes.boldText}>
                        {user.firstName + " " + user.lastName}
                    </span>
                </p>
                <Button
                    className={classes.customButton}
                    variant="contained"
                    color="primary"
                    onClick={signout}
                >
                    log out
                </Button>
            </div>
        </Drawer>
    );
};

export default DashboardSidebar;
