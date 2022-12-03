var currentUser;
firebase.auth().onAuthStateChanged(user => {
  // checks if user is logged in 
  if (user) {
    // if a user is logged in retrieves the user id from Firestore.
    currentUser = db.collection("users").doc(user.uid);
  } else {
  }
});

function writeArticles() {
  //define a variable for the collection you want to create in Firestore to populate data
  var articlesRef = db.collection("articles");

  // This function adds all the necessary article information to the fire store.
  articlesRef.add({
    code: "A1",
    name: "Make Time to Write: Overcome Your Excuses",
    details:
      "After a full day of work,Guest Posting family and life, you fall into bed exhausted.",
    link: '<a href="https://www.articlesfactory.com/articles/writing/make-time-to-write-overcome-your-excuses.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A2",
    name: "Three Proven Ways to Handle Your Writing Anxiety",
    details: "Discover how to get rid of the writing anxiety once and for all!",
    link: '<a href="https://www.articlesfactory.com/articles/writing/three-proven-ways-to-handle-your-writing-anxiety.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A3",
    name: "The Myth of the Writing Fairy",
    details:
      "Here’s a fun question to ponder. What do The Stand, The Hobbit and A Christmas Carol all have in common?",
    link: '<a href="https://www.articlesfactory.com/articles/writing/the-myth-of-the-writing-fairy.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A4",
    name: "The Benefits of Journal Writing",
    details:
      "Everyday we experience many different events. Some good, some bad, some memorable and some that can be forgotten the next day.",
    link: '<a href="https://www.articlesfactory.com/articles/writing/the-benefits-of-journal-writing.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A5",
    name: "Basic Steps To Plan Academic Dissertation Writing",
    details:
      "Let us talk a bit about what SEO is before we get into the SEO article writing guidelines for those that may be new or do not quite understand it.",
    link: '<a href="https://www.articlesfactory.com/articles/education/basic-steps-to-plan-an-academic-dissertation-writing.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A6",
    name: "Writer’s Web Resources",
    details:
      "The Internet has truly revolutionized the careers of writers worldwide. Now you can work for publishers,Guest Posting corporations and a whole range of other clients on a truly global scale.",
    link: '<a href="https://www.articlesfactory.com/articles/writing/writers-web-resources.html" class="btn btn-outline-success btn-sm">Read More</a>',
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function displayCards(collection) {
  // This function retrieves the article information previously added to Firestore to display it on the explore page.
  let cardTemplate = document.getElementById("articleCardTemplate");
  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var articleID = doc.data().code; //get unique ID to each article to be used for fetching right image
        let newcard = cardTemplate.content.cloneNode(true);
        let link = doc.data().link
        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(
          ".card-image"
        ).src = `./images/explore-images/${articleID}.jpg`; //Example: NV01.jpg
        newcard.querySelector(".read-more-link").innerHTML = link
        newcard.querySelector('i').id = 'save-' + articleID;
        newcard.querySelector("i").onclick = () => saveBookmark(articleID);
        if (typeof (currentUser) != "undefined") {
          currentUser.get().then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            if (bookmarks.includes(articleID)) {
              let iconID = 'save-' + articleID
              document.getElementById(iconID).classList.add("fa-heart")
              document.getElementById(iconID).classList.remove("fa-heart-o")
            }
          })
        }
        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}

displayCards("articles");

function saveBookmark(articleID) {
  // Checks if the user has saved an article
  currentUser.set({
    bookmarks: firebase.firestore.FieldValue.arrayUnion(articleID)
  }, {
    merge: true
  })
    .then(function () {
      let iconID = 'save-' + articleID
      document.getElementById(iconID).classList.remove("fa-heart-o")
      document.getElementById(iconID).classList.add("fa-heart")
    });
}