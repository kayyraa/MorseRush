const MorseAlphabet = {A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----"};
const Words = [
    "APPLE", "DOG", "WATER", "BIG", "CHAIR", "TABLE", "SKY", "BIRD", "SNAKE", 
    "RIVER", "HORSE", "BEACH", "MOON", "CAR", "FOREST", "BREAD", "CLOCK", 
    "TRAIN", "WORLD", "LIGHT", "MUSIC", "HAND", "SMILE", "STONE", "BRUSH", 
    "CANDY", "STORM", "TREE", "PLANT", "SUN", "GLASS", "NIGHT", "DOOR", "FIELD", 
    "MIRACLE", "JOURNEY", "KINGDOM", "ISLAND", "TROUBLE", "DANGER", "FREEDOM", 
    "HUNGER", "RESCUE", "CITIZEN", "VOYAGE", "SUCCESS", "MEMORY", "BALANCE", 
    "CULTURE", "FASHION", "NATURE", "PATIENCE", "PRISON"
];

const MorseContainer = document.querySelector(".Morse");
const TextInput = document.querySelector(".TextInput");
const LevelLabel = document.querySelector(".Level");
const CheckButton = document.querySelector(".CheckButton");

let Cheat = false;
let Level = 1;
let Word;

function GetWord() {
    const MaxLength = Level + 2;
    const FilteredWords = Words.filter(word => word.length <= MaxLength);
    const RandomIndex = Math.floor(Math.random() * FilteredWords.length);
    return FilteredWords[RandomIndex];
}

function ConvertToMorse(Word) {
    return Word.toUpperCase().split("").map(Letter => MorseAlphabet[Letter]);
}

function ConvertToWord(Morse) {
    return Morse.split(" ").map(MorseWord => 
        Object.keys(MorseAlphabet).find(letter => MorseAlphabet[letter] === MorseWord) || ""
    ).join("");
}

function DisplayWord(MorseWords) {
    MorseWords.forEach(MorseWord => {
        const WordElement = document.createElement("div");
        WordElement.innerHTML = `${MorseWord}${Cheat ? " " : ""}${Cheat ? ConvertToWord(MorseWord) : ""}`;
        MorseContainer.appendChild(WordElement);
    });
}

function ClearMorse() {
    MorseContainer.innerHTML = "";
    TextInput.value = "";
}

function StartGame() {
    LevelLabel.innerHTML = `Level ${Level}`;

    Word = GetWord();
    const MorseWords = ConvertToMorse(Word);
    DisplayWord(MorseWords);

    TextInput.addEventListener("keydown", (Event) => {
        if (Event.key === "Enter") {
            const InputText = TextInput.value.toUpperCase();
            if (InputText === Word) {
                DisplayWord([`Level: ${Level}`]);
                ClearMorse();
                Level++;
                StartGame();
            }
        }
    });
}

CheckButton.addEventListener("click", () => {
    const InputText = TextInput.value.toUpperCase();
    if (InputText === Word) {
        DisplayWord([`Level: ${Level}`]);
        ClearMorse();
        Level++;
        StartGame();
    }
});

StartGame();