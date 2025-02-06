// Selecting elements
const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const keywordInput = document.getElementById("keywordInput");
const generateBtn = document.getElementById("generateBtn");
const captionResult = document.getElementById("captionResult");

// Function to preview uploaded image
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

// Function to call the API and generate a caption
generateBtn.addEventListener("click", async function () {
  const keywords = keywordInput.value.trim();

  if (!keywords) {
    captionResult.innerHTML = "⚠ Please enter some keywords!";
    return;
  }

  captionResult.innerHTML = "⏳ Generating caption...";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: keywords }),
      }
    );

    const data = await response.json();

    if (response.ok && data.length > 0) {
      captionResult.innerHTML = `✨ ${data[0].generated_text}`;
    } else {
      captionResult.innerHTML = "⚠ Error generating caption. Try again!";
    }
  } catch (error) {
    captionResult.innerHTML = "⚠ Network Error! Please try again.";
  }
});
