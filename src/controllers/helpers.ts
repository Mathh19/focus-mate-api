import { HttpResponse, HttpStatusCode } from "./protocols";

export const successful = <T>(body: any): HttpResponse<T> => ({ statusCode: HttpStatusCode.SUCCESSFUL, body: body });

export const created = <T>(body: any): HttpResponse<T> => ({ statusCode: HttpStatusCode.CREATED, body: body });

export const badResquest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message
  }
}

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: 'Something went wrong!'
  }
}