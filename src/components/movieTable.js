import * as React from "react";
import {
    CircularProgress,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { MenuActions } from "./menuActions";

export const MovieTable = ({ setOpenAlert }) => {
    const movies = useSelector((state) => state.movie.movies);
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [openMenu, setOpenMenu] = React.useState(false);
    const buttonRefs = [];
    const [buttonRef, setButtonRef] = React.useState(undefined);

    const setRef = (ref) => {
        buttonRefs.push(ref);
    };

    const handleOpenMenu = (index) => {
        setButtonRef(buttonRefs[index]);
        setOpenMenu(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, movies && movies.length - page * rowsPerPage);

    const renderTableHead = () => (
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );

    const renderTableBody = () => (
        <TableBody>
            {movies.length ? (
                (rowsPerPage > 0
                    ? movies.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                      )
                    : movies
                ).map((movie, index) => (
                    <TableRow key={movie.id}>
                        <TableCell>{movie.id}</TableCell>
                        <TableCell>
                            <img
                                src={movie.thumbnail.src}
                                width="auto"
                                height="50"
                                alt="movie thumbnail"
                            />
                        </TableCell>
                        <TableCell>{movie.name}</TableCell>
                        <TableCell>
                            {new Date(movie.createdAt).toString()}
                        </TableCell>
                        <TableCell>{movie.description}</TableCell>
                        <TableCell>
                            <IconButton
                                ref={setRef}
                                onClick={() => handleOpenMenu(index)}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} align="center">
                        <CircularProgress size={100} color="secondary" />
                    </TableCell>
                </TableRow>
            )}
            {movies.length > 0 && emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
            <MenuActions
                open={openMenu}
                setOpenMenu={setOpenMenu}
                buttonRef={buttonRef}
                setOpenAlert={setOpenAlert}
            />
        </TableBody>
    );

    return (
        <>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table className={classes.table}>
                        {renderTableHead()}
                        {renderTableBody()}
                    </Table>
                </TableContainer>
                {movies.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 25]}
                        component="div"
                        count={movies && movies.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 800,
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
}));
