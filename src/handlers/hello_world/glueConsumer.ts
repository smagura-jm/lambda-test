import { Kafka } from "kafkajs";
import { v4 as uuid } from "uuid";
import { lambdaHandler } from "./app";

const kafka = new Kafka({
  clientId: "CustomerService",
  brokers: ["localhost:19092"],
});

const consumer = kafka.consumer({ groupId: uuid() });

const subscribe = async () => {
  await consumer.subscribe({ topic: "POSDataReceived" }).then(() =>
    consumer.run({
      eachMessage: async ({ message }) => {
        await lambdaHandler(message);
      },
    })
  );
};

export const glueConsumerMain = async () => {
  await consumer.connect();
  await subscribe();
};
