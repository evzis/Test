(() => {
  let streaming = false;
  let stream;
  let currentDeviceId = null;
  let isUsingFrontCamera = true;
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const launchCamera = document.querySelector(".launchCamera");
  const takePic = document.querySelector(".takePic");
  const goBackButton = document.querySelector(".goBack");
  const fileInput = document.getElementById("file-input");
  const sharePic = document.querySelector(".sharePic");
  const newPic = document.querySelector(".newPic");
  const selectCamera = document.querySelector(".custom-select");

  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === "videoinput");

    // Populate the select element with available cameras
    videoDevices.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Camera ${index + 1}`;
      selectCamera.appendChild(option);
    });

    // Listen for camera selection change
    selectCamera.addEventListener("change", () => {
      currentDeviceId = selectCamera.value;
      if (stream) {
        stopStream();
        requestCameraPermission();
      }
    });
  }

  const askCameraPermission = async function () {
    await requestCameraPermission();
    launchCamera.style.display = "none";
    fileInput.style.display = "none";
    video.style.display = "block";
    takePic.style.display = "inline";
    goBackButton.style.display = "inline";
    selectCamera.style.display = "inline";
  };

  async function requestCameraPermission() {
    try {
      const constraints = {
        video: { deviceId: currentDeviceId ? { exact: currentDeviceId } : undefined },
        audio: false,
      };
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
    canvas.style.display = "block";
    sharePic.style.display = "inline";
    newPic.style.display = "inline";
  }

  function goBack() {
    stopStream();
    video.style.display = "none";
    canvas.style.display = "none";
    takePic.style.display = "none";
    goBackButton.style.display = "none";
    sharePic.style.display = "none";
    newPic.style.display = "none";
    launchCamera.style.display = "inline";
    fileInput.style.display = "inline";
    selectCamera.style.display = "none";
    selectCamera.style.display = "inline";
  }

  function takeNewPhoto() {
    canvas.style.display = "none";
    video.style.display = "block";
    takePic.style.display = "inline";
    sharePic.style.display = "none";
    newPic.style.display = "none";
  }

  function stopStream() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }

  // Attach event listeners
  launchCamera.addEventListener("click", askCameraPermission);
  takePic.addEventListener("click", capturePhoto);
  goBackButton.addEventListener("click", goBack);
  newPic.addEventListener("click", takeNewPhoto);

  // Initialize device selection
  getDevices();
})();


