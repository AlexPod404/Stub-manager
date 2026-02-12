import { Application, Request, Response } from 'express';

export interface RouteConfig {
  path: string;
  method: string;
  delayMs?: number;
  conditions?: any[];
  defaultResponse?: any;
}

export class RestProtocolHandler {
  constructor(private app: Application) {}

  registerRoute(config: RouteConfig): void {
    const method = config.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
    
    this.app[method](config.path, async (req: Request, res: Response) => {
      // Apply delay if configured
      if (config.delayMs && config.delayMs > 0) {
        await this.sleep(config.delayMs);
      }

      // Evaluate conditions
      const response = this.evaluateConditions(req, config);

      // Send response
      res.status(response.statusCode || 200).json(response.body);
    });
  }

  private evaluateConditions(req: Request, config: RouteConfig): any {
    if (!config.conditions || config.conditions.length === 0) {
      return config.defaultResponse || { message: 'Default response' };
    }

    // TODO: Implement condition evaluation
    // For now, return default response
    return config.defaultResponse || { message: 'Default response' };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
