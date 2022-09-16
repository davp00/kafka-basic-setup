const { Kafka } = require("kafkajs");
const clientId = "kafka-producer-client";
const brokers = ["localhost:9092"];
const topic = "test_topic";
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

const produce = async () => {


  await producer.connect();

  setInterval(async () => {
    console.time('time')
    const payload = {keyTest: 'Keyvalue', keyTest2: 'keyValue2', date: new Date().toISOString()}
    await producer.send({
      topic,
      messages: [
        { key: `key-test-${Math.random()}`, value: JSON.stringify(payload)},
      ],
    });
    console.timeEnd('time')
  }, 1)
}

(
  async () => {
    await produce()
    .catch((err) => console.log(err));
    console.log("produced successfully");
  }
)()