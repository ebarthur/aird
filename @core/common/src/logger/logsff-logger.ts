import { isProduction } from '@app/common/config/environment';
import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Log, send } from '../helpers/logsff-client';

@Injectable({ scope: Scope.REQUEST })
export class LogsffLogger implements LoggerService {
  private context: string;
  private appId: string;
  private enabledLevels: string[];

  constructor(context: string = 'App') {
    this.context = context;
    this.appId = process.env.LOGSFF_APP_ID!;
    this.enabledLevels = isProduction
      ? ['error', 'log', 'warn']
      : ['log', 'warn', 'debug', 'error', 'verbose'];
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string) {
    if (this.enabledLevels.includes('log')) {
      this.sendLog('info', message, context);
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (this.enabledLevels.includes('error')) {
      this.sendLog('error', message, context, { trace });
    }
  }

  warn(message: any, context?: string) {
    if (this.enabledLevels.includes('warn')) {
      this.sendLog('warn', message, context);
    }
  }

  debug?(message: any, context?: string) {
    if (this.enabledLevels.includes('debug')) {
      this.sendLog('info', message, context);
    }
  }

  verbose?(message: any, context?: string) {
    if (this.enabledLevels.includes('verbose')) {
      this.sendLog('info', message, context);
    }
  }

  private sendLog(
    level: 'info' | 'error' | 'warn',
    message: any,
    context?: string,
    meta: Record<string, any> = {},
  ) {
    if (!this.enabledLevels.includes(level === 'info' ? 'log' : level)) return;

    const logMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    console.log(
      `[${context || this.context}] ${level.toUpperCase()} - ${logMessage}`,
    );

    if (!isProduction) return;

    const log: Log = {
      type: 'app',
      appId: this.appId,
      level,
      message: logMessage,
      timestamp: Date.now(),
      meta: {
        context: context || this.context,
        ...meta,
      },
    };

    send(log).catch((error) => {
      console.error(`Failed to send app log to logsff: ${error.message}`);
    });
  }
}
