const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");
const imgBox = document.getElementById("imgBox");
const downloadBtn = document.getElementById("downloadBtn");
const themeToggle = document.getElementById("themeToggle");
const modeLabel = document.getElementById("modeLabel");

qrText.addEventListener("input", () => {
  const data = qrText.value.trim();
  if (data) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    imgBox.style.opacity = 1;
    downloadBtn.disabled = false;
  } else {
    imgBox.style.opacity = 0;
    downloadBtn.disabled = true;
  }
});

downloadBtn.addEventListener("click", async () => {
  const inputText = qrText.value.trim();

  if (inputText) {
    // Sanitize input text to create a valid file name
    const sanitizedText = inputText.replace(/[^a-zA-Z0-9-_]/g, "_");

    // Fetch the image as a Blob
    const response = await fetch(qrImage.src);
    const blob = await response.blob();

    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${sanitizedText}.png`; // Name the file based on input text
    link.click();
  }
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  modeLabel.textContent = document.body.classList.contains("light") ? "Light Mode" : "Dark Mode";
});
