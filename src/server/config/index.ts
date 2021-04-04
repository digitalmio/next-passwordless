import ms from 'ms';
export interface IConfig {
  secret: string;
  rootUrl: string;
  linkExpiry?: string | number;
  showLinkOnDev?: boolean;
  sendEmailsOnDev?: boolean;
  cookieMaxAge?: string | number;
  cookieName?: string;
  cookieSecret?: string;
  redirectPath?: string;
}

const defaultConfig: Required<IConfig> = {
  secret: '',
  rootUrl: '',
  linkExpiry: '1h',
  showLinkOnDev: true,
  sendEmailsOnDev: false,
  cookieMaxAge: '8h',
  cookieName: 'authToken',
  cookieSecret: '',
  redirectPath: '/',
};

export const parseConfig = (userConfig: IConfig): Required<IConfig> => {
  // this is required by Hapi/Iron
  if (userConfig.secret.length < 32)
    throw new Error('Secret string too short (min 32 characters required)');
  if (userConfig.cookieSecret && userConfig.cookieSecret.length < 32)
    throw new Error('Cookie Secret string too short (min 32 characters required)');

  // merge userConfig with defaults
  const config = { ...defaultConfig, ...userConfig };

  // parse cookieMaxAge and linkExpiry
  config.cookieMaxAge = ms(config.cookieMaxAge + '');
  if (typeof config.linkExpiry === 'number') config.linkExpiry = config.linkExpiry + '';

  // use same secret for JWT and cookie when no cookieSecret specified
  if (!config.cookieSecret) config.cookieSecret = config.secret;

  return config;
};
