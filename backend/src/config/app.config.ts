export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Kafka configuration
  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    clientId: process.env.KAFKA_CLIENT_ID || 'stub-manager',
  },
  
  // Runtime configuration
  runtime: {
    baseUrl: process.env.RUNTIME_BASE_URL || 'http://localhost:3001',
  },
  
  // OpenShift/Kubernetes configuration
  openshift: {
    apiUrl: process.env.OPENSHIFT_API_URL || '',
    token: process.env.OPENSHIFT_TOKEN || '',
    namespace: process.env.OPENSHIFT_NAMESPACE || 'stub-manager',
  },
});
