interface EnvironmentProp {
    name: string;
    hostname: string;
    remote_server_url: string;
    version: number;
    postgresql_url: string;
    mongodb_url: string;
    firebase_config: {};

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
        firebase_config: {
            "type": "service_account",
            "project_id": "capshot",
            "private_key_id": "d4baaa94fa18ef4fcb732a990fc0666771b492a9",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDr4qm7NylV0VeI\nirKcDpRE9pGTHfqqSJqHP2lirrh+zLCQy3Zson3Q1eDh2dnIpyEdNRmvkZhunBDX\nMYDNJO5j3dF02BWbesZni27bCp0Sy3CJZmj+/Pf0BFAaPsvhRwf/G79X1HiMCPRL\nvmCTMI9pWAqRyH/ptGPy4F897+R8IePiKKKT+8foluyKz/LVo6a90Gns9rK98Jnd\nh453UF1/Zxe39StSnKrGbl6bMzjUp7c/dFWxPMLf6pc+gQs8z+Ct1OBQyy40Pm/R\naoa/o1ZxCCcfxmPq4a3Mj7rDq6A6/MEdGSnlkvjUJ6v9Ms9sGAMcyuFfwLP6jnod\nkHv+nNM5AgMBAAECggEABbHn+6ViCdifRqRkmghvE3gpfRYK9HwCwROqmW+S9DrA\nY4qJ/ibxJy7WulUuYR4J2mDrERZQihEaBfwDulAzMjWLhkjmQqX07tCKuV6Y+rhv\nK94NWGSmnt1QysVr2jFDE+lpVfdC/syDi2WaAsu4FqjBvpHK5stMY3N/0Si+yTFj\nZxCUf8/wB4bYx8lBeaNESMueKUnYECK7cFxAIFscgWKrp3TeGa6slm/TPshJUPF9\nF//+d3lYF1qKSVO5kPzFFp8pI//m/i6ROwUMu1geeeIJPlkVDFihFmkO5MAOzQWR\nmrdPK9uO1YDYpUSOZJK/QAV6pyz2DYJjnH3Fc+KLYQKBgQD6zY2pto9gla6619iF\nfrwHG4IVQqW9SeEz08uEyv/iuWjdz2kXkvwe2/IR/j7rWNj0B8p2uAufGqxwiSgp\ncgGzCuZt3V5KqxM5uEwuBjWcA/oIAckZUbM56ozv20D+qk5JR4FnyfeavolIJuf4\nphmGTKazIVBGc3vIrLthXavTiQKBgQDwxfnQZKdc7y4znn5cu3Ytb+w1iPH4AUJk\ncg/Ez+lG4NKTXER5REuFJJ/dXJhjIIGKOh3iIjJ2x5ulX/VGJs/yHQvZ7uiKsmBV\nrKusl3nPnu0tAoMxiB+zGQm9tk70twHvElIAnVRO/Las8y43OQH0S6zUI7l7U07c\nf19d6PsmMQKBgQCteBkgpl2a70zQfNSM2PCSdetOay+ZsgzqvPYKXiIInjczG+9T\nV928NmLDIThBrc05VF4sKPYY0OkuWR+HMwyL2uEwYimCubrtdFR0jOTtiS6Z9Soz\nsfel+l4K1Hqq6f6F3shZki8JP/pSBl7x82i6JDA0u7j7UYrvbNGZ8aEUCQKBgQC4\n8ChhdF7FWIZRaeU/j1JHtldmC4loaHc5tg78qoJRSfEU9WM3Dkk/vJD6s9vtEBPQ\nO7Gmd4PxjoK0NQ+t0bQaEUuAGy0NE9RBGn9G85bB7h3ZW7uvuRI4O/wqdzUQbN2U\nZ6sLA821WhFqqOOP0T76CYJ38/TNkIDbhw6WkJUQkQKBgHFIXg7XeS/3k+vJBsO7\nVKpHfp5T4itJWKKaCcN7o3s65SQxfeqwyUWcZu/3AhVwDomhTAc51DOahPh9EgiL\nAID4OtkkX2n6MWpSHbX4mJYqhMqMtMWeUyJDc25rf2YmMl1JyTBPmwCFto7eS/Hh\nWT7SuDbSMlnwmnTL0WoXfPyE\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-6fk6p@capshot.iam.gserviceaccount.com",
            "client_id": "103242054228797542215",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6fk6p%40capshot.iam.gserviceaccount.com"
        }
    },
    staging: {
        name: 'staging',
        hostname: 'localhost:3000',
        remote_server_url: 'test.capshot.xyz',
        version: 1,
        postgresql_url: 'postgres://admin:capshot2019@172.31.12.62:5432/capshot_test',
        mongodb_url: 'mongodb+srv://admin:capshot_admin@2019@capshot-ixkc1.mongodb.net/capshot?retryWrites=true&w=majority',
        firebase_config: {
            "type": "service_account",
            "project_id": "capshot",
            "private_key_id": "d4baaa94fa18ef4fcb732a990fc0666771b492a9",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDr4qm7NylV0VeI\nirKcDpRE9pGTHfqqSJqHP2lirrh+zLCQy3Zson3Q1eDh2dnIpyEdNRmvkZhunBDX\nMYDNJO5j3dF02BWbesZni27bCp0Sy3CJZmj+/Pf0BFAaPsvhRwf/G79X1HiMCPRL\nvmCTMI9pWAqRyH/ptGPy4F897+R8IePiKKKT+8foluyKz/LVo6a90Gns9rK98Jnd\nh453UF1/Zxe39StSnKrGbl6bMzjUp7c/dFWxPMLf6pc+gQs8z+Ct1OBQyy40Pm/R\naoa/o1ZxCCcfxmPq4a3Mj7rDq6A6/MEdGSnlkvjUJ6v9Ms9sGAMcyuFfwLP6jnod\nkHv+nNM5AgMBAAECggEABbHn+6ViCdifRqRkmghvE3gpfRYK9HwCwROqmW+S9DrA\nY4qJ/ibxJy7WulUuYR4J2mDrERZQihEaBfwDulAzMjWLhkjmQqX07tCKuV6Y+rhv\nK94NWGSmnt1QysVr2jFDE+lpVfdC/syDi2WaAsu4FqjBvpHK5stMY3N/0Si+yTFj\nZxCUf8/wB4bYx8lBeaNESMueKUnYECK7cFxAIFscgWKrp3TeGa6slm/TPshJUPF9\nF//+d3lYF1qKSVO5kPzFFp8pI//m/i6ROwUMu1geeeIJPlkVDFihFmkO5MAOzQWR\nmrdPK9uO1YDYpUSOZJK/QAV6pyz2DYJjnH3Fc+KLYQKBgQD6zY2pto9gla6619iF\nfrwHG4IVQqW9SeEz08uEyv/iuWjdz2kXkvwe2/IR/j7rWNj0B8p2uAufGqxwiSgp\ncgGzCuZt3V5KqxM5uEwuBjWcA/oIAckZUbM56ozv20D+qk5JR4FnyfeavolIJuf4\nphmGTKazIVBGc3vIrLthXavTiQKBgQDwxfnQZKdc7y4znn5cu3Ytb+w1iPH4AUJk\ncg/Ez+lG4NKTXER5REuFJJ/dXJhjIIGKOh3iIjJ2x5ulX/VGJs/yHQvZ7uiKsmBV\nrKusl3nPnu0tAoMxiB+zGQm9tk70twHvElIAnVRO/Las8y43OQH0S6zUI7l7U07c\nf19d6PsmMQKBgQCteBkgpl2a70zQfNSM2PCSdetOay+ZsgzqvPYKXiIInjczG+9T\nV928NmLDIThBrc05VF4sKPYY0OkuWR+HMwyL2uEwYimCubrtdFR0jOTtiS6Z9Soz\nsfel+l4K1Hqq6f6F3shZki8JP/pSBl7x82i6JDA0u7j7UYrvbNGZ8aEUCQKBgQC4\n8ChhdF7FWIZRaeU/j1JHtldmC4loaHc5tg78qoJRSfEU9WM3Dkk/vJD6s9vtEBPQ\nO7Gmd4PxjoK0NQ+t0bQaEUuAGy0NE9RBGn9G85bB7h3ZW7uvuRI4O/wqdzUQbN2U\nZ6sLA821WhFqqOOP0T76CYJ38/TNkIDbhw6WkJUQkQKBgHFIXg7XeS/3k+vJBsO7\nVKpHfp5T4itJWKKaCcN7o3s65SQxfeqwyUWcZu/3AhVwDomhTAc51DOahPh9EgiL\nAID4OtkkX2n6MWpSHbX4mJYqhMqMtMWeUyJDc25rf2YmMl1JyTBPmwCFto7eS/Hh\nWT7SuDbSMlnwmnTL0WoXfPyE\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-6fk6p@capshot.iam.gserviceaccount.com",
            "client_id": "103242054228797542215",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6fk6p%40capshot.iam.gserviceaccount.com"
        }
    },
    production: {
        name: 'production',
        hostname: 'localhost:3000',
        remote_server_url: 'api.capshot.xyz',
        version: 1,
        postgresql_url: 'postgres://shubhankar:shubh0502@capshottest.cx8tjkw161jy.ap-south-1.rds.amazonaws.com:5432/capshot',
        mongodb_url: 'mongodb+srv://admin:capshot_admin@2019@capshot-ixkc1.mongodb.net/capshot?retryWrites=true&w=majority',
        firebase_config: {
            "type": "service_account",
            "project_id": "capshot",
            "private_key_id": "d4baaa94fa18ef4fcb732a990fc0666771b492a9",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDr4qm7NylV0VeI\nirKcDpRE9pGTHfqqSJqHP2lirrh+zLCQy3Zson3Q1eDh2dnIpyEdNRmvkZhunBDX\nMYDNJO5j3dF02BWbesZni27bCp0Sy3CJZmj+/Pf0BFAaPsvhRwf/G79X1HiMCPRL\nvmCTMI9pWAqRyH/ptGPy4F897+R8IePiKKKT+8foluyKz/LVo6a90Gns9rK98Jnd\nh453UF1/Zxe39StSnKrGbl6bMzjUp7c/dFWxPMLf6pc+gQs8z+Ct1OBQyy40Pm/R\naoa/o1ZxCCcfxmPq4a3Mj7rDq6A6/MEdGSnlkvjUJ6v9Ms9sGAMcyuFfwLP6jnod\nkHv+nNM5AgMBAAECggEABbHn+6ViCdifRqRkmghvE3gpfRYK9HwCwROqmW+S9DrA\nY4qJ/ibxJy7WulUuYR4J2mDrERZQihEaBfwDulAzMjWLhkjmQqX07tCKuV6Y+rhv\nK94NWGSmnt1QysVr2jFDE+lpVfdC/syDi2WaAsu4FqjBvpHK5stMY3N/0Si+yTFj\nZxCUf8/wB4bYx8lBeaNESMueKUnYECK7cFxAIFscgWKrp3TeGa6slm/TPshJUPF9\nF//+d3lYF1qKSVO5kPzFFp8pI//m/i6ROwUMu1geeeIJPlkVDFihFmkO5MAOzQWR\nmrdPK9uO1YDYpUSOZJK/QAV6pyz2DYJjnH3Fc+KLYQKBgQD6zY2pto9gla6619iF\nfrwHG4IVQqW9SeEz08uEyv/iuWjdz2kXkvwe2/IR/j7rWNj0B8p2uAufGqxwiSgp\ncgGzCuZt3V5KqxM5uEwuBjWcA/oIAckZUbM56ozv20D+qk5JR4FnyfeavolIJuf4\nphmGTKazIVBGc3vIrLthXavTiQKBgQDwxfnQZKdc7y4znn5cu3Ytb+w1iPH4AUJk\ncg/Ez+lG4NKTXER5REuFJJ/dXJhjIIGKOh3iIjJ2x5ulX/VGJs/yHQvZ7uiKsmBV\nrKusl3nPnu0tAoMxiB+zGQm9tk70twHvElIAnVRO/Las8y43OQH0S6zUI7l7U07c\nf19d6PsmMQKBgQCteBkgpl2a70zQfNSM2PCSdetOay+ZsgzqvPYKXiIInjczG+9T\nV928NmLDIThBrc05VF4sKPYY0OkuWR+HMwyL2uEwYimCubrtdFR0jOTtiS6Z9Soz\nsfel+l4K1Hqq6f6F3shZki8JP/pSBl7x82i6JDA0u7j7UYrvbNGZ8aEUCQKBgQC4\n8ChhdF7FWIZRaeU/j1JHtldmC4loaHc5tg78qoJRSfEU9WM3Dkk/vJD6s9vtEBPQ\nO7Gmd4PxjoK0NQ+t0bQaEUuAGy0NE9RBGn9G85bB7h3ZW7uvuRI4O/wqdzUQbN2U\nZ6sLA821WhFqqOOP0T76CYJ38/TNkIDbhw6WkJUQkQKBgHFIXg7XeS/3k+vJBsO7\nVKpHfp5T4itJWKKaCcN7o3s65SQxfeqwyUWcZu/3AhVwDomhTAc51DOahPh9EgiL\nAID4OtkkX2n6MWpSHbX4mJYqhMqMtMWeUyJDc25rf2YmMl1JyTBPmwCFto7eS/Hh\nWT7SuDbSMlnwmnTL0WoXfPyE\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-6fk6p@capshot.iam.gserviceaccount.com",
            "client_id": "103242054228797542215",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6fk6p%40capshot.iam.gserviceaccount.com"
        }
    }
};

const currentEnvironment: string = typeof process.env.NODE_ENV == 'string' && process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';


// @ts-ignore
const environmentToExport: EnvironmentProp = process.env.NODE_ENV && typeof environment[currentEnvironment] === 'object' ? environment[currentEnvironment] : environment.development;

export = environmentToExport;