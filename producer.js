import { Kafka } from "kafkajs"
import { randomUUID } from "node:crypto"

async function bootstrap() {
    const kafka = new Kafka({
        clientId: "test-producer",
        brokers: ['unique-bear-11420-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'dW5pcXVlLWJlYXItMTE0MjAkdGdzMWUJLc28lj86M83N3bNS6YRLUyZkD38ASM4',
            password: 'hXx_3A8XQhkN1p6XUqSf8RDcGAsNrIGjvu8A4OEAxaAdU6FnA8f7woYW2rnjnL_CGIgX-w==',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            { 
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade!',
                    category: 'social',
                    recipientId: randomUUID(),
                }) 
            },
        ],
    })

    await producer.disconnect()
}

bootstrap()