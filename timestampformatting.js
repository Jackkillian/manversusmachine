// const e = require("express");
// const timestamps = require('./timestamps2.json')[0]
//
// // console.log(timestamps)
//
// const {graph_chars, graph_times} = timestamps;
//
// texts = {}
// data = []
// for (let i = 0; i < graph_chars.length; i++) {
//     const word = graph_chars[i];
//     const time = graph_times[i][0];
//     const endTime = graph_times[i][1];
//
//     if (texts[time]) {
//         texts[time].text += word;
//         continue;
//     } else {
//         texts[time] = {
//             text: word,
//             startTime: time,
//             endTime: endTime
//         }
//     }
// }
//
// // console.log(texts)
//
// for (const [key, value] of Object.entries(texts)) {
//     data.push({startTime: key, endTime: value.endTime, text: value.text})
// }
//
// console.log(data)

// const data = [
//     {
//         startTime: 0,
//         endTime: 11.368707482993198,
//         text: "In conclusion, the capabilities of AI are nothing short of extraordinary. AI systems like generative models can now perform tasks that were once thought to be the exclusive domain of humans."
//     },
//     {
//         startTime: 11.368707482993198,
//         endTime: 21.737414965986396,
//         text: "They can generate creative works of art, write coherent essays, assist with complex problem-solving, and even engage in natural conversation that closely mimics human interaction."
//     },
//     {
//         startTime: 21.737414965986396,
//         endTime: 32.16612244897959,
//         text: "The speed and efficiency with which AI can process information, analyze data, and generate responses are revolutionizing industries and reshaping the way we approach tasks."
//     },
//     {
//         startTime: 32.16612244897959,
//         endTime: 43.59483093196279,
//         text: "What was once the realm of science fiction is now a tangible reality, and as AI continues to evolve, its potential seems almost limitless–"
//     }
// ]

const data = [
    {
        startTime: 0,
        endTime: 7.11469387755102,
        text: 'It was a chilly autumn morning when I walked into the kitchen and found my younger brother arguing—yes, arguing—with the family toaster.'
    },
    {
        startTime: 7.41469387755102,
        endTime: 11.764716553287982,
        text: '“You burnt it again,” he muttered, poking at the blackened edges of his bread.'
    },
    {
        startTime: 12.064716553287981,
        endTime: 21.303401360544218,
        text: 'Then he did something strange: he paused, furrowed his brow, and asked the toaster, “Why can’t you just get it right?” Of course, the toaster didn’t answer.'
    },
    {
        startTime: 21.60340136054422,
        endTime: 32.35609977324263,
        text: 'But what struck me wasn’t the silence—it was the expectation. Somewhere in his mind, my brother had begun to believe that machines should respond like people do. That moment stuck with me.'
    },
    {
        startTime: 32.65609977324263,
        endTime: 41.42077097505669,
        text: "We are surrounded by technology that talks, learns, and adapts, and it’s easy—almost natural—to forget that it's not actually human."
    },
    {
        startTime: 41.72077097505669,
        endTime: 47.619455782312926,
        text: "It's just a tool. And yet, more and more, we treat these tools like teachers, mentors, even friends."
    },
    {
        startTime: 47.91945578231292,
        endTime: 53.17945578231293,
        text: 'That curious scene with a toaster might’ve seemed like a joke, but maybe it’s not so funny after all.'
    }
]


// calculate at what time each word is said

enddata = []

data.forEach((sentence) => {
    const words = sentence.text.split(" ");
    const wordLengths = words.map(word => word.replace(/[^\w]/g, "").length); // remove punctuation for length
    const totalLength = wordLengths.reduce((sum, len) => sum + len, 0);
    const totalTime = sentence.endTime - sentence.startTime;
    let currentTime = sentence.startTime;

    const wordTimes = words.map((word, i) => {
        const wordLength = wordLengths[i];
        const duration = (wordLength / totalLength) * totalTime;
        const wordTime = {word, time: currentTime};
        currentTime += duration;
        return wordTime;
    });

    enddata.push(wordTimes);
});

console.log(enddata)