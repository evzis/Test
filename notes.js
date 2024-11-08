
export class SmetioPhotoCaptureApp {

    constructor() {
  
      this.mainClass = "smetio-photo-capture-app-" + this.id;
      this.mainAttributes = {
        class: ["smetio-photo-capture-app", this.mainClass],
      };
      this.video = document.getElementById("video");
      this.canvas = document.getElementById("canvas");
      this.photo = document.getElementById("photo");
      this.launchCamera = document.querySelector(".launchCamera");
      this.takePic = document.querySelector(".takePic");
      this.goBackButton = document.querySelector(".goBack");
      this.fileInput = document.getElementById("file-input");
      this.sharePic = document.querySelector(".sharePic");
      this.newPic = document.querySelector(".newPic");
  
      this.launchCamera.addEventListener("click", () => this.askCameraPermission());
      this.takePic.addEventListener("click", () => this.capturePhoto());
      this.goBackButton.addEventListener("click", () => this.goBack());
      this.newPic.addEventListener("click", () => this.takeNewPhoto());
    };
startScreen(){
    return `
      <h1> I AM THE CAPTURE APP </h1>

      <input type="file" accept="image/*" id="file-input">
      <button class="takePic">Take picture </button>    
    `
  };

  goBack(){
    const startUi = this.startScreen();
    $("."+this.mainClass).html(startUi);
  }

  getUiForTakingPicture() {

    const startUi = this.startScreen();

    return `
      <div class="${this.mainClass}" >
        ${startUi}
      </div>
    `;
  }

  render() {

    

    this.events();

    return this.getUiForTakingPicture();

    // return `
    //     <div class="smetio-photo-capture-app">
    //       <h1> I AM THE PHOTO capture </h1>
    //     </div>
    //   `;

  };


  takePicture() {
    
    const takePicUi = `
      WOW PICTURE IS TAKEN
      <button class="goBack"> Go back </button>
    `;

    $("."+this.mainClass).html(takePicUi);
  };

  events() {

    $("body").on("mousedown", ".takePic", () => {

      this.takePicture();

    });

    $("body").on("mousedown", ".goBack", () => {

      this.goBack();

    });

  };

};
