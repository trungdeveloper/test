import * as React from "react";
import { Drawer } from "@material-ui/core";
import Login from "./login";
import Register from "./register";

const Sidebar = () => {
    const [showLogin, setShowLogin] = React.useState(true);

    return (
        <div>
            <Drawer open={true} ModalProps={{ hideBackdrop: true }}>
                {showLogin ? (
                    <Login setShowLogin={setShowLogin} />
                ) : (
                    <Register setShowLogin={setShowLogin} />
                )}
            </Drawer>
        </div>
    );
};

export default Sidebar;
