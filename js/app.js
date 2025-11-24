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
let timerStarted = false
let timerInterval = null
let sec = 59

/* ------------------------------- Cached Element References -------------------------------*/
const letterBtnELs = document.querySelectorAll('.letters') 
const clearBtnEl = document.querySelector('#clearBtn')
const enterBtnEls = document.querySelector('#enterBtn')
const resetBtnEl = document.querySelector('#resetBtn')
const letterSetDisplayEl = document.querySelector('#displayLetterSet')
const userChoiceDisplayEl = document.querySelector('#displayUserChoice')
const displayWordListEl = document.querySelector('#displayWordList')
const safeTimerDisplayEl = document.querySelector('#displaySafeTimer')
const displayWordsLeftEl = document.querySelector('#displayWordsLeft')

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

// timer that starts once first valid letter is clicked 
const timer = () => {
  if (timerStarted) return
  timerStarted = true
  timerInterval = setInterval(() => {
      safeTimerDisplayEl.textContent='00:' + (sec<10 ? '0' + sec:sec)
      sec--
    if (sec <0){
      clearInterval(timerInterval)
      alert("times up")
    }
    },1000)
}

// pushes and formats player choice to be displayed on browser display (limits to 5 chars)
// greys out disabled letters on click 
const handleLetterClick = (event) => { 
  timer()
  if(!letterSet.join('').toUpperCase().includes(event.target.id )){
    event.target.disabled = true
    return
  } 
  if (currentPlayerChoice.length < 5){
    currentPlayerChoice.push(event.target.innerText)
    currentPlayerChoiceString = currentPlayerChoice.join(' ').toUpperCase()
    userChoiceDisplayEl.textContent = currentPlayerChoiceString
  }
}

// returns all possible word combinations from wordsArray
const allPossibleWords = () => {
  const sortWords = letterSet.slice().sort().join('')
  return wordsArray.filter(word => {
    return word.split('').sort().join('') === sortWords
  })
}

// displays how many word combinations are left
const updateWordsLeft = () => {
  const totalWords = allPossibleWords().length
  const foundWords = previousPlayerChoice.length
  const remainingWords = totalWords - foundWords
  displayWordsLeftEl.textContent = `Words left: ${remainingWords}`
}

// checks if all valid words have been entered
const checkIfEntered = () => {
  const allWords = allPossibleWords()
  if (previousPlayerChoice.length === allWords.length){
    alert("all words have been found")
    clearInterval(timerInterval)
    timerStarted=false
  }
}

// clears letter entry 
const handleClearClick = (event) => {
  currentPlayerChoice.pop(event.target.innerText)
  currentPlayerChoiceString = currentPlayerChoice.join(' ').toUpperCase()
  userChoiceDisplayEl.textContent = currentPlayerChoiceString
}

// validates entered word based on conditions before appending to viewport
const wordValidation = () => {
  currentPlayerChoiceString = currentPlayerChoiceString.split(' ').join('').toLowerCase()
  if (!wordsArray.includes(currentPlayerChoiceString)){
    return {valid: false, reason: "NOT IN WORD LIST"}
  }if (previousPlayerChoice.includes(currentPlayerChoiceString)){
    return {valid: false, reason: "WORD ALREADY ENTERED"}
  }
  return {valid: true, word: currentPlayerChoiceString}
}

// appends user choice to list
const appendToList = (addedWord) => {
  const newItem = document.createElement('li')
  newItem.textContent = addedWord.toUpperCase()
  displayWordListEl.appendChild(newItem)
  }

// converts string of chars to array, reformat and push to entered words array
const handleEnterClick = (event) => { 
  currentPlayerChoice = currentPlayerChoiceString.split(' ').join('').toLowerCase()
  const result = wordValidation()
  if (!result.valid){
    alert(result.reason)
    userChoiceDisplayEl.textContent = ''
    currentPlayerChoice = []
    return 
  }
  previousPlayerChoice.push(result.word)
  appendToList(previousPlayerChoice[previousPlayerChoice.length -1])
  userChoiceDisplayEl.textContent = ''
  currentPlayerChoice = []
  updateWordsLeft()
  checkIfEntered() 
}

// initalizes landing page to default state
const init = () => {
  letterBtnELs.forEach(btn => {
    btn.disabled = false
    btn.classList.remove('disabled')
  })
  clearInterval(timerInterval)
  sec = 59
  timerStarted = false
  safeTimerDisplayEl.textContent = '00:59'
  displayWordListEl.textContent = ''
  userChoiceDisplayEl.textContent = ''
  displayWordsLeftEl.textContent = ''
  currentPlayerChoiceString = ''
  currentPlayerChoice = []
  previousPlayerChoice= []
  shuffleSplitWord()
  displayLetterSet() 
}

/* ------------------------------------ Event Listeners ------------------------------------*/
for (eachLetter of letterBtnELs) {eachLetter.addEventListener('click', handleLetterClick)}
clearBtnEl.addEventListener('click', handleClearClick)
enterBtnEls.addEventListener('click', handleEnterClick)
resetBtnEl.addEventListener('click', init)
init()