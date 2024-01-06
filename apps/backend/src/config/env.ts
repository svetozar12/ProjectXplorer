import * as envalid from 'envalid'

const envSchema = {
    API_KEY: envalid.str(),
    AUTH_DOMAIN: envalid.str(),
    PROJECT_ID: envalid.str(),
    STORAGE_BUCKET: envalid.str(),
    MESSAGING_SENDER_ID: envalid.str(),
    APP_ID: envalid.str(),
    MEASUREMENT_ID: envalid.str(),
    DEVELOPMENT_MONGO_URL: envalid.url({ default: 'mongodb://localhost:27017/development' }),
    TEST_MONGO_URL: envalid.url({ default: 'mongodb://localhost:27017/test' }),
    DEFAULT_PAGE: envalid.num({ default: 1 }),
    DEFAULT_LIMIT: envalid.num({ default: 10 })
};

export const env = envalid.cleanEnv(process.env, envSchema);

