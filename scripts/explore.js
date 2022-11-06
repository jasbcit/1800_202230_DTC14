function writeArticles() {
  //define a variable for the collection you want to create in Firestore to populate data
  var articlesRef = db.collection("articles");

  articlesRef.add({
    code: "A1",
    name: "Make Time to Write: Overcome Your Excuses",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A2",
    name: "Three Proven Ways to Handle Your Writing Anxiety",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A3",
    name: "The Myth of the Writing Fairy",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A4",
    name: "The Benefits of Journal Writing",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A5",
    name: "Basic Steps To Plan Academic Dissertation Writing",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  articlesRef.add({
    code: "A6",
    name: "Writer’s Web Resources",

    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function displayCards(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var hikeID = doc.data().code; //get unique ID to each hike to be used for fetching right image
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(".card-image").src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

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

displayCards("hikes");
