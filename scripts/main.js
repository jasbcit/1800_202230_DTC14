firebase.auth().onAuthStateChanged((user) => {
  // Check if a user is signed in:
  let loginButton = document.querySelector(".log-in-button");
  let userButton = document.querySelector(".user-profile-button");
  if (user) {
    // Do something for the currently logged-in user here:
    console.log(user.uid);
    console.log(user.displayName);

    loginButton.style.display = "none"; // hides the login button if a user is logged in
    userButton.style.display = "inline";

    //method #1:  insert with html only
    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
    //method #2:  insert using jquery
    // $("#name-goes-here").text(user_Name); //using jquery
  } else {
    // No user is signed in.
    loginButton.style.display = "inline"; // displays the login button if a user is not logged in 
    userButton.style.display = "none";
  }
});

function logOut() {
  // logs the user out of the app
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      window.location.assign("home.html");
    })
    .catch(function (error) {
      // An error happened.
    });
}

// The code below makes the character, word, sentence and paragraph count happen live each time the user presses a key.

document.querySelector("#user-input").addEventListener("keyup", countCharacters);
document.querySelector("#user-input").addEventListener("keyup", countWords);
document.querySelector("#user-input").addEventListener("keyup", countSentences);
document.querySelector("#user-input").addEventListener("keyup", countParagraphs);

function countCharacters() {
  // Counts the number of characters the user has typed and displays it under character count
  let characterCount = document.querySelector(".characters");
  let userInput = document.querySelector("#user-input").value;

  let characters = userInput.length;

  characterCount.innerHTML = characters;
}

function countWords() {
  // Counts the number of words the user has typed and displays it under word count
  let wordCount = document.querySelector(".words");
  let userInput = document.querySelector("#user-input").value;

  let words = userInput.trim().split(/\s+/).length;
  if (userInput.length === 0) {
    wordCount.innerHTML = 0;
  } else {
    wordCount.innerHTML = words;
  }
}

function countSentences() {
  // Counts the number of sentences the user has typed and displays it under sentence count
  stop = /[.!?]/;
  let sentenceCount = document.querySelector(".sentences");
  let userInput = document.querySelector("#user-input").value;
  let sentences = userInput.split(stop).length - 1;

  sentenceCount.innerHTML = sentences;
}

function countParagraphs() {
  // Counts the number of paragraphs the user has typed and displays it under paragraph count
  let wordCount = document.querySelector(".words");

  if (wordCount.innerHTML > 0) {
    let paragraphCount = document.querySelector(".paragraphs");
    let userInput = document.querySelector("#user-input").value;
    let paragraphs = userInput.replace(/\n$/gm, "").split(/\n/).length;
    paragraphCount.innerHTML = paragraphs;
  } else {
    let paragraphCount = document.querySelector(".paragraphs");
    paragraphCount.innerHTML = 0;
  }
}

function countTopKeywords() {
  // Counts the most used words and displays them in the top key words count container
  let userInput = document.querySelector("#user-input").value.toLowerCase();
  let topWordsEl = document.querySelector("#keywords-placeholder");
  topWordsEl.innerHTML = "";
  let wordCounts = {};
  let words = userInput
    .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/);

  for (var i = 0; i < words.length; i++) {
    wordCounts["_" + words[i]] = (wordCounts["_" + words[i]] || 0) + 1;
  }

  function getTopValues(obj, topN) {
    var sortedEntries = Object.entries(obj).sort(function (a, b) {
      return b[1] - a[1];
    });

    var last = sortedEntries[topN - 1][1];
    var result = sortedEntries.filter(function (entry) {
      return entry[1] >= last;
    });
    return Object.fromEntries(result);
  }

  let dictPairs = Object.keys(wordCounts).length;

  if (dictPairs == 1 && words.length >= 1) {
    sortedWordCount = getTopValues(wordCounts, 1);
  } else if (dictPairs == 2 && words.length >= 1) {
    sortedWordCount = getTopValues(wordCounts, 2);
  } else if (dictPairs == 3 && words.length >= 1) {
    sortedWordCount = getTopValues(wordCounts, 3);
  } else if (dictPairs == 4 && words.length >= 1) {
    sortedWordCount = getTopValues(wordCounts, 4);
  } else if (dictPairs == 5 && words.length >= 1) {
    sortedWordCount = getTopValues(wordCounts, 5);
  } else {
    sortedWordCount = getTopValues(wordCounts, 5);
  }

  for (key in sortedWordCount) {
    let newWord = document.createElement("p");
    newWord.innerHTML = `${key.slice(1)}: ${sortedWordCount[key]}\n`;
    newWord.style.display = "block";
    newWord.style.textAlign = "center";
    topWordsEl.appendChild(newWord);
  }
}
