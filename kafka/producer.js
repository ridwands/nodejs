const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient(config.kafka_server);
    const producer = new Producer(client);
    const kafka_topic = 'nodejs';
    console.log("producer");
    var n=10;  
    for(var i=1; i<=n; i++){
    let payloads = [
        {
            topic: kafka_topic,
            messages: "ridwands"+i
        }
    ];

    producer.on('ready', async function(){
        let push_status = producer.send(payloads, (err, data) => {
            if (err){
                console.log('[kafka-producer -> '+kafka_topic+']: brodker update failed');
            }else{
                console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
            }
        });
    });
}
    producer.on('error', function (err){
        console.log(err);
        console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
        throw err;
    });
}
catch(e) {
    console.log(e);
}