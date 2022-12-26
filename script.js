const cols = document.querySelectorAll(".col");

window.addEventListener('load', () => {
  console.log("load")
})

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClick(e.target.textContent);
  }
});

function generateRandomColor() {
  const codes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += codes[Math.floor(Math.random() * codes.length)];
  }
  return "#" + color;
}

function setTitleColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "#000" : "#fff";
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const title = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(title.textContent);
      return;
    }

    const color = isInitial ? colors[index] ? colors[index] : generateRandomColor() : generateRandomColor();

    if (!isInitial) {
      colors.push(color);
    }

    title.textContent = color;
    col.style.background = color;

    setTitleColor(title, color);
    setTitleColor(button, color);
  });

  updateColorsHash(colors);
}

function copyToClick(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => color.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);
