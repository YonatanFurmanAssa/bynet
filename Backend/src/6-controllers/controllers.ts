import express, { NextFunction, Request, Response } from "express";
import meetingModel from "../4-models/meeting-model";
import logic from "../5-logic/logic";

const router = express.Router();

router.get("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meetings = await logic.getAllMeetings();

        response.json(meetings);
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/meetings-type", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meetings = await logic.getAllMeetingsType();
        response.json(meetings);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/meetings-by-organizer/:organizer_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const organizerId = +request.params.organizer_id;
        const meetings = await logic.getMeetingsByOrganizer(organizerId);
        response.json(meetings);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/organizers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const organizers = await logic.getAllOrganizers();
        response.json(organizers);
    }

    catch (error) {
        next(error);
    }
})


router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting = new meetingModel(request.body);
        const addedMeeting = await logic.addMeeting(meeting);
        response.status(201).json(addedMeeting);
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/meetings/:meeting_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting_id = +request.params.meeting_id;
        await logic.deleteMeetingsByMeetingsId(meeting_id);
        response.sendStatus(204);
    } catch (err) {
        next(err)
    }
})

export default router;
