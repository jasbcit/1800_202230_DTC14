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
