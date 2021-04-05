import { IConfigWithDefaults } from '../config';

export const logToken = (
  config: IConfigWithDefaults,
  data: {
    destination: string;
    token: string;
    code: string;
  }
) => {
  if (process.env.NODE_ENV === 'development' && config.showLinkOnDev)
    console.log(
      `🚀 Passwordless Magic URL (🔑 code: ${data.code}) for 😀 user ${data.destination} is ${config.rootUrl}api/auth/callback?token=${data.token}`
    );
};
