// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Initialize new Date object in order to store the sign up date below on line 30
const date = new Date()

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //------------------------------------------------------------------------------------------
      // The code below is modified from default snippet provided by the FB documentation.
      // If the user is a "brand new" user, then create a new "user" in your own database.
      // Assign this user with the name and email provided.
      // Before this works, you must enable "Firestore" from the firebase console.
      // The Firestore rules must allow the user to write.
      //------------------------------------------------------------------------------------------
      var user = authResult.user; // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {
        //if new user
        db.collection("users")
          .doc(user.uid)
          .set({
            //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName, //"users" collection
            email: user.email, //with authenticated user's ID (user.uid)
            country: "Canada",
            school: "BCIT",
            datejoined: date.toLocaleDateString(),
            bookmarks: []
          })
          .then(function () {
            window.location.assign("index.html"); //re-direct to index.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "index.html",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);
