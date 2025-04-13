const {Resemble} = require('@resemble/node')
const {createWriteStream, writeFileSync} = require("node:fs");

Resemble.setApiKey('VISECZGNZaszFE38Szt8rgtt')
Resemble.setSynthesisUrl('https://f.cluster.resemble.ai/stream')

const projectUuid = 'aefb3036'
const voiceUuid = '82a67e58'

async function doWork() {
    try {
        let stream = await Resemble.v2.clips.stream(
            {
                data: 'It was a chilly autumn morning when I walked into the kitchen and found my younger brother arguing—yes, arguing—with the family toaster. “You burnt it again,” he muttered, poking at the blackened edges of his bread. Then he did something strange: he paused, furrowed his brow, and asked the toaster, “Why can’t you just get it right?” Of course, the toaster didn’t answer. But what struck me wasn’t the silence—it was the expectation. Somewhere in his mind, my brother had begun to believe that machines should respond like people do. That moment stuck with me. We are surrounded by technology that talks, learns, and adapts, and it’s easy—almost natural—to forget that it\'s not actually human. It\'s just a tool. And yet, more and more, we treat these tools like teachers, mentors, even friends. That curious scene with a toaster might’ve seemed like a joke, but maybe it’s not so funny after all.',
                project_uuid: projectUuid,
                voice_uuid: voiceUuid,
            },
            {
                getTimeStamps: true,
            },
        );

        const filePath = 'introduction.wav';
        const writeStream = createWriteStream(filePath);
        const timestampWriteStream = createWriteStream('timestamps2.json');
        const timestampArray = [];

        for await (const chunk of stream) {
            const {data, timestamps} = chunk
            if (data) {
                console.log("Wrote data")
                const buffer = Buffer.from(data);
                writeStream.write(buffer);
            }
            if (timestamps) {
                timestampArray.push(timestamps);
                console.log(timestamps)
            }
        }
        writeStream.end();

        timestampWriteStream.write(JSON.stringify(timestampArray));
        timestampWriteStream.end();

        console.log('Streaming finished');
        console.log(timestampArray)
        writeFileSync('timestamps2.json', JSON.stringify(timestampArray));
        console.log('Done')

    } catch (e) {
        console.log("Error")
        console.log(e)
    }
}

doWork().then(() => {
    console.log("Done")
}).catch((e) => {
    console.log(e)
});