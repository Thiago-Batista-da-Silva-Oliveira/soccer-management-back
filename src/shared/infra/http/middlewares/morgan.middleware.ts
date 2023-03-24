import { Request, Response } from 'express';
import morgan, { TokenIndexer } from 'morgan';
import { LOG_LEVEL } from '../../../../config/constants';
import { logger } from '../../../utils/logger';


const stream = {
  write: (_message: string) => {
    const message = JSON.parse(_message);
    if (message.err_msg) {
      return logger.error('api', message);
    }
    return logger.info('api', message);
  },
};

// skip healthcheck endpoint
const skip = (req: Request, res: Response) => req.url === '/';

function jsonFormat(tokens: TokenIndexer<Request, Response>, req, res) {
  morgan.token('req-body', (req: Request) => {
    return Object.keys(req.body || {}).length ? req.body : undefined;
  });
  morgan.token('req-query', (req: Request) => {
    return Object.keys(req.query || {}).length ? (req.query as any) : undefined;
  });
  morgan.token('req-params', (req: Request) => {
    return Object.keys(req.params || {}).length
      ? (req.params as any)
      : undefined;
  });
  if (LOG_LEVEL === 0) {
    return JSON.stringify({
      ip: tokens['remote-addr'](req, res),
      device: tokens['device-info'](req, res),
      user_id: tokens['user-id'](req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      params: tokens['req-params'](req, res),
      query: tokens['req-query'](req, res),
      body: tokens['req-body'](req, res),
      status_code: tokens.status(req, res),
      err_msg: tokens['error-message'](req, res),
      err_trace: tokens['error-trace'](req, res),
      resp_time: `${tokens['response-time'](req, res)}ms`,
    });
  }
  if (LOG_LEVEL === 1) {
    return JSON.stringify({
      ip: tokens['remote-addr'](req, res),
      device: tokens['device-info'](req, res),
      user_id: tokens['user-id'](req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status_code: tokens.status(req, res),
      err_msg: tokens['error-message'](req, res),
      err_trace: tokens['error-trace'](req, res),
      resp_time: tokens['response-time'](req, res),
    });
  }
  if (LOG_LEVEL === 2) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status_code: tokens.status(req, res),
      err_msg: tokens['error-message'](req, res),
      err_trace: tokens['error-trace'](req, res),
      resp_time: `${tokens['response-time'](req, res)}ms`,
    });
  }

  return JSON.stringify({
    ip: tokens['remote-addr'](req, res),
    device: tokens['device-info'](req, res),
    user_id: tokens['user-id'](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    params: tokens['req-params'](req, res),
    query: tokens['req-query'](req, res),
    body: tokens['req-body'](req, res),
    status_code: tokens.status(req, res),
    err_msg: tokens['error-message'](req, res),
    err_trace: tokens['error-trace'](req, res),
    resp_time: tokens['response-time'](req, res),
  });
}

export const morganMiddleware = morgan(jsonFormat, { stream, skip });
