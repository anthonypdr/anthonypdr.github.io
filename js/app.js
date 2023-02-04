const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let imageID;

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
    if(imageID == 1){
        imageID = imageID + 50;
        setImage(imageID);
    }else {
        imageID = imageID - 1;
        setImage(imageID);
    }
}

function goNext(){
    if(imageID == 51){
        imageID = imageID - 50;
        setImage(imageID);
    }else {
        imageID = imageID + 1;
        setImage(imageID);
    }
}

function setImage(id){
    document.getElementById("previewImage").src = "/assets/websites/Sample "+id+".jpg";
}