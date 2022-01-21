import { environment } from '../../environments/environment';
import { InjectionToken } from '@angular/core';

const apiUrl = environment.apiUrl;
export let APP_CONFIG = new InjectionToken('./app.config');

export interface IAppConfig {
  endpoints: any;
}

export const AppConfig: IAppConfig = {
  endpoints: {
    auth: {
      login: `${apiUrl}/auth/login`,
    },
    helpers: {
      encode: `${apiUrl}/helpers/encode`,
      generateJSON: `${apiUrl}/helpers/generate-json`,
    },
  },
};
