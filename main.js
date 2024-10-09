  const element = document.querySelector(".takePic");
  
  const askCameraPermission = async function(){
    await requestCameraPermission();
}
  async function requestCameraPermission() {
    const constraints = {video: true, audio: false};
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const tracks = stream.getTracks();
    for (let i=0;i<tracks.length;i++) {
      const track = tracks[i];
      track.stop();  // stop the opened camera
    }
  }
  

element.addEventListener("click", askCameraPermission);