const mWindowSizeThresh = 600;
let mBelowThresh = false;
let body = document.getElementsByTagName("body")[0];
let nav = document.getElementsByTagName("nav")[0];
let menu_btn = document.getElementsByClassName("menu-btn")[0];

// set initial class for nav menu
function setMenuClass() {
  if (window.innerWidth < mWindowSizeThresh) {
    nav.className = "vert-menu-closed";
    menu_btn.innerHTML = "&#9776";
    mBelowThresh = true;
  } else {
    nav.className = "horiz-menu";
    mBelowThresh = false;
  }
}
setMenuClass();

// change nav menu class when window size changes
window.addEventListener("resize", function() {
  if ((window.innerWidth > mWindowSizeThresh && mBelowThresh)
      || (window.innerWidth <= mWindowSizeThresh && !mBelowThresh)) {
    console.log("window change m");
    setMenuClass();
    // mBelowThresh = !mBelowThresh;
  }
});

// open/close nav menu
menu_btn.onclick = function() {
  if (nav.className == "vert-menu-closed") {
    nav.className = "vert-menu-open";
    this.innerHTML = "&larr;";
    body.style.overflow = "hidden"; // disable scrolling
  } else if (nav.className == "vert-menu-open") {
    nav.className = "vert-menu-closed";
    this.innerHTML = "&#9776;";
    body.style.overflow = "visible"; // enable scrolling
  }
}

// close menu if gallery button was selected from vertical menu
let gallery_btn = nav.children[1].children[1];
gallery_btn.onclick = function() {
  if (mBelowThresh) {
    nav.className = "vert-menu-closed";
    menu_btn.innerHTML = "&#9776;";
    body.style.overflow = "visible"; // enable scrolling
  }
}
