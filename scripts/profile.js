function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    let userNameDiv = document.querySelector(".profile-user-name");
    let dateJoinedDiv = document.querySelector(".profile-date-joined")
    
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
    currentUser.get()
        .then(userDoc =>{
            let userName = userDoc.data().name
            let dateJoined = userDoc.data().datejoined
            userNameDiv.innerText = userName
            dateJoinedDiv.innerText = dateJoined
        })
    } else {
      // No user is signed in.
    }
  });
}
insertName(); //run the function