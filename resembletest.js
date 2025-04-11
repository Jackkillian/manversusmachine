const {Resemble} = require('@resemble/node')
const {createWriteStream} = require("node:fs");

Resemble.setApiKey('VISECZGNZaszFE38Szt8rgtt')
Resemble.setSynthesisUrl('https://f.cluster.resemble.ai/stream')

const projectUuid = 'aefb3036'
const voiceUuid = '82a67e58'

async function doWork() {
    try {
        let stream = await Resemble.v2.clips.stream(
            {
                data: 'In conclusion, the capabilities of AI are nothing short of extraordinary. AI systems like generative models can now perform tasks that were once thought to be the exclusive domain of humans. They can generate creative works of art, write coherent essays, assist with complex problem-solving, and even engage in natural conversation that closely mimics human interaction. The speed and efficiency with which AI can process information, analyze data, and generate responses are revolutionizing industries and reshaping the way we approach tasks. What was once the realm of science fiction is now a tangible reality, and as AI continues to evolve, its potential seems almost limitless–',
                project_uuid: projectUuid,
                voice_uuid: voiceUuid,
            },
            {
                getTimeStamps: true,
            },
        );

        const filePath = 'output.wav';
        const writeStream = createWriteStream(filePath);
        const timestampWriteStream = createWriteStream('timestamps.json');
        const timestampArray = [];

        for await (const chunk of stream) {
            const { data, timestamps } = chunk
            if (data) {
                // The data variable is a byte array representing a chunk of a WAV audio file.
                // console.log(data)

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