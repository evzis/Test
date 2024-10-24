
(() => {
  
  const streaming = false;
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const launchCamera = document.querySelector(".launchCamera");
  const takePic = document.querySelector(".takePic");
  const goBackButton = document.querySelector(".goBack");
  const fileInput = document.getElementById("file-input");


  const width = 320;
  let height = 0;

  
  const askCameraPermission = async function(){
    await requestCameraPermission();
    launchCamera.style.display = "none";
    fileInput.style.display = "none";
    video.style.display = "block";
    takePic.style.display ="inline";
    goBackButton.style.display = "inline";
};

  async function requestCameraPermission() {
    try{
    const constraints = {video: true, audio: false};
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.play();
    
    video.addEventListener("loadedmetadata", ()=> {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
    });
  } catch (error){
    console.error("Error accessing the camera: ", error);
  }
} 

function capturePhoto(){
  canvas.style.display = "inline";
  const context = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);
  const imageData = canvas.toDataURL("image/png");
  photo.setAttribute("src", imageData);
}

function goBack(){
video.srcObject.getTracks().forEach((track) => track.stop());
video.style.display= "none";
canvas.style.display = "none";
takePic.style.display = "none";
goBackButton.style.display = "none";
launchCamera.style.display = "inline";
fileInput.style.display = "inline";
}

launchCamera.addEventListener("click", askCameraPermission);
takePic.addEventListener("click", capturePhoto);
goBackButton.addEventListener("click", goBack);
})();

