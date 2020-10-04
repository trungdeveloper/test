import { Box, Button, Divider, makeStyles, Snackbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import DashboardSidebar from "../components/dashboardSidebar";
import { MovieTable } from "../components/movieTable";
import { fetchMovies } from "../redux/slices/moviesSlice";
import MuiAlert from "@material-ui/lab/Alert";

const Dashboard = () => {
    const classes = useStyles();
    const [showSideBar, setShowSideBar] = React.useState(false);
    const dispatch = useDispatch();
    const fetchAllMovies = () => dispatch(fetchMovies());
    const [openAlert, setOpenAlert] = React.useState(false);

    React.useEffect(fetchAllMovies, []);

    return (
        <>
            <Box className={classes.dashboardHeader} boxShadow={3}>
                <Menu fontSize="large" onClick={() => setShowSideBar(true)} />
            </Box>
            <div className={classes.container}>
                <div className={classes.sectionHeader}>
                    <h1>Movie</h1>
                    <Button
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.customButton }}
                        onClick={() => setOpenAlert(true)}
                    >
                        create new
                    </Button>
                </div>
                <Divider />
                <br />
                <MovieTable setOpenAlert={setOpenAlert} />
                <DashboardSidebar
                    show={showSideBar}
                    handleShow={setShowSideBar}
                />
                <Snackbar
                    open={openAlert}
                    onClose={() => setOpenAlert(false)}
                    autoHideDuration={6000}
                >
                    <MuiAlert
                        variant="filled"
                        onClose={() => setOpenAlert(false)}
                        severity="error"
                    >
                        Permission Denied!!!
                    </MuiAlert>
                </Snackbar>
            </div>
        </>
    );
};

export default Dashboard;

const useStyles = makeStyles({
    container: {
        backgroundColor: "#E5E5E5",
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
        marginTop: 5,
    },
    dashboardHeader: {
        height: 64,
        alignItems: "center",
        display: "flex",
        paddingLeft: 30,
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
    },
    customButton: {
        background: "black",
        color: "white",
    },
});
