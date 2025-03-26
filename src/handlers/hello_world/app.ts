import { KafkaMessage } from "kafkajs";
import { POSDataReceivedV2 } from "@jewelers-mutual-insurance/coreserv.event-schemas/dist/event-schemas/POSDataReceived/v2";

export const lambdaHandler = async (event: KafkaMessage) => {
  console.log("LAMBDA RUNNING");
  if (!event.value) return;

  const buffer = event.value;
  const decoded = POSDataReceivedV2.decode(
    new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  );

  console.log("GOT EVENT:");
  console.log(decoded);
};
