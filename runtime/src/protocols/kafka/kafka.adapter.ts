import { Kafka } from 'kafkajs';

export class KafkaAdapter {
  private kafka: Kafka;
  private producer: any;
  private consumer: any;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'stub-manager-runtime',
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    });
  }

  async initialize() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log('Kafka adapter initialized');
  }

  async publishMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async subscribeToTopic(topic: string, handler: (message: any) => void) {
    this.consumer = this.kafka.consumer({ groupId: 'stub-manager-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value?.toString();
        if (value) {
          handler(JSON.parse(value));
        }
      },
    });
  }

  async disconnect() {
    if (this.producer) await this.producer.disconnect();
    if (this.consumer) await this.consumer.disconnect();
  }
}
