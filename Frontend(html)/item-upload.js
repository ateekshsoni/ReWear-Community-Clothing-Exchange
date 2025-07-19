// Main JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  console.log("ReWear - Add Item page loaded");

  // Variables
  const form = document.getElementById("item-listing-form");
  const photoInput = document.getElementById("photo-input");
  const uploadArea = document.getElementById("upload-area");
  const photoPreviews = document.getElementById("photo-previews");
  const photoCounter = document.getElementById("photo-count");
  const categorySelect = document.getElementById("item-category");
  const typeSelect = document.getElementById("item-type");
  const sizeGuideBtn = document.getElementById("size-guide-btn");
  const sizeChartModal = document.getElementById("size-chart-modal");
  const closeModal = document.querySelector(".close-modal");
  const tagInput = document.getElementById("tag-input");
  const addTagBtn = document.getElementById("add-tag-btn");
  const tagsContainer = document.getElementById("tags-container");

  // Photo Upload Handling
  uploadArea.addEventListener("click", () => photoInput.click());

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#4caf50";
    uploadArea.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.borderColor = "#dee2e6";
    uploadArea.style.backgroundColor = "transparent";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#dee2e6";
    uploadArea.style.backgroundColor = "transparent";

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });

  photoInput.addEventListener("change", () => {
    if (photoInput.files.length > 0) {
      handleFiles(photoInput.files);
    }
  });

  function handleFiles(files) {
    const currentPhotos = document.querySelectorAll(".photo-preview").length;
    const remainingSlots = 8 - currentPhotos;

    if (remainingSlots <= 0) {
      showNotification("Maximum 8 photos allowed", "error");
      return;
    }

    const filesToAdd = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToAdd; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        showNotification("Please upload only image files", "error");
        continue;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const photoPreview = document.createElement("div");
        photoPreview.className = "photo-preview";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Item photo preview";

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", function () {
          photoPreview.remove();
          updatePhotoCounter();
        });

        photoPreview.appendChild(img);
        photoPreview.appendChild(removeBtn);
        photoPreviews.appendChild(photoPreview);

        updatePhotoCounter();
      };

      reader.readAsDataURL(file);
    }
  }

  function updatePhotoCounter() {
    const count = document.querySelectorAll(".photo-preview").length;
    photoCounter.textContent = count;

    // Visual indication if minimum photos requirement is met
    if (count >= 3) {
      photoCounter.style.color = "#28a745";
    } else {
      photoCounter.style.color = "#6c757d";
    }
  }

  // Category and Type Selection Logic
  const typeOptions = {
    tops: [
      "T-Shirt",
      "Blouse",
      "Shirt",
      "Sweater",
      "Tank Top",
      "Crop Top",
      "Hoodie",
    ],
    bottoms: ["Jeans", "Pants", "Shorts", "Skirt", "Leggings", "Joggers"],
    dresses: ["Mini Dress", "Midi Dress", "Maxi Dress", "Jumpsuits", "Rompers"],
    outerwear: ["Jacket", "Coat", "Blazer", "Cardigan", "Vest", "Parka"],
    shoes: ["Sneakers", "Boots", "Heels", "Flats", "Sandals", "Loafers"],
    accessories: ["Bags", "Jewelry", "Hats", "Scarves", "Belts", "Sunglasses"],
  };

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    // Clear existing options
    typeSelect.innerHTML = "";
    typeSelect.disabled = false;

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a type";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    typeSelect.appendChild(defaultOption);

    // Add type options based on selected category
    if (selectedCategory in typeOptions) {
      typeOptions[selectedCategory].forEach((type) => {
        const option = document.createElement("option");
        option.value = type.toLowerCase().replace(" ", "-");
        option.textContent = type;
        typeSelect.appendChild(option);
      });
    }
  });

  // Size Chart Modal
  sizeGuideBtn.addEventListener("click", () => {
    sizeChartModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    sizeChartModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === sizeChartModal) {
      sizeChartModal.style.display = "none";
    }
  });

  // Tags Management
  addTagBtn.addEventListener("click", addTag);

  tagInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  });

  function addTag() {
    const tagText = tagInput.value.trim();

    if (tagText === "") {
      return;
    }

    // Check if tag already exists
    const existingTags = Array.from(tagsContainer.querySelectorAll(".tag")).map(
      (tag) => tag.textContent.trim().slice(0, -1)
    );

    if (existingTags.includes(tagText)) {
      showNotification("This tag already exists", "error");
      return;
    }

    // Limit to 10 tags
    if (existingTags.length >= 10) {
      showNotification("Maximum 10 tags allowed", "error");
      return;
    }

    // Create tag element
    const tag = document.createElement("div");
    tag.className = "tag";

    const tagContent = document.createElement("span");
    tagContent.textContent = tagText;

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () => tag.remove());

    tag.appendChild(tagContent);
    tag.appendChild(removeBtn);
    tagsContainer.appendChild(tag);

    // Clear input
    tagInput.value = "";
    tagInput.focus();
  }

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    const photoCount = document.querySelectorAll(".photo-preview").length;
    if (photoCount < 3) {
      showNotification("Please upload at least 3 photos", "error");
      return;
    }

    // Gather form data
    const formData = {
      title: document.getElementById("item-title").value,
      brand: document.getElementById("item-brand").value,
      category: categorySelect.value,
      type: typeSelect.value,
      size: document.getElementById("item-size").value,
      condition: document.querySelector('input[name="condition"]:checked')
        ?.value,
      description: document.getElementById("item-description").value,
      tags: Array.from(tagsContainer.querySelectorAll(".tag")).map((tag) =>
        tag.textContent.trim().slice(0, -1)
      ),
    };

    console.log("Form submitted:", formData);

    // Show success message
    showNotification("Item submitted for review!", "success");

    // Reset form after submission
    setTimeout(() => {
      form.reset();
      photoPreviews.innerHTML = "";
      tagsContainer.innerHTML = "";
      updatePhotoCounter();
      typeSelect.innerHTML =
        '<option value="" disabled selected>Select a category first</option>';
      typeSelect.disabled = true;
    }, 2000);
  });

  // Notification System
  function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);

    // Auto hide after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";

      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Add notification styles
  const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .notification.success {
            background-color: #28a745;
        }
        .notification.error {
            background-color: #dc3545;
        }
    `;

  const styleElement = document.createElement("style");
  styleElement.textContent = notificationStyles;
  document.head.appendChild(styleElement);
});
