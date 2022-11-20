class Config {
    public meetingsTypeURL = "";
    public meetingsURL = "";
    public meetingsByOrganizerUrl = "";
    public organizersURL = ""
}

class DevelopmentConfig extends Config {
    public meetingsTypeURL = "http://localhost:3002/api/meetings-type";
    public meetingsByOrganizerUrl = "http://localhost:3002/api/meetings-by-organizer/";
    public meetingsURL = "http://localhost:3002/api/meetings/";
    public organizersURL = "http://localhost:3002/api/organizers/";
}

class ProductionConfig extends Config {
    public meetingsTypeURL = `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/meetings-type/`;
    public meetingsByOrganizerUrl = `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/meetings-by-organizer/`;
    public meetingsURL = `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/meetings/`;
    public organizersURL = `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/organizers/`;
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

console.log(config.meetingsURL);

export default config;
