import { SyntheticEvent, useEffect, useState } from "react";
import meetingModel from "../../../../../../../Models/meeting-model";
import meetingTypeModel from "../../../../../../../Models/meetingType-model";
import organizerModel from "../../../../../../../Models/organizer-model";
import meetingService from "../../../../../../../Services/meeting-service";
import MeetingCard from "../meetingCard";


function MeetingsList(): JSX.Element {


    const [organizer, setOrganizer] = useState<organizerModel[]>([]);
    const [meeting, setMeeting] = useState<meetingModel[]>([]);
    const [meetingsType,setMeetingType]=useState<meetingTypeModel[]>([]);
    useEffect(() => {
        meetingService.getAllMeetingsType()
            .then(MeetingsType => setMeetingType(MeetingsType))
            .catch(err => alert(err.message));
    }, []);

    useEffect(() => {
        meetingService.getAllOrganizers()
            .then(organizers => setOrganizer(organizers))
            .catch(err => alert(err.message));
    }, []);

    function displayMeetings(args: SyntheticEvent) {
        const select = args.target as HTMLSelectElement;
        const organizerId = +select.value;
        meetingService.getMeetingsByOrganizer(organizerId)
            .then(meeting => setMeeting(meeting))
            .catch(err => alert(err.message));
    }

    return (
        <div className="MeetingList">

            <label>Select organizer: </label>
            <select defaultValue="0" onChange={displayMeetings}>
                <option disabled value="0"></option>
                {organizer.map(c => <option key={c.organizer_id} value={c.organizer_id}>{c.organizer_name}</option>)}
            </select>
            <br />
            {meeting.map(p => <MeetingCard  key={p.meeting_id} meeting={p}  />)}

        </div>
    );
}

export default MeetingsList;