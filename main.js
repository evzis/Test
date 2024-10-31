(() => {
  
  const streaming = false;
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const launchCamera = document.querySelector(".launchCamera");
  const takePic = document.querySelector(".takePic");
  const goBackButton = document.querySelector(".goBack");
  const fileInput = document.getElementById("file-input");
  const savePic = document.querySelector(".savePic");
  const newPic = document.querySelector(".newPic");
  
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
  const context = canvas.getContext("2d");
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);
  const imageData = canvas.toDataURL("image/png");
  photo.setAttribute("src", imageData);
  
   canvas.style.display = "inline";
   video.style.display = "none";
  takePic.style.display ="none";
  canvas.style.display = "block";
  savePic.style.display ="inline";
  newPic.style.display ="inline";
}

function goBack(){
video.srcObject.getTracks().forEach((track) => track.stop());
video.style.display= "none";
canvas.style.display = "none";
takePic.style.display = "none";
goBackButton.style.display = "none";
savePic.style.display ="none";
newPic.style.display ="none";
launchCamera.style.display = "inline";
fileInput.style.display = "inline";
}

function takeNewPhoto(){
  canvas.style.display = "none";
  video.style.display ="block";
  takePic.style.display ="inline"
  savePic.style.display ="none";
  newPic.style.display ="none";
}

launchCamera.addEventListener("click", askCameraPermission);
takePic.addEventListener("click", capturePhoto);
goBackButton.addEventListener("click", goBack);
newPic.addEventListener("click", takeNewPhoto);
})();