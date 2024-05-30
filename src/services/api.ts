import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
// import { ErrorCode } from '../enums'; // 경로가 올바른지 확인하세요

// services
import { cookieStorage, COOKIE_KEYS } from './cookie';

// API 응답 타입 정의
interface ApiResponse {
  code?: number;
  message?: string;
  [key: string]: any;
}

// 에러 메시지를 추출하는 함수
export const extractErrorMsg = (error: AxiosError): string => {
  if (!error.response) {
    return '서버에 접속할 수 없습니다';
  }
  return (error.response.data as ApiResponse).message || '에러 발생';
};

const source = axios.CancelToken.source();

// 사용자 토큰을 지우는 함수
export const clearUserToken = (): void => {
  cookieStorage.clearAllCookie();
};

// AxiosError 타입 가드
const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError === true;
};

class AxiosInstanceCreator {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.defaults.cancelToken = source.token;
    this.interceptors();
  }

  private interceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = cookieStorage.getCookie(COOKIE_KEYS.ACCESS_TOKEN);

        // 새로운 config 객체 생성
        const newConfig = { ...config };

        if (!newConfig.headers.Authorization) {
          if (token && token !== 'undefined' && token !== undefined) {
            newConfig.headers.Authorization = `Bearer ${token}`;
          }
        }

        if (!newConfig.headers['Content-Type']) {
          newConfig.headers['Content-Type'] = 'application/json';
        }

        return newConfig;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse): AxiosResponse => {
        const data = res.data as ApiResponse;
        if (data.code && data.code !== 200) {
          throw new Error(data.message);
        }

        return res;
      },
      (error: any): Promise<any> => {
        if (axios.isCancel(error)) {
          clearUserToken();
          return Promise.reject(error);
        }

        if (isAxiosError(error) && error.response) {
          const responseData = error.response.data as ApiResponse;

          const result = {
            ...responseData,
            message: extractErrorMsg(error),
          };

          return Promise.reject(result);
        }

        const result = {
          message: extractErrorMsg(error),
        };

        return Promise.reject(result);
      },
    );
  }

  public create(): AxiosInstance {
    return this.instance;
  }
}

export default AxiosInstanceCreator;
