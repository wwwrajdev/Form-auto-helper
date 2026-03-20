// === CONFIG ===
const POST_CODE_LABEL = "Post Code";
const COMMENT_LABEL = "Comments Link";
const STORAGE_KEY = "auto_post_code_counter";

// === FIND INPUT BY LABEL ===
function findInput(labelText) {
  const labels = document.querySelectorAll(".M7eMe");
  for (let label of labels) {
    if (label.innerText.trim().includes(labelText)) {
      const parent = label.closest(".geS5n");
      return parent?.querySelector("input");
    }
  }
  return null;
}

// === STORAGE HANDLING ===
function getStoredNumber() {
  return parseInt(localStorage.getItem(STORAGE_KEY) || "1");
}

function setStoredNumber(val) {
  localStorage.setItem(STORAGE_KEY, val);
}

// === CREATE TOUCH UI ===
function createControls(input) {
  if (!input || input.dataset.modified) return;

  input.type = "number";
  input.dataset.modified = "true";

  // Load saved value
  let current = getStoredNumber();
  input.value = current;

  const wrapper = document.createElement("div");
  wrapper.className = "custom-controls";

  // BUTTONS
  const btnCheck = document.createElement("button");
  btnCheck.innerText = "✔";

  const btnPlus = document.createElement("button");
  btnPlus.innerText = "+";

  const btnReset = document.createElement("button");
  btnReset.innerText = "RESET";

  // === TOUCH SUPPORT ===
  [btnCheck, btnPlus, btnReset].forEach(btn => {
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      btn.click();
    });
  });

  // === ACTIONS ===

  // ✔ Save current and prepare next
  btnCheck.onclick = () => {
    let val = parseInt(input.value || 0);
    setStoredNumber(val + 1); // next number on reload
  };

  // + increment live
  btnPlus.onclick = () => {
    let val = parseInt(input.value || 0) + 1;
    input.value = val;
  };

  // RESET counter
  btnReset.onclick = () => {
    setStoredNumber(1);
    input.value = 1;
  };

  wrapper.append(btnCheck, btnPlus, btnReset);
  input.parentElement.appendChild(wrapper);
}

// === CLIPBOARD AUTO DETECT ===
let lastClipboard = "";

async function monitorClipboard() {
  try {
    const text = await navigator.clipboard.readText();

    if (text && text !== lastClipboard) {
      lastClipboard = text;

      const commentInput = findInput(COMMENT_LABEL);
      if (commentInput) {
        commentInput.value = text;
        commentInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  } catch (e) {}
}

// === INIT LOOP ===
setInterval(() => {
  const postInput = findInput(POST_CODE_LABEL);
  createControls(postInput);
  monitorClipboard();
}, 1200);
