import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [key: string]: any;
}

const DEFAULT_OPTIONS: CookieOptions = {
  path: '/',
  secure: process.env.REACT_APP_BUILD_MODE === 'prod',
  sameSite: 'lax',
};

export const cookieStorage = {
  setCookie: (key: string, value: any, options?: CookieOptions): void => {
    cookies.set(key, value, { ...DEFAULT_OPTIONS, ...options });
  },

  getCookie: (key: string): string | undefined => {
    return cookies.get(key);
  },

  removeCookie: (key: string): void => {
    cookies.remove(key, { path: '/' });
  },

  clearAllCookie: (): void => {
    Object.values(COOKIE_KEYS).forEach((cookieKey) => {
      cookies.remove(cookieKey, { path: '/' });
    });
  },
};

const COOKIE_BASE_NAME = '4s';

export const COOKIE_KEYS = {
  ACCESS_TOKEN: `${COOKIE_BASE_NAME}_acst`,
  REFRESH_TOKEN: `${COOKIE_BASE_NAME}_rfst`,
  SAVE_USER_ID: `${COOKIE_BASE_NAME}_suid`,
  SAVE_WORKER_ID: `${COOKIE_BASE_NAME}_swid`,
  SAVE_TYPE: `${COOKIE_BASE_NAME}_type`,
  CERT: `${COOKIE_BASE_NAME}_cert`,
  MOBILE: `${COOKIE_BASE_NAME}_mobile`,
  LANGUAGE: `${COOKIE_BASE_NAME}_language`,
  USER_FILE_ID: `${COOKIE_BASE_NAME}_userFileId`,
  WORKER_FILE_ID: `${COOKIE_BASE_NAME}_workerFileId`,
  LOCAL_COLLAPSED: `${COOKIE_BASE_NAME}_collapsed`,
  LOCAL_MENU_COLLAPSED: `${COOKIE_BASE_NAME}_menu_collapsed`,
  LOCAL_MENU_COLLAPSED_KEY: `${COOKIE_BASE_NAME}_menu_collapsed_key`,
};
