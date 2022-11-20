class Config {
    public meetingsTypeURL = "";
    public meetingsURL = "";
    public meetingsByOrganizerUrl = "";
    public organizersURL = ""
}

class DevelopmentConfig extends Config {
    public meetingsTypeURL = "http://54.227.120.82:3002/api/meetings-type";
    public meetingsByOrganizerUrl = "http://54.227.120.82:3002/api/meetings-by-organizer/";
    public meetingsURL = "http://54.227.120.82:3002/api/meetings/";
    public organizersURL = "http://ec2-54-227-120-82.compute-1.amazonaws.com:3002/";
}

class ProductionConfig extends Config {
    public meetingsTypeURL = "http://54.227.120.82:3002/api/meetings-type";
    public meetingsByOrganizerUrl = "http://54.227.120.82:3002/api/meetings-by-organizer/";
    public meetingsURL = "http://54.227.120.82:3002/api/meetings/";
    public organizersURL = "http://ec2-54-227-120-82.compute-1.amazonaws.com:3002/";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

console.log(config.meetingsURL);

export default config;
