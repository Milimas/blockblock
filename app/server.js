import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { Kafka } from "kafkajs";


const kafka = new Kafka({
    clientId: 'blockchain-explorer',
    brokers: ['kafka1:19092'],
});

const consumer = kafka.consumer({ groupId: 'nextjs-group' });

async function runConsumer(io) {
    await consumer.connect();
    await consumer.subscribe({ topic: 'blocks', fromBeginning: false });
    await consumer.subscribe({ topic: 'transactions', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = message.value.toString();
            io.emit(topic, data);
        },
    });
}

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    runConsumer(io);


    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});