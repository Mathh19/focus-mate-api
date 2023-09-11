export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export enum HttpStatusCode {
  SUCCESSFUL = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  CREATED = 201
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}