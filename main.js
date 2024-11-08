(() => {
  const streaming = false;
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const launchCamera = document.querySelector(".launchCamera");
  const takePic = document.querySelector(".takePic");
  const goBackButton = document.querySelector(".goBack");
  const fileInput = document.getElementById("file-input");
  const sharePic = document.querySelector(".sharePic");
  const newPic = document.querySelector(".newPic");

  // New elements and variables for camera toggle
  const toggleCameraButton = document.createElement("button");
  toggleCameraButton.textContent = "Switch Camera";
  document.body.appendChild(toggleCameraButton);
  toggleCameraButton.style.display = "none";
  let isUsingFrontCamera = true;
  let stream;

  const askCameraPermission = async function () {
    await requestCameraPermission();
    launchCamera.style.display = "none";
    fileInput.style.display = "none";
    video.style.display = "block";
    takePic.style.display = "inline";
    goBackButton.style.display = "inline";
    toggleCameraButton.style.display = "inline";
  };

  async function requestCameraPermission() {
    try {
      const facingMode = isUsingFrontCamera ? "user" : "environment";
      const constraints = { video: { facingMode }, audio: false };
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  }

  function capturePhoto() {
    const context = canvas.getContext("2d");
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const imageData = canvas.toDataURL("image/png");
    photo.setAttribute("src", imageData);

    video.style.display = "none";
    takePic.style.display = "none";
    toggleCameraButton.style.display = "none";
    canvas.style.display = "block";
    sharePic.style.display = "inline";
    newPic.style.display = "inline";
  }

  function goBack() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    video.style.display = "none";
    canvas.style.display = "none";
    takePic.style.display = "none";
    goBackButton.style.display = "none";
    sharePic.style.display = "none";
    newPic.style.display = "none";
    toggleCameraButton.style.display = "none";
    launchCamera.style.display = "inline";
    fileInput.style.display = "inline";
  }

  function takeNewPhoto() {
    canvas.style.display = "none";
    video.style.display = "block";
    takePic.style.display = "inline";
    sharePic.style.display = "none";
    newPic.style.display = "none";
    toggleCameraButton.style.display = "inline";
  }

  // Method to switch between front and back camera
  async function toggleCamera() {
    isUsingFrontCamera = !isUsingFrontCamera;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    await requestCameraPermission();
  }

  // Attach event listeners
  launchCamera.addEventListener("click", askCameraPermission);
  takePic.addEventListener("click", capturePhoto);
  goBackButton.addEventListener("click", goBack);
  newPic.addEventListener("click", takeNewPhoto);
  toggleCameraButton.addEventListener("click", toggleCamera);
})()