import ms from 'ms';
interface IConfigShared {
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

interface IConfigOptionals {
  generateEmailContent?: (code: string, link: string) => Promise<void>;
  sendEmail?: (destination: string, html: string, text: string) => Promise<void>;
}
export interface IConfig extends IConfigShared, IConfigOptionals {}
export interface IConfigWithDefaults extends Required<IConfigShared>, IConfigOptionals {}

const defaultConfig: IConfigWithDefaults = {
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

export const parseConfig = (userConfig: IConfig): IConfigWithDefaults => {
  // this is required by Hapi/Iron, secret must be min 32 characters
  if (!userConfig.cookieSecret && userConfig.secret.length < 32)
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
