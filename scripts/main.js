// function insertName() {
//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {
//       // Do something for the currently logged-in user here:
//       console.log(user.uid);
//       console.log(user.displayName);
//       user_Name = user.displayName;

//       //method #1:  insert with html only
//       //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
//       //method #2:  insert using jquery
//       $("#name-goes-here").text(user_Name); //using jquery
//     } else {
//       // No user is signed in.
//     }
//   });
// }
// insertName(); //run the function

firebase.auth().onAuthStateChanged((user) => {
  // Check if a user is signed in:
  let loginButton = document.querySelector(".log-in-button")
  let userButton = document.querySelector(".user-profile-button")
  if (user) {
    // Do something for the currently logged-in user here:
    console.log(user.uid);
    console.log(user.displayName);
    
    loginButton.style.display = "none";
    userButton.style.display = "inline"

    //method #1:  insert with html only
    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
    //method #2:  insert using jquery
    // $("#name-goes-here").text(user_Name); //using jquery
  } else {
    // No user is signed in.
    loginButton.style.display = "inline";
    userButton.style.display = "none"
  }
});

function logOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}