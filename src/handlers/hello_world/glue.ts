import { Message } from "kafkajs";
import { lambdaHandler } from "./app";
import { POSDataReceivedV2 } from "@jewelers-mutual-insurance/coreserv.event-schemas/dist/event-schemas/POSDataReceived/v2";
import {v4 as uuid} from 'uuid'

// Customize your event here
const event: POSDataReceivedV2 = {
  customer: {
    id: uuid(),
  },
  item: {
    id: uuid(),
    newItemField: 'test',
  },
  ap: true,
  newfield: 'test2',
}

const main = async () => {
  const bytes = POSDataReceivedV2.encode(event).finish();
  const buffer = Buffer.from(bytes);
  const message: Message = { value: buffer }

  await lambdaHandler(message)
};


main().catch(console.error);
