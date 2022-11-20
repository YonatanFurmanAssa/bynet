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
    public sqlHost = "54.227.120.82";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "bynet2"; // Database Name
    public dbPort = 3306;
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public sqlHost = process.env.SQL_HOST;
    public sqlUser = process.env.SQL_USER;
    public sqlPassword = process.env.SQL_PASSWORD;
    public sqlDatabase = process.env.SQL_DATABASE;
    public dbPort = +process.env.SQL_PORT;
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
