// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
const likeButtons = document.querySelectorAll(".like-glyph");
const errorModal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modal-message");

likeButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    mimicServerCall()
      .then(function(resp) {
        return resp;
      })
      .catch(function(err) {
        errorModal.className = "";
        modalMessage.innerText = err;
        setTimeout(function() {
          errorModal.className = "hidden";
        }, 5000);
      })
      .then(function(resolve) {
        if (
          resolve == "Pretend remote server notified of action!" &&
          button.className == "like-glyph"
        ) {
          button.innerText = FULL_HEART;
          button.className = "activated-heart";
        } else if (
          resolve == "Pretend remote server notified of action!" &&
          button.className == "activated-heart"
        ) {
          button.innerText = EMPTY_HEART;
          button.className = "like-glyph";
        }
      });
  });
});
//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
