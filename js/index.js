var currentPhrase = 0; // Iteration variable

var phraseList = document.getElementById("phraseList").getElementsByTagName("LI");

// Array of filenames of recorded phrases
// It should be in the same order that the phrases appear in the HTML list
sounds = ['estou_com_fome.mp3', 'me_de_um_abraco.mp3', 'estou_com_dor.mp3', 'estou_com_frio.mp3', 'voce_pode_me_dar_remedio.mp3', 'preciso_de_um_abraco.mp3'];

// Highlighting the first phrase of the list
phraseList[currentPhrase].className = "highlighted";

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
}

// Highlighting the current phrase of #888 
function highlightPhrase(){

  // Clearing the background color of all phrases 
  var i;
  for (i = 0; i < phraseList.length; i++) {
    phraseList[i].className = "";
  }

  // Leaving only the current phrase highlighted
  phraseList[currentPhrase].className = "highlighted";
}

// Play the audio file for the highlighted phrase
function PlayPhraseAudio(){
    var phraseAudio = new Audio();
    // sounds[currentPhrase] it is the file name corresponding to the current highlighted phrase
    phraseAudio.src = "sounds/" + sounds[currentPhrase];
    phraseAudio.play();
}

// Event to browse the list and play phrases using Arrow Keys
document.onkeydown = function(event) {
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
