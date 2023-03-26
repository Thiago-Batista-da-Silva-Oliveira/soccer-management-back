export const { NODE_ENV } = process.env;
export const USER_REPOSITORY_KEY = 'UserRepository';
export const TEAM_REPOSITORY_KEY = 'TeamRepository';
export const PLAYER_REPOSITORY_KEY = 'PlayerRepository';
export const REFRESHTOKEN_REPOSITORY_KEY = 'RefreshTokenRepository';
export const FORGOT_PASSWORD_REPOSITORY_KEY = 'ForgotPasswordRepository';

export const CACHE_PROVIDER = 'CacheProvider';
export const MAIL_PROVIDER = 'MailProvider';
export const HASH_PROVIDER = 'HashProvider';

export const SENTRY_DNS=process.env.SENTRY_DNS
export const MAILTRAP_USER=process.env.MAILTRAP_USER
export const MAILTRAP_PASSWORD=process.env.MAILTRAP_PASSWORD

export const CACHE_TTL = {
  CHECK_PERIOD: 120,
};

export const SERVICE_NAME = process.env.SERVICE_NAME || 'soccer-management';
export const LOG_DIRNAME = process.env.LOG_DIRNAME || 'logs';
export const LOG_ENABLE_SAVE_FILE =
  process.env.LOG_ENABLE_SAVE_FILE === 'true' || NODE_ENV === 'development';
export const LOG_DISABLE_STDOUT = process.env.LOG_DISABLE_STDOUT === 'true';
export const LOG_MAX_SIZE = process.env.LOG_MAX_SIZE || null;
export const LOG_MAX_FILES = process.env.LOG_MAX_FILES || null;
export const LOG_DATE_PATTERN = process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD';
export const LOG_ZIPPED_ARCHIVE = process.env.LOG_ZIPPED_ARCHIVE === 'true';
export const LOG_LEVEL = Number(process.env.LOG_LEVEL) || 0;
