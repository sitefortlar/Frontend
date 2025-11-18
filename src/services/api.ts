import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { baseUrl, paths } from '../routes/paths';

const root: string = import.meta.env.VITE_API_URL || 'https://backend-zuzf.onrender.com/api';

export const api: AxiosInstance = axios.create({
  baseURL: root
});

const fetchIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Failed to fetch IP', error);
    return '127.0.0.1'; // fallback IP
  }
};

export function getHeaders() {
  const token = localStorage.getItem('auth_token');
  const clientId = localStorage.getItem('selected_client_id');
  const sentBy = 'system';

  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { ClientId: clientId }),
    SentBy: sentBy
  };
}

export function apiHandleError(error: AxiosError): void {
  const status = error?.response?.status;
  const url = error?.config?.url;

  // Don't redirect to login if the error is from the login endpoint itself
  if (status === 401 && url && !url.includes('/auth/login')) {
    localStorage.clear();
    window.location.href = (baseUrl + paths.login).replace('//', '/');
  }
}

api.interceptors.request.use(
  config => {
    const { Authorization, ClientId, SentBy } = getHeaders();

    if (Authorization) config.headers!.Authorization = Authorization;
    if (ClientId) config.headers!.ClientId = ClientId;
    if (SentBy) config.headers!.SentBy = SentBy;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    apiHandleError(error);
    return Promise.reject(error);
  }
);

const rootUrl = root.endsWith('/') ? root.slice(0, -1) : root;

export const stream = {
  post: async (
    endpoint: string,
    data: Record<string, unknown> | FormData,
    extraHeaders: Record<string, string> = {}
  ): Promise<{ headers: Headers; stream?: ReadableStream<unknown> }> => {
    const ip = await fetchIP();
    const isFormData = data instanceof FormData;

    const headers: Record<string, string> = {
      ...getHeaders(),
      ...extraHeaders,
      Accept: 'text/event-stream',
      ClientIp: ip
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const body = isFormData ? data : JSON.stringify({ ...data, client_ip: ip });

    return new Promise((resolve, reject) => {
      fetch(`${rootUrl}${endpoint}`, {
        method: 'POST',
        body,
        headers
      })
        .then(response => {
          if (!response.body) return;

          const result = response.body
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(
              new TransformStream({
                transform(chunk, controller) {
                  chunk
                    .slice(6, chunk.length - 2)
                    .split('\n\ndata: ')
                    .forEach((item: string) => {
                      controller.enqueue(JSON.parse(item));
                    });
                }
              })
            );

          resolve({ headers: response.headers, stream: result });
        })
        .catch(error => {
          apiHandleError(error);
          reject(error);
        });
    });
  }
};
