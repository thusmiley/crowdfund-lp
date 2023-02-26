const popupOverlay = document.querySelector("#popup-overlay");
const hamMenu = document.querySelector(".ham");
const popup = document.getElementById("popup");
const closeMenu = document.querySelector(".close-menu");
const nav = document.getElementById("nav");
const bookmark = document.querySelector(".bookmark");
const bookmarkLabel = document.querySelector(".bm-label");
const closeModal = document.querySelector(".modal-close");
const selectBtns = document.querySelectorAll(".select");
const rewardBtns = {
  btn1: "#bamboo",
  btn2: "#black",
  btn3: "#mahogany",
};
const selects = document.querySelectorAll(".radio input");
const continueBtns = document.querySelectorAll(".option button");
const inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 };
const confirmBtn = document.querySelector("#thankyou");

// Open/close mobile menu
function openNav() {
  document.getElementById("mobile-nav").style.width = "100%";
  hamMenu.classList.add("active");
  closeMenu.classList.add("active");
  nav.classList.add("active");
}

function closeNav() {
  document.getElementById("mobile-nav").style.width = "0%";
  hamMenu.classList.remove("active");
  closeMenu.classList.remove("active");
  nav.classList.remove("active");
}

// Bookmark
bookmark.addEventListener("click", () => {
  bookmark.classList.toggle("active");
  if (bookmark.classList.contains("active")) {
    bookmarkLabel.innerHTML = "Bookmarked";
  } else {
    bookmarkLabel.innerHTML = "Bookmark";
  }
});

// Open popup modal
selectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleModal();
    if (btn.classList.contains("reward")) {
      const inputID = rewardBtns[btn.id];
      const checkedOption = document.querySelector(inputID);
      checkedOption.checked = true;
      selectNew(checkedOption);
    }
  });
});

const toggleModal = () => {
  popup.classList.toggle("active");
  popupOverlay.classList.toggle("active");
};

window.addEventListener("click", function (event) {
  if (event.target.id == "popup-overlay") {
    popup.classList.remove("active");
    popupOverlay.classList.remove("active");
    clearSelect();
  }
});

closeModal.addEventListener("click", () => {
  resetModal();
  toggleModal();
});

const resetModal = () => {
  setTimeout(() => {
    clearSelect();
    closeModal.scrollIntoView();
  }, 500);
};

// Option Selection
selects.forEach((select) => {
  select.addEventListener("change", () => {
    clearSelect();
    selectNew(select);
  });
});

const selectNew = (select) => {
  const parentSelection = select.parentElement.parentElement;
  parentSelection.classList.toggle("active");
  const pledge = document.querySelector(".option.active .enter-pledge-wrapper");
  pledge.style.maxHeight = pledge.scrollHeight + "px";
  select.checked = true;
  setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500);
};

const clearSelect = () => {
  const currentSelection = document.querySelector(".option.active");
  if (currentSelection) {
    const radio = document.querySelector(".option.active .radio input");
    const pledge = document.querySelector(
      ".option.active .enter-pledge-wrapper"
    );
    const currentInput = document.querySelector(
      ".option.active .enter-pledge-wrapper input"
    );
    currentSelection.classList.remove("active");
    radio.checked = false;
    pledge.style.maxHeight = 0;
    setTimeout(() => {
      currentInput.parentElement.parentElement.classList.remove("error");
      currentInput.value = "";
    }, 500);
  }
};

// Continue buttons
continueBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.querySelector(".option.active .enter-pledge input");
    const inputId = input.id;
    pledge = Number(input.value);
    if (!pledge || pledge < inputConditions[inputId]) {
      input.parentElement.parentElement.classList.add("error");
    } else {
      input.parentElement.parentElement.classList.remove("error");
      resetModal();
      popup.classList.toggle("active");
      setTimeout(() => {
        confirmBtn.classList.toggle("active");
      }, 700);
    }
  });
});

// Thank you popup
confirmBtn.addEventListener("click", () => {
  confirmBtn.classList.toggle("active");
  popupOverlay.classList.toggle("active");
});
