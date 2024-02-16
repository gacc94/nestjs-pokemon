export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3002,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/pokemon',
  JWT_SECRET: process.env.JWT_SECRET || '<KEY>',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '30d',
  DEFAULT_LIMIT: process.env.DEFAULT_LIMIT || 7,
});