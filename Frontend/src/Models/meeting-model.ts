class meetingModel {
    meeting_id: number;
    meetings_type_id: number;
    meetings_type?: string;
    organizer_id: number;
    meeting_start: string;
    meeting_end: string;
    client: string;

    public constructor(meeting: meetingModel) {
        this.meeting_id = meeting.meeting_id;
        this.meetings_type_id = meeting.meetings_type_id;
        this.organizer_id = meeting.organizer_id;
        this.meeting_start = meeting.meeting_start;
        this.meeting_end = meeting.meeting_end;
        this.client = meeting.client;

    }

}



export default meetingModel;