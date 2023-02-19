const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let imageID;
let maxPreviewImage = 50;
let minPreviewImage = 1;

function previewImage(image){
    let source = image.src;
    let index = source.indexOf("_");
    imageID = parseInt(source.substring(index - 2,index));

    if(imageID.toString().slice(0,1) !== "0"){
        setImage(imageID);
    }else {
        setImage(imageID.slice(1));
    }

    $('#btnTrigger').click();
}

function goPrev(){
    if(imageID == minPreviewImage){
        imageID = imageID + maxPreviewImage;
        setImage(imageID);
    }else {
        imageID = imageID - minPreviewImage;
        setImage(imageID);
    }
}

function goNext(){
    if(imageID == maxPreviewImage + 1){
        imageID = imageID - maxPreviewImage;
        setImage(imageID);
    }else {
        imageID = imageID + minPreviewImage;
        setImage(imageID);
    }
}

function setImage(id){
    $(".modal-body").scrollTop(0);
    document.getElementById("previewImage").src = "/assets/websites/Sample "+id+".jpg";
}