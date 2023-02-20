const url = "https://api.masoudkf.com/v1/wordle";
const key = "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv";
var css_var = document.querySelector(':root');
let colourModeButton = document.getElementById("colourMode");
let instrDiv = document.getElementById("instrDiv");
let hintDiv = document.getElementById("hintDiv");

function instr() {

    instrDiv.classList.add("show");
    hintDiv.classList.remove("show");

}

function closeInstr() {

    instrDiv.classList.remove("show");

}

function hint() {

    hintDiv.classList.add("show");
    instrDiv.classList.remove("show");

}

function closeHint() {

    hintDiv.classList.remove("show");

}

function darkMode() {

    css_var.style.setProperty('--bg', '#272727');
    css_var.style.setProperty('--primary', '#6d6d6d');
    css_var.style.setProperty('--secondary', '#cecece');

    colourModeButton.onclick = lightMode;
    colourModeButton.className = "bi bi-sun";

}

function lightMode() {

    css_var.style.setProperty('--bg', '#cecece');
    css_var.style.setProperty('--primary', '#272727');
    css_var.style.setProperty('--secondary', '#6d6d6d');

    colourModeButton.onclick = darkMode;
    colourModeButton.className = "bi bi-moon";

}

async function getDict() {

    var words;

    try {

        const res = await fetch(url, {
            headers: {
            "x-api-key": key,
            },
        })
        .then((response) => response.json())
        .then((json) => {
    
            words = json.dictionary;
    
        });

    } catch(error) {

        window.alert("There was an error fetching the word! Click 'Start Over' to retry.");

    }

    return words;

}

const state = {

    row: 1,
    column: 1

}

let playsCounter = 0;

async function playWoooordle(state) {

    const content = document.getElementById("content");

    if(document.getElementById("win") != null) {

        content.removeChild(content.firstElementChild);
        let htmlTable = `<table>
                            <tr>
                                <td><input type="text" name="r1c1" id="r1c1" maxlength="1"></td>
                                <td><input type="text" name="r1c2" id="r1c2" maxlength="1"></td>
                                <td><input type="text" name="r1c3" id="r1c3" maxlength="1"></td>
                                <td><input type="text" name="r1c4" id="r1c4" maxlength="1"></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="r2c1" id="r2c1" maxlength="1"></td>
                                <td><input type="text" name="r2c2" id="r2c2" maxlength="1"></td>
                                <td><input type="text" name="r2c3" id="r2c3" maxlength="1"></td>
                                <td><input type="text" name="r2c4" id="r2c4" maxlength="1"></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="r3c1" id="r3c1" maxlength="1"></td>
                                <td><input type="text" name="r3c2" id="r3c2" maxlength="1"></td>
                                <td><input type="text" name="r3c3" id="r3c3" maxlength="1"></td>
                                <td><input type="text" name="r3c4" id="r3c4" maxlength="1"></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="r4c1" id="r4c1" maxlength="1"></td>
                                <td><input type="text" name="r4c2" id="r4c2" maxlength="1"></td>
                                <td><input type="text" name="r4c3" id="r4c3" maxlength="1"></td>
                                <td><input type="text" name="r4c4" id="r4c4" maxlength="1"></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="r5c1" id="r5c1" maxlength="1"></td>
                                <td><input type="text" name="r5c2" id="r5c2" maxlength="1"></td>
                                <td><input type="text" name="r5c3" id="r5c3" maxlength="1"></td>
                                <td><input type="text" name="r5c4" id="r5c4" maxlength="1"></td>
                            </tr>
                            <tr>
                                <td><input type="text" name="r6c1" id="r6c1" maxlength="1"></td>
                                <td><input type="text" name="r6c2" id="r6c2" maxlength="1"></td>
                                <td><input type="text" name="r6c3" id="r6c3" maxlength="1"></td>
                                <td><input type="text" name="r6c4" id="r6c4" maxlength="1"></td>
                            </tr>
                        </table>`;
        content.insertAdjacentHTML("afterbegin", htmlTable);

    } else if(document.getElementById("lose") != null) {

        content.removeChild(content.firstElementChild);

    }

    state.row = 1;
    state.column = 1;

    if(playsCounter > 0) {

        for(let i = 1; i < 7; i++) {

            for(let j = 1; j < 5; j++) {
    
                let cell = document.getElementById(`r${i}c${j}`);
                cell.value = "";
                cell.style.backgroundColor = "var(--primary)";
                cell.style.border = "none";
    
            }
    
        }

    }

    playsCounter += 1;

    async function chooseWord() {

        const dict = await getDict();
    
        const index = Number.parseInt(Math.random() * 21);
    
        const word = dict[index].word;
    
        const hint =  dict[index].hint;
    
        const wordInfo = {
    
            word: word,
            hint: hint
    
        }
    
        return wordInfo;
    
    }

    const word = await chooseWord();
    console.log(word);

    const hint = document.createTextNode(word.hint);
    let pTag = document.getElementById("hintP");
    pTag.innerHTML = "";
    pTag.appendChild(hint);

    let cellHighlight = document.getElementById("r1c1");
    cellHighlight.style.border = "5px solid #E46E37";

    let guessesCounter = 0;

    document.body.onkeydown = (event) => {

        cellHighlight.style.border = "none";

        let cell = document.getElementById(`r${state.row}c${state.column}`);
        let keyCode = event.keyCode;
        let key = event.key;

        if(keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122) {

            if(state.column < 5) {

                cell.value = key;
                state.column += 1;

            }

            if(state.column < 5) {

                cellHighlight = document.getElementById(`r${state.row}c${state.column}`);
                cellHighlight.style.border = "6px solid #E46E37";

            }

        } else if(keyCode == 8) {

            cell = document.getElementById(`r${state.row}c${state.column - 1}`);

            if(state.column > 1) {

                cell.value = "";
                state.column -= 1;

            }

            if(state.column > 0) {

                cellHighlight = document.getElementById(`r${state.row}c${state.column}`);
                cellHighlight.style.border = "6px solid #E46E37";

            }

        } else if(keyCode == 13) {

            if (state.column == 5) {

                guessesCounter++;
                console.log(guessesCounter);

                let counter = 0;

                for(let i = 1; i < 5; i++) {

                    cell = document.getElementById(`r${state.row}c${i}`);
                    if(cell.value.toLowerCase().match(word.word.charAt(i-1).toLowerCase())) {

                        cell.style.backgroundColor = "green";
                        counter++;

                    } else if(word.word.toLowerCase().includes(cell.value.toLowerCase())) {

                        cell.style.backgroundColor = "orange";

                    }

                }

                if(counter == 4) {

                    cell.parentElement.parentElement.parentElement.remove();
                    let htmlWin = ` <div id='win'>
                                        <h2 id='lose'>The word was indeed '${word.word}'.</h2>
                                        <img src='congrats_fkscna.gif' alt='Congratulations, you won!'>
                                    </div>`;
                    content.insertAdjacentHTML("afterbegin", htmlWin);

                } else if(guessesCounter == 6) {

                    let htmlLose = `<h2 id='lose'>You Lost. The word was '${word.word}'.</h2>`;
                    content.insertAdjacentHTML("afterbegin", htmlLose);
                    document.body.onkeydown = function (e) {
                        if (e.keyCode == 8) {
                            e.preventDefault();
                        }
                    }

                } else {

                    state.row += 1;
                    state.column = 1;
    
                    cellHighlight = document.getElementById(`r${state.row}c${state.column}`);
                    cellHighlight.style.border = "6px solid #E46E37";

                }
                
            } else {

                window.alert("First complete the word!");
                cellHighlight = document.getElementById(`r${state.row}c${state.column}`);
                cellHighlight.style.border = "6px solid #E46E37";

            }

        }

    }


}

playWoooordle(state);