import meetingModel from "../../../../../../Models/meeting-model";
import meetingTypeModel from "../../../../../../Models/meetingType-model";

interface MeetingCardProps {
    meeting: meetingModel;
}


interface meetingTypeCardProps {
    props: meetingTypeModel
}




function MeetingCard(meeting: MeetingCardProps, meetingType: meetingTypeCardProps): JSX.Element {
    return (
        <div className="MeetingsCard">

            Meeting Type: {meeting.meeting.meetings_type}
            <br />


            Meeting Start Time: {new Date(meeting.meeting.meeting_start).toLocaleString()}
            <br />

            Meeting End Time: {new Date(meeting.meeting.meeting_end).toLocaleString()}
            <br />

            client: {meeting.meeting.client}


            <br />

        </div>
    );
}

export default MeetingCard;
