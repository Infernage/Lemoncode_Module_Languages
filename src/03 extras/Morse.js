class Sender {
    translator;
    timingFn;
    writerFn;
    onFinishFn;
    constructor(translator, timingFn, writerFn, onFinishFn) {
        this.translator = translator;
        this.timingFn = timingFn;
        this.writerFn = writerFn;
        this.onFinishFn = onFinishFn;
    }
    send(message) {
        const morseCode = this.parseIntoMorse(message);
        const lightStatesPerPoint = Sender.parseMorseIntoLightStates(morseCode);
        this.sendSingleCode(lightStatesPerPoint, Math.round(performance.now()));
    }
    static parseMorseIntoLightStates(morseCode) {
        const lightStates = [];
        for (const morseCodeLetter of morseCode) {
            if (!morseCodeLetter.length) {
                lightStates.push(...Array(7).fill(false));
                continue;
            }
            for (const morseCharacter of morseCodeLetter) {
                const length = morseCharacter === '-' ? 3 : 1;
                lightStates.push(...Array(length).fill(true));
                lightStates.push(false);
            }
            lightStates.push(...Array(3).fill(false));
        }
        return lightStates;
    }
    parseIntoMorse(message) {
        const morseCode = message.split('').map(letter => this.translator.has(letter)
            ? this.translator.get(letter).split('')
            : []);
        console.log('Translated message:', morseCode.flat().join(''));
        return morseCode;
    }
    sendSingleCode(morseStates, timeStamp) {
        if (!morseStates.length) {
            this.onFinishFn();
            return;
        }
        const nextTimeStamp = Math.round(performance.now());
        const state = morseStates.shift();
        const points = morseStates.indexOf(!state);
        morseStates.splice(0, points < 0 ? morseStates.length : points);
        this.writerFn(state);
        console.log(`Elapsed: ${nextTimeStamp - timeStamp} milliseconds. Next state in ${points + 1} points.`);
        this.timingFn(this.sendSingleCode.bind(this), points + 1, morseStates, nextTimeStamp);
    }
}
const morseAlphabet = {
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-",
};
const factory = (translatorObject, timingFunction, writer, onFinish) => {
    return new Sender(new Map(Object.entries(translatorObject)), timingFunction, writer, onFinish);
};
const writer = state => state ? console.log('ON') : console.log('OFF');
const timing = (handler, pointNumbers, ...arguments) => {
    setTimeout(handler, 50 * pointNumbers, ...arguments);
};
const transmisor = factory(morseAlphabet, timing, writer, () => console.log('FINISHED'));
//# sourceMappingURL=Morse.js.map