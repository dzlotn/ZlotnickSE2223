// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import { getDatabase, ref, set,update,child,get,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDnuQcSFKiwYGOwzkCL9im6KNRE__7bcWU",
    authDomain: "researchwebsite-837b5.firebaseapp.com",
    databaseURL: "https://researchwebsite-837b5-default-rtdb.firebaseio.com",
    projectId: "researchwebsite-837b5",
    storageBucket: "researchwebsite-837b5.appspot.com",
    messagingSenderId: "559375517927",
    appId: "1:559375517927:web:d6a1e591efad6db2b1fa42"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize authentication
  const auth = getAuth()
  // return instance of yuor app's firebase real time database (FRD) 
  const db = getDatabase(app)


// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink') //user name for navbar
let signOutLink = document.getElementById('signOut'); //sign out link
let welcome = document.getElementById('welcome') //welcome header
let currentUser = null;//initialize currentUser to null





// ----------------------- Get User's Name'Name ------------------------------
function getUserName(){
  //Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  //Grab user information passed form signIn.js
  if(keepLoggedIn == "yes"){
    currentUser = JSON.parse(localStorage.getItem('user'));

  }
  else{
    currentUser = JSON.parse(sessionStorage.getItem('user'));
   
  }
}
function signOutUser(){
  sessionStorage.removeItem('user')   //clear session storage
  localStorage.removeItem('user')     //clear local storage
  localStorage.removeItem('keepLoggedIn'); 
  signOut(auth).then(()=>{
    window.location = "index.html"; //browser redirect to home page
    alert("The user has successfully logged out.")

  }).catch((error) =>{
    //error occured
    alert("There was an error logging out")
  })
}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// -------------------------Update data in database --------------------------
function updateData(userID,year,month,day,temperature){
  //must use brackets around variable name to use it as a key dumbo
      update(ref(db,'users/'+userID+'/data/'+year+'/'+month),{
        [day]: temperature
      })
      .then(()=>{
        alert("Data updated successfully.")
      })
      .catch((error)=>{
        alert("There was an error. Error: " +error)
      });
  }

// --------------------------- Home Page Loading -----------------------------

window.onload = function(){
// ------------------------- Set Welcome Message -------------------------
  getUserName();
  if(currentUser == null){
  userLink.innerText = "Register New Account";
  userLink.classList.replace("nav-link","btn");
  userLink.classList.add("btn-primary")
  userLink.href = "register.html";

  signOutLink.innerText = "Sign In"
  signOutLink.classList.replace("nav-link","btn")
  signOutLink.classList.add("btn-success");
  signOutLink.href = "signIn.html";
  }
  else{
      userLink.innerText = currentUser.firstname;
      welcome.innerText = "Welcome "+currentUser.firstname;
      userLink.classList.replace("btn","nav_link");
      userLink.classList.add("btn-primary")
      userLink.href = "#";

      signOutLink.innerText = "Sign Out"
      signOutLink.classList.replace("btn","nav_link")
      signOutLink.classList.add("btn-success");
      document.getElementById('signOut').onclick = function(){
        signOutUser();
      }
  }
  // Update data function call
  document.getElementById('update').onclick = function(){
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;
    updateData(userID,year,month,day,temperature);
  };
}

  
