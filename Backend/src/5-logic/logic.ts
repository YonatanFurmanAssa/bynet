import type { OkPacket } from "mysql2";
import dal from "../2-utils/dal"
import meetingModel from "../4-models/meeting-model";
import organizerModel from "../4-models/organizer-model";

async function getAllMeetings(): Promise<meetingModel[]> {
    const sql = `SELECT * FROM meetings, meetings_type WHERE meetings.meetings_type_id = meetings_type.meetings_type_id`;
    const meetings = await dal.execute(sql);
    return meetings;
}

async function getMeetingsByType(meetings_type_id: number): Promise<meetingModel[]> {
    const sql = "SELECT * FROM meetings WHERE meetings_type_id = " + meetings_type_id;
    const meetings = await dal.execute(sql);
    return meetings;
}

async function getMeetingsByOrganizer(organizer_id: number): Promise<meetingModel[]> {
    const sql = "SELECT * FROM meetings, meetings_type WHERE meetings.meetings_type_id = meetings_type.meetings_type_id AND meetings.organizer_id = " + organizer_id;
    const meetings = await dal.execute(sql);
    return meetings;
}

async function getAllOrganizers(): Promise<organizerModel[]> {
    const sql = `SELECT * FROM organizers`;
    const organizers = await dal.execute(sql)
    return organizers
}

async function getAllMeetingsType(): Promise<meetingModel[]> {
    const sql = "SELECT * FROM meetings_type ";
    const meetings = await dal.execute(sql);
    return meetings;
}

async function addMeeting(meeting: meetingModel): Promise<meetingModel> {
    const sql = "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ?)";
    const values = [meeting.meetings_type_id, meeting.organizer_id, meeting.meeting_start, meeting.meeting_end, meeting.client];
    const result: OkPacket = await dal.execute(sql, values);
    meeting.meeting_id = result.insertId;
    return meeting;
}


async function deleteMeetingsByMeetingsId(id: number) {
    const sql = "DELETE FROM meetings WHERE id = " + id;
    await dal.execute(sql);
}

export default {
    getAllMeetings,
    addMeeting,
    getMeetingsByType,
    getMeetingsByOrganizer,
    getAllMeetingsType,
    deleteMeetingsByMeetingsId,
    getAllOrganizers
};