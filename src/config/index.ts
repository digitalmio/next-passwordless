export interface IConfig {
  secret: string;
  rootUrl: string;
  linkExpiry?: string;
  showLinkOnDev?: boolean;
  sendEmailsOnDev?: boolean;
}

export const defaultConfig: Required<IConfig> = {
  secret: '',
  rootUrl: '',
  linkExpiry: '1h',
  showLinkOnDev: true,
  sendEmailsOnDev: false,
};
