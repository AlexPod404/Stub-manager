import { Request, Response, Express } from 'express';

export class RestAdapter {
  constructor(private app: Express) {}

  initialize() {
    console.log('REST adapter initialized');
  }

  registerRoute(
    method: string,
    path: string,
    handler: (req: Request, res: Response) => void | Promise<void>,
  ) {
    const expressMethod = method.toLowerCase() as 'get' | 'post' | 'put' | 'patch' | 'delete';
    this.app[expressMethod](path, handler);
  }

  unregisterRoute(method: string, path: string) {
    // TODO: Implement route unregistration
    console.log(`Unregistering route: ${method} ${path}`);
  }
}
