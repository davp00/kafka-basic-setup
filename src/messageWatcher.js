const { Kafka } = require("kafkajs");
const delay = require('delay');
const clientId = "kafka-consumer-client" 
const brokers = ["localhost:9092"]  
const topic = "test_topic"
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId, })

const partition = process.argv[2] ? Number(process.argv[2]) : 0;

const consume = async () => {
      let data = [];
      await consumer.connect()
      await consumer.subscribe({ topic })
      await consumer.run({
        eachMessage: async ({ message, partition }) => {
        console.log(`received message from partition ${partition}: ${message.value}`)
        await delay(50);
        data.push(message);
        },
     })
return data;
}
consume().then(()=>{console.log("produced successfully")}).catch(err => console.log(err));