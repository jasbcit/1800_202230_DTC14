var currentUser;
firebase.auth().onAuthStateChanged(user => {
  // check if a user is signed in 
  if (user) {
    // if the user is signed in retrieve the users most recently saved writing from the Firestore collection "users".
    currentUser = db.collection("users").doc(user.uid);
    currentUserWriting = db.collection("savedWriting").doc(user.uid)
    insertName() // adds the users name and date joined to the profile page
    getBookmarks(user)
  } else {
    // No user is signed in.
  }
});



function insertName() {
  // Displays the users profile name and date joined at the top of their profile page.
  let userNameDiv = document.querySelector(".profile-user-name");
  let dateJoinedDiv = document.querySelector(".profile-date-joined")
  currentUser.get()
    .then(userDoc => {
      let userName = userDoc.data().name
      let dateJoined = userDoc.data().datejoined
      userNameDiv.innerText = userName
      dateJoinedDiv.innerText = dateJoined
    })
  currentUserWriting.get()
    .then(userDoc => {
      let recentlyAnalyzedText = userDoc.data().text
      document.getElementById("previouslyAnalyzedPlaceholder").innerText = recentlyAnalyzedText
    })
}

function getBookmarks(user) {
  // Gets the users liked/bookmarked articles from the Firestore using .get().
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {
      var bookmarks = userDoc.data().bookmarks;
      let cardTemplate = document.getElementById("articleCardTemplate");
      bookmarks.forEach(thisArticleID => {
        db.collection("articles").where("code", "==", thisArticleID).get().then(snap => {
          size = snap.size;
          queryData = snap.docs;
          console.log(size)

          if (size == 1) {
            var doc = queryData[0].data();
            var title = doc.name; // get value of the "name" key
            var details = doc.details; // get value of the "details" key
            var articleID = doc.code; //get unique ID to each article to be used for fetching right image
            let link = doc.link
            let newcard = cardTemplate.content.cloneNode(true);
            newcard.querySelector(".card-title").innerHTML = title;
            newcard.querySelector(".card-text").innerHTML = details;
            newcard.querySelector(
              ".card-image"
            ).src = `./images/explore-images/${articleID}.jpg`; //Example: NV01.jpg
            newcard.querySelector(".read-more-link").innerHTML = link
            document.getElementById("articles-go-here").appendChild(newcard);
            document.querySelector(".analysistext").style.display = "none"
          } else {
          }

        })

      });
    })
}

function analyzedLikedShowcase() {
  // Displays the previously analyzed text and liked articles in the user profile.
  let analyzedButton = document.querySelector(".previously-analyzed-button");
  let likedButton = document.querySelector(".liked-articles-button")
  let analysisContainer = document.querySelector(".analysis-container");
  let likedContainer = document.querySelector(".liked-container")
  window.addEventListener("load", () => {
    analyzedButton.classList.add("selected-btn")
    analysisContainer.style.display = 'block';
    likedContainer.style.display = "none"
  })

  likedButton.addEventListener("click", () => {
    analyzedButton.classList.remove("selected-btn")
    likedButton.classList.add("selected-btn")
    analysisContainer.style.display = "none"
    likedContainer.style.display = "block"
  })

  analyzedButton.addEventListener("click", () => {
    likedButton.classList.remove("selected-btn")
    analyzedButton.classList.add("selected-btn")
    analysisContainer.style.display = "block"
    likedContainer.style.display = "none"
  })

}

analyzedLikedShowcase()