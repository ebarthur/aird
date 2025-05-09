import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Log, send } from '../helpers/logsff-client';
import { isProduction } from '../config/environment';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  private appId = process.env.LOGSFF_APP_ID!;
  private excludedHeaders = ['authorization', 'cookie', 'set-cookie'];

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    const filteredHeaders: Record<string, string | string[] | undefined> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (!this.excludedHeaders.includes(key.toLowerCase())) {
        filteredHeaders[key] = value;
      }
    }

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const duration = Date.now() - startTime;

      const log: Log = {
        type: 'request',
        appId: this.appId,
        method,
        path: originalUrl,
        status: statusCode,
        timestamp: Date.now(),
        duration,
        meta: {
          ...filteredHeaders,
        },
      };

      const logMessage = `${method} ${originalUrl} ${statusCode} ${contentLength || 0} - ${duration}ms`;
      this.logger.log(logMessage);

      if (isProduction) {
        send(log).catch((error) => {
          this.logger.error(`Failed to send log to logsff: ${error.message}`);
        });
      }
    });

    next();
  }
}
