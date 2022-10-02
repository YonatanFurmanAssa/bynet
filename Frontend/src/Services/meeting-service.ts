import axios from "axios";
import meetingModel from "../Models/meeting-model";
import meetingTypeModel from "../Models/meetingType-model";
import organizerModel from "../Models/organizer-model";
import config from "../Utils/Config";

class MeetingService {

    public async getAllMeetingsType(): Promise<meetingTypeModel[]> {
        const response = await axios.get<meetingTypeModel[]>(config.meetingsTypeURL);
        const meetingsType = response.data;
        return meetingsType;
    }

    public async getAllMeetings(): Promise<meetingModel[]> {
        const response = await axios.get<meetingModel[]>(config.meetingsURL);
        const servers = response.data;
        return servers;
    }
    public async getAllOrganizers(): Promise<organizerModel[]> {
        const response = await axios.get<organizerModel[]>(config.organizersURL);
        const organizers = response.data
        return organizers
    }
    public async getMeetingsByOrganizer(organizer_id: number): Promise<meetingModel[]> {
        const response = await axios.get<meetingModel[]>(config.meetingsByOrganizerUrl + organizer_id);
        const meetingsByOrganizer = response.data;
        return meetingsByOrganizer;
    }

    public async addMeeting(meeting: meetingModel): Promise<meetingModel> {
        const response = await axios.post<meetingModel>(config.meetingsURL, meeting);
        const addedMeeting = response.data;
        return addedMeeting;
    }

    public async deleteMeeting(meetings_id: number): Promise<void> {
        await axios.delete<meetingModel>(config.meetingsURL + meetings_id);
    }

}

const meetingService = new MeetingService();

export default meetingService;