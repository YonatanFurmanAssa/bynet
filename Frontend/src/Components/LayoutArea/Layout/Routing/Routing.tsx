import { Navigate, Route, Routes } from "react-router-dom";
import AddMeeting from "../../meetingsArea/addMeeting";
import MeetingsList from "../meetingsArea/AddServer/meetingsCard/meetingsList/meetingsList";



import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/meetings" element={<MeetingsList />} />
                <Route path="/meetings/add" element={<AddMeeting />} />
                <Route path="/" element={<Navigate to="/meetings" />} />
            </Routes>
        </div>
    );
}

export default Routing;
