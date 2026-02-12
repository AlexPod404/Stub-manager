import { Injectable } from '@nestjs/common';
import { Mock } from '../../mocks/entities/mock.entity';
import { Route } from '../../routes/entities/route.entity';

@Injectable()
export class MockGeneratorService {
  generateRestMock(mock: Mock, routes: Route[]): string {
    // Generate Express.js code for REST mock
    return `
const express = require('express');
const app = express();

app.use(express.json());

// Mock: ${mock.name}
${routes.map(route => this.generateRouteHandler(route)).join('\n\n')}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`Mock ${mock.name} running on port \${PORT}\`);
});
`;
  }

  private generateRouteHandler(route: Route): string {
    return `
app.${route.method.toLowerCase()}('${route.path}', async (req, res) => {
  // Delay if configured
  if (${route.delayMs} > 0) {
    await new Promise(resolve => setTimeout(resolve, ${route.delayMs}));
  }

  // TODO: Implement condition checking and parameter extraction
  // For now, return a default response
  res.status(200).json({ message: 'Mock response', route: '${route.path}' });
});`;
  }

  generateGrpcMock(mock: Mock, routes: Route[]): string {
    // TODO: Implement gRPC mock generation
    return `// gRPC mock generation not yet implemented`;
  }

  generateKafkaMock(mock: Mock): string {
    // TODO: Implement Kafka mock generation
    return `// Kafka mock generation not yet implemented`;
  }

  generateDockerfile(): string {
    return `
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
`;
  }

  generatePackageJson(mockName: string): string {
    return JSON.stringify({
      name: `mock-${mockName.toLowerCase().replace(/\s+/g, '-')}`,
      version: '1.0.0',
      description: `Generated mock for ${mockName}`,
      main: 'index.js',
      dependencies: {
        express: '^4.18.0',
      },
    }, null, 2);
  }
}
