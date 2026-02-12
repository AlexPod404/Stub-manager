import { Injectable } from '@nestjs/common';
import { Mock } from '../mocks/entities/mock.entity';
import { Route } from '../routes/entities/route.entity';

@Injectable()
export class GeneratorService {
  async generateMockCode(mock: Mock, routes: Route[]): Promise<string> {
    // TODO: Implement actual code generation logic
    const code = `
// Generated mock for: ${mock.name}
// Protocol: ${mock.protocol}
// Generated at: ${new Date().toISOString()}

const express = require('express');
const app = express();
app.use(express.json());

${routes.map((route) => this.generateRouteCode(route, mock)).join('\n\n')}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`Mock "${mock.name}" running on port \${PORT}\`);
});
`;
    return code;
  }

  private generateRouteCode(route: Route, mock: Mock): string {
    const method = route.method.toLowerCase();
    const response = JSON.stringify(route.defaultResponse, null, 2);
    
    return `
app.${method}('${route.path}', async (req, res) => {
  // Response delay: ${mock.responseDelay}ms
  ${mock.responseDelay > 0 ? `await new Promise(resolve => setTimeout(resolve, ${mock.responseDelay}));` : ''}
  
  // TODO: Add condition checking logic
  
  res.status(${route.statusCode || 200}).json(${response});
});`;
  }

  async generateDockerfile(mock: Mock): Promise<string> {
    return `
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
`;
  }

  async generateKubernetesManifest(mock: Mock): Promise<string> {
    return `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}
  template:
    metadata:
      labels:
        app: mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}
    spec:
      containers:
      - name: mock
        image: stub-manager/mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}:latest
        ports:
        - containerPort: 3001
---
apiVersion: v1
kind: Service
metadata:
  name: mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}
spec:
  selector:
    app: mock-${mock.name.toLowerCase().replace(/\s+/g, '-')}
  ports:
  - port: 80
    targetPort: 3001
`;
  }
}
