var currentPhrase = 0; // Iteration variable

var phrasesData = JSON.parse(ReadPhrasesData("https://projeto-pri.github.io/prijs/sounds/phrases_data.json"));

WritePhrasesOnHTML(phrasesData);

var phraseList = document.getElementById("phraseList").getElementsByTagName("LI");

// Highlighting the first phrase of the list
phraseList[currentPhrase].classList.add("active");

// Browse the list of phrases and highlight the phrase to be played
function Browse(number){ // Gets +1 or -1 as parameter, if it is +1 descends in list, if -1 goes up in list

  // number is added to the iteration variable (currentPhrase), increasing or decreasing its value
  currentPhrase += number;

  // Implementing a loop in the list selection 
  if (currentPhrase == phraseList.length){
    currentPhrase = 0;
  }
  else if (currentPhrase == -1){
    currentPhrase = phraseList.length - 1;
  }
  highlightPhrase();
  AutoScroll();
}

function AutoScroll(){
  // Determining the position to scroll
  // two list items before the highlighted item
  var position = currentPhrase - 2;
  if (position < 0) position = 0; // Making sure that it will only scroll from the third item

  var item = phraseList[position];
  var topPos = item.offsetTop; // Getting the pixel value of his position
  
  document.getElementById('phraseList').scrollTop = topPos; 
}

// Highlighting the current phrase
function highlightPhrase(){
  // Clearing the background color of all phrases 
  for (var i = 0; i < phraseList.length; i++) {
    phraseList[i].classList.remove("active");
  }

  // Leaving only the current phrase highlighted
  phraseList[currentPhrase].classList.add("active");
}

// Play the audio file for the highlighted phrase
function PlayPhraseAudio(){
  var phraseAudio = new Audio();
  // sounds[currentPhrase] it is the file name corresponding to the current highlighted phrase
  phraseAudio.src = phrasesData["phrases"][currentPhrase].filename;
  phraseAudio.play();
}

// Event to browse the list and play phrases using Arrow Keys
document.onkeydown = function(event){
  switch (event.keyCode) {
     case 38: // arrow key UP
     		Browse(-1);
       	break;
     case 40: // arrow key DOWN
     		Browse(1);
      	break;
     case 39: // arrow key RIGHT
     		PlayPhraseAudio();
      	break;
  }
}

function ReadPhrasesData(phrasesFile){
  var phrasesData;

  var rawPhrases = new XMLHttpRequest();
  rawPhrases.open("GET", phrasesFile, false);

  rawPhrases.onreadystatechange = function (){
    if(rawPhrases.readyState === 4){
      if(rawPhrases.status === 200 || rawPhrases.status == 0){
        phrasesData = rawPhrases.responseText;
      }
    }
  }

  rawPhrases.send(null);

  return phrasesData;
}

function WritePhrasesOnHTML(phrasesData){

  var ul_phrases = document.getElementById("phraseList");

  for(var i = 0; i < phrasesData["phrases"].length; i++){

    var li_phrase = document.createElement("LI");

    li_phrase.classList.add("list-group-item");
    li_phrase.innerHTML = phrasesData["phrases"][i].content;

    ul_phrases.appendChild(li_phrase);
  }
}

