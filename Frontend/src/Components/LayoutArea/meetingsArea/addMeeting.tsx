import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import meetingModel from "../../../Models/meeting-model";
import meetingTypeModel from "../../../Models/meetingType-model";
import meetingService from "../../../Services/meeting-service";
import organizerModel from "../../../Models/organizer-model";

function AddMeeting(): JSX.Element {

    const [MeetingsType, setMeetings] = useState<meetingTypeModel[]>([]);
    const [organizers, setOrganizers] = useState<organizerModel[]>([]);
    const { register, handleSubmit } = useForm<meetingModel>();
    const navigate = useNavigate();

    useEffect(() => {
        meetingService.getAllMeetingsType()
            .then(MeetingsType => setMeetings(MeetingsType))
            .catch(err => alert(err.message));
    }, []);
    useEffect(() => {
        meetingService.getAllOrganizers()
            .then(organizers => setOrganizers(organizers))
            .catch(err => alert(err.message));
    }, []);


    function send(Meeting: meetingModel) {
        meetingService.addMeeting(Meeting)
            .then(() => {
                navigate("/Meetings");
            })
            .catch(err => alert(err.message));
    }

    return (
        <div className="AddMeeting">

            <h2>Add Meeting</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Meeting Type: </label>
                <select defaultValue="" {...register("meetings_type_id")} required>
                    <option disabled value=""></option>
                    {MeetingsType.map(c => <option key={c.meetings_type_id} value={c.meetings_type_id}>{c.meetings_type}</option>)}
                </select>

                <label>Organizer: </label>
                <select defaultValue="" {...register("organizer_id")} required>
                    <option disabled value=""></option>
                    {organizers.map(c => <option key={c.organizer_id} value={c.organizer_id}>{c.organizer_name}</option>)}
                </select>


                <label>Meeting Start: </label>
                <input type="datetime-local" {...register("meeting_start")} required />



                <label>Meeting End: </label>
                <input type="datetime-local" {...register("meeting_end")} required />


                <label>client: </label>
                <input type="client" {...register("client")} />

                <button className="add-button">Add</button>

            </form>

        </div>
    );
}

export default AddMeeting;