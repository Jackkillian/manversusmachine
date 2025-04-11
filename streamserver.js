const {Resemble} = require("@resemble/node");
Resemble.setApiKey('zCEKVU2xKRQgqLFAc8MjaQtt')
Resemble.setSynthesisUrl('https://f.cluster.resemble.ai/stream')
const projectUuid = '7725f031'
const voiceUuid = '82a67e58'

async function doWork(content, socket) {
    try {
        let stream = await Resemble.v2.clips.stream(
            {
                data: content,
                project_uuid: projectUuid,
                voice_uuid: voiceUuid,
            },
            { getTimeStamps: true }
        );

        let chunkCount = 0;

        for await (const chunk of stream) {
            const { data, timestamps } = chunk;
            chunkCount++;

            if (data) {
                socket.emit('audio_chunk', { data: Buffer.from(data), chunkCount });
            }
            if (timestamps) {
                socket.emit('timestamps', { timestamps, chunkCount });
            }
        }

        socket.emit('audio_end');
        console.log('Streaming finished');

    } catch (e) {
        console.log("Error");
        console.log(e);
    }
}

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('start_audio', (content) => {
            console.log('message: ' + content);
            doWork(content, socket).then(r => {
                console.log("work done")
            });
        });
    });
}