var firebaseConfig = {
  apiKey: "AIzaSyB5IAcOUT4Be-tIBhNOSGDgL1hXsiUlqtA",
  authDomain: "untitled-99538.firebaseapp.com",
  databaseURL: "https://untitled-99538-default-rtdb.firebaseio.com",
  projectId: "untitled-99538",
  storageBucket: "untitled-99538.appspot.com",
  messagingSenderId: "402851655095",
  appId: "1:402851655095:web:6be740007f4db719e14c32"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const username = prompt("Please Tell Us Your Name");
document.getElementById("message-form").addEventListener("submit", sendMessage);
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
