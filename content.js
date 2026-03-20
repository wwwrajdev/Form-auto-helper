function createControls(input) {
  if (!input || input.dataset.modified) return;

  input.type = "number";
  input.dataset.modified = "true";

  let current = getStoredNumber();
  input.value = current;

  // 🔧 FORCE INPUT VISIBILITY
  input.style.height = "40px";
  input.style.fontSize = "16px";
  input.style.zIndex = "2";
  input.style.position = "relative";

  // FIND SAFE PARENT
  const container = input.closest(".AgroKb");

  const wrapper = document.createElement("div");
  wrapper.className = "custom-controls";

  // BUTTONS
  const btnCheck = document.createElement("button");
  btnCheck.innerText = "✔";

  const btnPlus = document.createElement("button");
  btnPlus.innerText = "+";

  const btnReset = document.createElement("button");
  btnReset.innerText = "RESET";

  // TOUCH SUPPORT
  [btnCheck, btnPlus, btnReset].forEach(btn => {
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      btn.click();
    });
  });

  // ACTIONS
  btnCheck.onclick = () => {
    let val = parseInt(input.value || 0);
    setStoredNumber(val + 1);
  };

  btnPlus.onclick = () => {
    let val = parseInt(input.value || 0) + 1;
    input.value = val;
  };

  btnReset.onclick = () => {
    setStoredNumber(1);
    input.value = 1;
  };

  wrapper.append(btnCheck, btnPlus, btnReset);

  // ✅ INSERT AFTER INPUT BLOCK (NOT INSIDE)
  container.appendChild(wrapper);
}


