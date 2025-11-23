/* --------------------------------------- Constants ---------------------------------------*/
const wordsArray = [
  "abets", "baste", "betas", "beast", "beats",
  "acres", "cares", "races", "scare",
  "alert", "alter", "later",
  "angel", "angle", "glean",
  "ascot", "coats", "coast", "tacos",
  "aster", "rates", "stare", "taser", "tears",
  "baker", "brake", "break",
  "bared", "beard", "bread", "debar",
  "begin", "being", "binge",
  "below", "bowel", "elbow",
  "bores", "robes", "sober",
  "capes", "paces", "space",
  "caret", "cater", "crate", "trace",
  "cider", "cried", "dicer",
  "claps", "clasp", "scalp",
  "cruel", "lucre", "ulcer",
  "dater", "rated", "trade", "tread",
  "dates", "sated", "stead",
  "deist", "diets", "edits", "sited", "tides",
  "dowry", "rowdy", "wordy",
  "earns", "nears", "saner", "snare",
  "earth", "hater", "heart",
  "emits", "items", "mites", "smite", "times",
  "ester", "reset", "steer", "terse", "trees",
  "ether", "there", "three",
  "hares", "hears", "rheas", "share", "shear",
  "heaps", "phase", "shape",
  "heros", "hoers", "horse", "shore",
  "lapse", "leaps", "pales", "peals", "pleas", "sepal",
  "leapt", "petal", "plate", "pleat",
  "least", "slate", "stale", "steal", "tales", "teals",
  "limes", "miles", "slime", "smile",
  "liter", "litre", "relit", "tiler",
  "loops", "polos", "pools", "sloop", "spool",
  "lopes", "poles", "slope",
  "manes", "manse", "means", "names",
  "mates", "meats", "steam", "tames", "teams",
  "merit", "mitre", "remit", "timer",
  "nails", "slain", "snail",
  "noter", "toner", "tenor", "notes", "onset", "stone", "tones",
  "paled", "pedal", "plead", "panel", "penal", "plane",
  "pares", "parse", "pears", "reaps", "spare", "spear", "parts", "strap", "traps",
  "paste", "tapes", "peats", "septa", "spate",
  "pelts", "slept", "spelt",
  "piers", "pries", "spire",
  "pines", "snipe", "spine",
  "pinto", "piton", "point",
  "pores", "poser", "prose", "ropes", "spore",
  "reins", "resin", "rinse", "risen", "siren",
  "rites", "tiers", "tires", "tries",
  "saint", "satin", "stain",
  "salve", "slave", "vales", "veals",
  "serve", "sever", "veers", "verse",
  "sinew", "swine", "wines",
  "skate", "stake", "steak", "takes", "teaks",
  "state", "taste", "teats"]

/* --------------------------------------- Variables ---------------------------------------*/
let letterSet = []
let currentPlayerChoice = []
let previousPlayerChoice= []
let currentPlayerChoiceString = ''

/* ------------------------------- Cached Element References -------------------------------*/
const letterBtnELs = document.querySelectorAll('.letters') 
const clearBtnEl = document.querySelector('#clearBtn')
const enterBtnEls = document.querySelector('#enterBtn')
const instructionsBtnEl = document.querySelector('#instructionsBtn')
const resetBtnEl = document.querySelector('#resetBtn')
const letterSetDisplayEl = document.querySelector('#letterSetDisplay')
const userChoiceDisplayEl = document.querySelector('#userChoiceDisplay')
const displayWordListEl = document.querySelector('#displayWordList')

/* --------------------------------------- Functions ---------------------------------------*/
// randomizes word from the wordsArray and splits string into an array of chars
const randomizeWordSelection = () =>{
  const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
  const splitWord = randomWord.split('')
  return splitWord
}

// shuffles the index order of the split array (Fisher Yates Method) 
const shuffleSplitWord = () =>{
  letterSet = randomizeWordSelection()
  for (let i = letterSet.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = letterSet[i];
    letterSet[i] = letterSet[j];
    letterSet[j] = k;
  }
}

// format and display set of characters on browser display 
const displayLetterSet = () => {
  const letterSetString = letterSet.join(' ').toUpperCase()
  letterSetDisplayEl.textContent = letterSetString
}

// pushes and formats player choice to be displayed on browser display (limits to 5 chars)
const handleLetterClick = (event) => { 
  if (currentPlayerChoice.length < 5){
    currentPlayerChoice.push(event.target.innerText)
    currentPlayerChoiceString = currentPlayerChoice.join(' ').toUpperCase()
    userChoiceDisplayEl.textContent = currentPlayerChoiceString
  } else { // add popup for error
    return
  }
}

// clears letter entry 
const handleClearClick = (event) => { 
    currentPlayerChoice.pop(event.target.innerText)
    currentPlayerChoiceString = currentPlayerChoice.join(' ').toUpperCase()
    userChoiceDisplayEl.textContent = currentPlayerChoiceString
}

// appends user choice to list
const appendToList = (newWord) => {
  const newItem = document.createElement('li')
  newItem.textContent = newWord.toUpperCase()
  displayWordListEl.appendChild(newItem)
  }

// converts string of chars to array, reformat and push to entered words array
const handleEnterClick = (event) => { 
  currentPlayerChoice = currentPlayerChoiceString.split(' ').join('').toLowerCase()
  previousPlayerChoice.push(currentPlayerChoice)
  userChoiceDisplayEl.textContent = ''
  appendToList(previousPlayerChoice[previousPlayerChoice.length -1])
  currentPlayerChoice = []
}

const init = () => {
  currentPlayerChoiceString = ''
  currentPlayerChoice = []
  previousPlayerChoice= []
  shuffleSplitWord()
  displayLetterSet() 
}

const show = (event) => {
    const tryTHis = event.target.innerText
    console.log(tryTHis)
}

/* ------------------------------------ Event Listeners ------------------------------------*/
for (eachLetter of letterBtnELs) {eachLetter.addEventListener('click', handleLetterClick)}
clearBtnEl.addEventListener('click', handleClearClick)
enterBtnEls.addEventListener('click', handleEnterClick)
instructionsBtnEl.addEventListener('click', show)
resetBtnEl.addEventListener('click', show)
init()