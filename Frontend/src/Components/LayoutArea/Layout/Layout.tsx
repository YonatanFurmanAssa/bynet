import { NavLink } from "react-router-dom";
import "./Layout.css";
import Routing from "./Routing/Routing";
function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className="header">
                <img className="header-title" src="https://www.bynet.co.il/wp-content/themes/sogo-child/images/logo.png"></img>
                <NavLink className="header-title" to="/meetings">Meetings list</NavLink>
                <NavLink className="header-title" to="/meetings/add">Add meeting</NavLink>
            </div>
            <h1>Meetings </h1>

            <Routing />

        </div>
    );
}

export default Layout;
