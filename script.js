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
const LevelLabel = document.querySelector(".LevelLabel");
const ErrorsLabel = document.querySelector(".ErrorsLabel");
const CheckButton = document.querySelector(".CheckButton");

let Cheat = false;
let Level = 1;
let Errors = 0;
let Word;
let KeydownListener;

function GetWord() {
    const MaxLength = Level + 2;
    const FilteredWords = Words.filter(Word => Word.length <= MaxLength);
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
        WordElement.style.opacity = "0";
        MorseContainer.appendChild(WordElement);

        setTimeout(() => {
            WordElement.style.opacity = "1";
        }, 125);
    });
}

function HandleWrong() {
    Array.from(MorseContainer.children).forEach(Character => {
        Character.classList.add("Wrong");
    });
}

function HandleCorrect() {
    Array.from(MorseContainer.children).forEach(Character => {
        Character.classList.add("Correct");
    });
}

function RemoveFlag() {
    Array.from(MorseContainer.children).forEach(Character => {
        Character.classList.remove("Wrong");
        Character.classList.remove("Correct");
    });
}

function UpdateLabel() {
    LevelLabel.innerHTML = Level;
    ErrorsLabel.innerHTML = Errors;
}

function ClearMorse() {
    MorseContainer.innerHTML = "";
    TextInput.value = "";
}

function StartGame(OverrideWord) {
    Word = OverrideWord ? OverrideWord : GetWord();
    const MorseWords = ConvertToMorse(Word);
    DisplayWord(MorseWords);
    RemoveFlag();
    UpdateLabel();

    Errors = 0;
    TextInput.removeEventListener("keydown", KeydownListener);

    KeydownListener = (Event) => {
        if (Event.key === "Enter") {
            const InputText = TextInput.value.toUpperCase();
            if (InputText === Word) {
                HandleCorrect();
                DisplayWord([`Level: ${Level}`]);
                ClearMorse();
                Level++;
                StartGame();
            } else {
                Errors++;
                HandleWrong();
                UpdateLabel();
                
                if (Errors === 2) {
                    TextInput.value = Word[0];
                }

                if (Errors >= 3) {
                    ClearMorse();
                    StartGame();
                    UpdateLabel();
                }
            }
        }
    };

    TextInput.addEventListener("keydown", KeydownListener);
}

CheckButton.addEventListener("click", () => {
    const InputText = TextInput.value.toUpperCase();
    if (InputText === Word) {
        HandleCorrect();
        ClearMorse();
        UpdateLabel();
        Level++;
        Errors = 0;
        StartGame();
    } else {
        Errors++;
        HandleWrong();
        UpdateLabel();
        
        if (Errors === 2) {
            TextInput.value = Word[0];
        }

        if (Errors >= 3) {
            ClearMorse();
            StartGame();
            UpdateLabel();
        }
    }
});

StartGame();