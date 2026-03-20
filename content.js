// === CONFIG ===
const POST_CODE_LABEL = "Post Code";
const COMMENT_LABEL = "Comments Link";

// === UTIL: find input by label ===
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

// === CREATE UI BUTTONS ===
function createControls(input) {
  if (!input || input.dataset.modified) return;

  input.type = "number";
  input.dataset.modified = "true";

  const wrapper = document.createElement("div");
  wrapper.className = "custom-controls";

  const btnCheck = document.createElement("button");
  btnCheck.innerText = "✔";

  const btnOne = document.createElement("button");
  btnOne.innerText = "1";

  const btnUp = document.createElement("button");
  btnUp.innerText = "↑";

  // Actions
  btnCheck.onclick = () => input.value = parseInt(input.value || 0);
  btnOne.onclick = () => input.value = 1;
  btnUp.onclick = () => input.value = (parseInt(input.value || 0) + 1);

  wrapper.append(btnCheck, btnOne, btnUp);

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
  } catch (e) {
    console.log("Clipboard access denied");
  }
}

// === INIT LOOP ===
setInterval(() => {
  const postInput = findInput(POST_CODE_LABEL);
  createControls(postInput);
  monitorClipboard();
}, 1500);
