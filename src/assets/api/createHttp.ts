type Source = Record<string, unknown>;

export enum RequestContentType {
  JSON = 'application/json',
  FormData = 'multipart/form-data',
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const ROOT_URL = 'http://localhost:3000/api';

const defaultConfig = {
  contentType: RequestContentType.JSON,
};

const createUrl = <S extends Source>(
  pathname: string,
  method: Method,
  source?: S,
) => {
  const url = `${ROOT_URL}${pathname}`;

  if (method !== 'GET') return url;

  const urlSearchParams = new URLSearchParams();

  Object.entries(source || {}).forEach(([key, value]) => {
    if (value !== '' && value != null && typeof value !== 'object') {
      urlSearchParams.append(key, String(value));
    }
  });

  return `${url}?${urlSearchParams.toString()}`;
};

const createHttp =
  (method: Method) =>
  async <S extends Source>(
    pathname: string,
    source?: S,
    { contentType } = defaultConfig,
  ) => {
    const token = '';
    const requestInit: RequestInit = { method };
    const headers = new Headers();

    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', contentType);

    if (contentType === RequestContentType.FormData && source) {
      const formData = new FormData();

      headers.delete('Content-Type');

      Object.entries(source).forEach(([key, value]) => {
        formData.append(key, value instanceof Blob ? value : String(value));
      });
      requestInit.body = formData;
    } else if (method !== 'GET') {
      requestInit.body = JSON.stringify(source);
    }

    requestInit.headers = headers;

    try {
      const url = createUrl(pathname, method, source);
      const response = await fetch(url, requestInit);
      const responseType = response.headers.get('Content-Type');

      if (response.status >= 400) throw response;

      if (responseType === 'application/json') {
        const data = await response.json();

        console.log(data);
      }

      const disposition = response.headers.get('Content-Disposition');

      if (disposition) {
        const filename = /filename=(.*)/.exec(disposition)?.[1];
        const blob = await response.blob();

        console.log(filename, blob);
      }
    } catch (error) {
      if (error instanceof Response) {
        throw await error.json();
      }
      throw error;
    }
  };

const http = {
  get: createHttp(Method.GET),
  post: createHttp(Method.POST),
  put: createHttp(Method.PUT),
  delete: createHttp(Method.DELETE),
};

export default http;
