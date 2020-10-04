import React from "react";
import {
    ClickAwayListener,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export const MenuActions = ({ buttonRef, open, setOpenMenu, setOpenAlert }) => {
    const handleItemClick = () => {
        setOpenMenu(false);
        setOpenAlert(true);
    };

    return (
        <Popper
            open={open}
            anchorEl={buttonRef}
            onClose={() => setOpenMenu(false)}
        >
            <Paper>
                <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                    <MenuList autoFocusItem={open}>
                        <StyledMenuItem onClick={handleItemClick}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Edit" />
                        </StyledMenuItem>
                        <StyledMenuItem onClick={handleItemClick}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </StyledMenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </Popper>
    );
};
