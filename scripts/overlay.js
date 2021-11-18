let overlay = document.getElementsByClassName("overlay")[0];
let popup = document.getElementsByClassName("popup")[0];
let prev_btn = document.getElementsByClassName("previous")[0];
let next_btn = document.getElementsByClassName("next")[0];
let close_btn = document.getElementsByClassName("close")[0];
let overlay_active = false;
var active_img;
var prev_img;
var next_img;

function hideOverlay() {
  overlay.style.visibility = "hidden";
  overlay.style.opacity = 0;
  overlay_active = false;
  console.log(overlay_active);

  // active_img.style.visibility = "hidden";
  // active_img.style.opacity = 0;
  active_img = null;
}

// function activatePopup(popup) {
//   if (active_img != null) {
//     active_img.style.visibility = "hidden";
//     active_img.style.opacity = 0;
//   }
//   popup.style.visibility = "visible";
//   popup.style.opacity = 1;
//   active_img = popup;
//
//   let prev_container = popup.parentElement.previousElementSibling;
//   if (prev_container == null) {
//     prev_btn.style.visibility = "hidden";
//     prev_btn.style.opacity = 0;
//     prev_img = null;
//   } else {
//     prev_btn.style.visibility = "visible";
//     prev_btn.style.opacity = 1;
//     prev_img = prev_container.children[1];
//   }
//
//   let next_container = popup.parentElement.nextElementSibling;
//   if (next_container == null) {
//     next_btn.style.visibility = "hidden";
//     next_btn.style.opacity = 0;
//     next_img = null;
//   } else {
//     next_btn.style.visibility = "visible";
//     next_btn.style.opacity = 1;
//     next_img = next_container.children[1];
//   }
// }

function activatePopup(thumb) {
  let thumb_src = thumb.getAttribute("src");
  let src = thumb_src.substring(0, thumb_src.length - 10) + ".png"; // replaces x_thumb.jpg with x.png
  let alt = thumb.getAttribute("alt");
  popup.style.backgroundImage = "url(\"" + src + "\")";
  popup.setAttribute("alt", alt);
  active_img = thumb;

  let prev_container = thumb.parentElement.previousElementSibling;
  if (prev_container == null) {
    prev_btn.style.visibility = "hidden";
    prev_btn.style.opacity = 0;
    prev_img = null;
  } else {
    prev_btn.style.visibility = "visible";
    prev_btn.style.opacity = 1;
    prev_img = prev_container.children[0];
  }

  let next_container = thumb.parentElement.nextElementSibling;
  if (next_container == null) {
    next_btn.style.visibility = "hidden";
    next_btn.style.opacity = 0;
    next_img = null;
  } else {
    next_btn.style.visibility = "visible";
    next_btn.style.opacity = 1;
    next_img = next_container.children[0];
  }
}

// add onclick event to gallery thumbnails to activate overlay
let thumbnails = document.getElementsByClassName("thumbnail");
for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].onclick = function() {
    if (overlay_active == false) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = 1;
      overlay_active = true;
      console.log(overlay_active);

      // let popup = this.nextElementSibling;
      // popup.style.visibility = "visible";
      // popup.style.opacity = 1;
      // active_img = popup;
      //
      // let img_container = popup.parentElement;
      //
      // let prev_container = img_container.previousElementSibling;
      // if (prev_container == null) {
      //   prev_img = null;
      //   prev_btn.style.visibility = "hidden";
      //   prev_btn.style.opacity = 0;
      // } else {
      //   prev_img = prev_container.children[1];
      //   prev_btn.style.visibility = "visible";
      //   prev_btn.style.opacity = 1;
      // }
      //
      // let next_container = img_container.nextElementSibling;
      // if (next_container == null) {
      //   next_img = null;
      //   next_btn.style.visibility = "hidden";
      //   next_btn.style.opacity = 0;
      // } else {
      //   next_img = next_container.children[1];
      //   next_btn.style.visibility = "visible";
      //   next_btn.style.opacity = 1;
      // }


      // let popup = this.nextElementSibling;
      // activatePopup(popup);
      activatePopup(this);
    }
  }
}

// add onlick event to close buttons to disable overlay
close_btn.onclick = hideOverlay;

// close overlay when 'esc' key is pressed
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 27) {
    if (overlay_active == true) {
      hideOverlay();
    }
  }
}, false);

// add onclick event to previous button to switch image
prev_btn.onclick = function() {
  activatePopup(prev_img);
}

// add onclick event to left arrow key to switch image
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) {
    if (overlay_active && prev_img != null) {
      activatePopup(prev_img);
    }
  }
}, false);

// add onclick event to next button to switch image
next_btn.onclick = function() {
  activatePopup(next_img);
}

// add onclick event to right arrow key to switch image
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    if (overlay_active && next_img != null) {
      activatePopup(next_img);
    }
  }
}, false);

// set initial class for popup
const oWindowSizeThresh = 800;
let oBelowThresh = false;
function setPopupClass() {
  if (window.innerWidth < oWindowSizeThresh || window.innerHeight < oWindowSizeThresh) {
    popup.className = "popup popup-small-screen";
    oBelowThresh = true;
  } else {
    popup.className = "popup popup-large-screen";
    oBelowThresh = false;
  }
}
setPopupClass();

// change popup class when screen is small\
window.addEventListener("resize", function() {
  if (((window.innerWidth > oWindowSizeThresh || window.innerHeight > oWindowSizeThresh) && oBelowThresh)
      || ((window.innerWidth <= oWindowSizeThresh || window.innerHeight <= oWindowSizeThresh) && !oBelowThresh)) {
    console.log("window change o");
    setPopupClass();
  }
});
