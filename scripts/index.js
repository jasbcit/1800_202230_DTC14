

function saveText() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user

        //if the data fields are not empty, then write them in to the form.
        let userInput = document.querySelector("#user-input").value;
        db.collection("savedWriting").doc(user.uid).set({
          text: userInput,
          user: user.uid
        });
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}
