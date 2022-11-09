function writeArticles() {
  //define a variable for the collection you want to create in Firestore to populate data
  var articlesRef = db.collection("articles");

  articlesRef.add({
    code: "A1",
    name: "Make Time to Write: Overcome Your Excuses",
    details:
      "By Cynthia ... a full day of work, family and life, you fall into bed ... Mentally ticking...",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A2",
    name: "Three Proven Ways to Handle Your Writing Anxiety",
    details: "Discover how to get rid of the writing anxiety once and for all!",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A3",
    name: "The Myth of the Writing Fairy",
    details:
      "Here’s a fun question to ponder. What do The Stand, The Hobbit and A ... Carol all have in common?",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A4",
    name: "The Benefits of Journal Writing",
    details:
      "Everyday we experience many different events. Some good, some bad, some memorable and some that can be forgotten the next day.",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A5",
    name: "Basic Steps To Plan Academic Dissertation Writing",
    details:
      "Let us talk a bit about what SEO is before we get into the SEO article writing guidelines for those that may be new or do not quite understand it.",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A6",
    name: "Writer’s Web Resources",
    details:
      "The Internet has truly ... the careers of writers ... Now you can work for ... ... and a whole range of other clients on a truly global scale. Whether you are in the",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function displayCards(collection) {
  let cardTemplate = document.getElementById("articleCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var articleID = doc.data().code; //get unique ID to each hike to be used for fetching right image
        let newcard = cardTemplate.content.cloneNode(true);
        let link = doc.data().link
        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(
          ".card-image"
        ).src = `./images/explore-images/${articleID}.jpg`; //Example: NV01.jpg
        newcard.querySelector(".read-more-link").innerHTML = link

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        //i++;   //if you want to use commented out section
      });
    });
}

displayCards("articles");