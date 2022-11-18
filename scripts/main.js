firebase.auth().onAuthStateChanged((user) => {
  // Check if a user is signed in:
  let loginButton = document.querySelector(".log-in-button");
  let userButton = document.querySelector(".user-profile-button");
  if (user) {
    // Do something for the currently logged-in user here:
    console.log(user.uid);
    console.log(user.displayName);

    loginButton.style.display = "none";
    userButton.style.display = "inline";

    //method #1:  insert with html only
    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
    //method #2:  insert using jquery
    // $("#name-goes-here").text(user_Name); //using jquery
  } else {
    // No user is signed in.
    loginButton.style.display = "inline";
    userButton.style.display = "none";
  }
});

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}

document.querySelector("#user-input").addEventListener("keyup", countCharacters);
document.querySelector("#user-input").addEventListener("keyup", countWords);
document.querySelector("#user-input").addEventListener("keyup", countSentences);
document.querySelector("#user-input").addEventListener("keyup", countParagraphs);

function countCharacters() {
  let characterCount = document.querySelector(".characters");
  let userInput = document.querySelector("#user-input").value;

  let characters = userInput.length;

  characterCount.innerHTML = characters;
}

function countWords() {
  let wordCount = document.querySelector(".words");
  let userInput = document.querySelector("#user-input").value;

  let words = userInput.trim().split(/\s+/).length;

  wordCount.innerHTML = words
}

function countSentences() {
let sentenceCount = document.querySelector(".sentences");
let userInput = document.querySelector("#user-input").value;
let sentences = userInput.split(". ").length - 1;

sentenceCount.innerHTML = sentences
}

function countParagraphs() {
  

  let paragraphCount = document.querySelector(".paragraphs");
  let userInput = document.querySelector("#user-input").value 
  let paragraphs = userInput.replace(/\n$/gm, "").split(/\n/).length;

  paragraphCount.innerHTML = paragraphs

  console.log(paragraphs)

}