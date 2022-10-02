import Joi from "joi";

class meetingModel {
    meeting_id: number;
    meetings_type_id: number;
    organizer_id: number;
    meeting_start: string;
    meeting_end: string;
    description: string;
    client: string;
    constructor(meeting: meetingModel) {
        this.meeting_id = meeting.meeting_id
        this.meetings_type_id = meeting.meetings_type_id
        this.organizer_id = meeting.organizer_id
        this.meeting_start = meeting.meeting_start
        this.meeting_end = meeting.meeting_end
        this.description = meeting.description
        this.client = meeting.client
    }

    public static postValidationSchema = Joi.object({
        meeting_id: Joi.forbidden(),
        meetings_type_id: Joi.number().required().integer(),
        organizer_id: Joi.number().required().integer(),
        meeting_start: Joi.string().required().min(8),
        meeting_end: Joi.string().required().min(8),
        description:Joi.string().required().min(4).max(100),
        client: Joi.string().optional().min(2).max(30)

    });

    public validatePost(): string {
        const result = meetingModel.postValidationSchema.validate(this);
        return result.error?.message;
    }
}


export default meetingModel