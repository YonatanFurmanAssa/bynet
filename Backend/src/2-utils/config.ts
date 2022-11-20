if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost = "";
    public sqlUser = "";
    public sqlPassword = "";
    public sqlDatabase = "";
    public dbPort = 3306;
    
}

class DevelopmentConfig extends Config {
    public port = 3002;
    public sqlHost = "http://ec2-54-227-120-82.compute-1.amazonaws.com";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "bynet2"; // Database Name
    public dbPort = 3306;
}

class ProductionConfig extends Config {
    public port = 3002;
    public sqlHost = "http://ec2-54-227-120-82.compute-1.amazonaws.com";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "bynet2"; 
    public dbPort = 3306;
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
