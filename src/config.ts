interface EnvironmentProp {
    name: string;
    hostname: string;
    remote_server_url: string;
    version: number;
    postgresql_url: string;
    mongodb_url: string;
    firebase_config?: {};

}

interface Environment {
    development: EnvironmentProp;
    staging: EnvironmentProp;
    production: EnvironmentProp;
}

const environment: Environment = {
    development: {
        name: 'development',
        hostname: 'localhost:3000',
        remote_server_url: 'localhost:4000',
        version: 1,
        postgresql_url: 'postgres://localhost:5432/capshot_dev',
        mongodb_url: 'mongodb+srv://admin:capshot_admin@2019@capshot-ixkc1.mongodb.net/capshot?retryWrites=true&w=majority',
    },
    staging: {
        name: 'staging',
        hostname: 'localhost:5000',
        remote_server_url: 'test.capshot.xyz',
        version: 1,
        postgresql_url: 'postgres://admin:capshot2019@test.capshot.xyz:5432/capshot_test',
        mongodb_url: 'mongodb+srv://admin:capshot_admin@2019@capshot-ixkc1.mongodb.net/capshot?retryWrites=true&w=majority'
    },
    production: {
        name: 'production',
        hostname: 'localhost:5001',
        remote_server_url: 'api.capshot.xyz',
        version: 1,
        postgresql_url: 'postgres://shubhankar:shubh0502@capshottest.cx8tjkw161jy.ap-south-1.rds.amazonaws.com:5432/capshot',
        mongodb_url: 'mongodb+srv://admin:capshot_admin@2019@capshot-ixkc1.mongodb.net/capshot?retryWrites=true&w=majority'
    }
};

const currentEnvironment: string = typeof process.env.NODE_ENV == 'string' && process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';


// @ts-ignore
const environmentToExport: EnvironmentProp = process.env.NODE_ENV && typeof environment[currentEnvironment] === 'object' ? environment[currentEnvironment] : environment.development;

export = environmentToExport;