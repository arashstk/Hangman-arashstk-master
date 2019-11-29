// Globala variabler
// Globala variabler

const wordList = ["puzzle", "another"];
let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg = './images/h';      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl;     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn");  // DOM-nod: knappen som du startar spelet med
let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls = document.querySelector('#letterBoxes > ul');    // Array av DOM-noder: Rutorna där bokstäverna ska stå
let myLetter;
let letter;
let wordChoice; 
let hiddenWord;
let i;
let enter;
let true_guesses = 0;
let started = 0;

var round = 0;

var rem = document.querySelector('#remain');
var hang_image = document.querySelector('#hang_img');

function selectWord() {

    var number = Math.round(Math.random() * (wordList.length - 1));

    wordChoice = wordList[number];

    for (i = 0; i < wordChoice.length; i++) {
        hiddenWord = wordChoice.replace(/./g, "- ");
    }
 }


 document.onkeyup = function (event) {
    var myLetter = event.key;
    if (myLetter === "Enter") {
        selectWord();
    }
 };

function startGame() {
    round ++;

    function generateRandomWord(wordList) {
        started = 1;

        var board = document.querySelector('#gameBoard');
        board.style.display = 'block';

        letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
        letterButtonEls.forEach(letterButton => {
            letterButton.disabled = false;
        });

        word = wordList[Math.floor(Math.random() * wordList.length)];
        guesses = word.length;
        true_guesses = 0;

        console.log(word);
        rem.textContent = word.length;


        hang_image.src = './images/h0.png';
        return word;
    }

    function createLetterBoxes() {
        letterBoxEls.innerHTML = '';

        for (let index = 0; index < selectedWord.length; index++) {
            let li = document.createElement("li");
            let input = document.createElement("input");
            input.setAttribute("value", "-");
            input.readOnly = true;
            input.id = 'inp-' + index;
            li.appendChild(input);
            letterBoxEls.appendChild(li)
        }
    }

    function handleGuess(letter) {
        // does the letter "X" exist in selectedWord?
        console.log("SelectedWord", selectedWord);
        
        if (selectedWord.includes(letter.toLowerCase())) {
            for (var i = 0; i < selectedWord.length; i++) {
                var current = selectedWord[i];
                if (current === letter.toLowerCase()) {
                    var inp = document.querySelector('#inp-' + i.toString());
                    inp.value = letter;
                    true_guesses++;

                    if (true_guesses === selectedWord.length)
                        alert('you win');
                }
            }
        } else {
            if (guesses === 0) {
                alert('game over...')
            } else {
                guesses = guesses - 1;
                rem.textContent = guesses;
                hang_image.src = './images/h' + parseInt(6 - guesses) + '.png';
                if (guesses === 0) {
                    alert('game over..., correct word was: ' + selectedWord);
                }
            }
        }
    }

    function addListenersToAlphabetButtons() {
        letterButtonEls = document.querySelectorAll("#letterButtons > li > button");
        letterButtonEls.forEach(letterButton => {
            letterButton.addEventListener("click", function (event) {

                console.log(guesses);

                if (true_guesses === selectedWord.length) {
                    alert('the sentence is completed');
                    return false;
                }

                if (started === 0)
                    alert('please start the game');


                let button = event.target;

                if(guesses > 0) {
                    button.disabled = true;

                    let buttonValue = event.target.value;

                    handleGuess(buttonValue)
                } else {
                    alert('game over...')
                }
            })
        })
    }


    selectedWord = generateRandomWord(wordList);

    createLetterBoxes();
    if (round === 1)
        addListenersToAlphabetButtons();


}

startGameBtnEl.addEventListener("click", startGame);
