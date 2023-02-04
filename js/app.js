const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function previewImage(img){
    let source = img.src;
    let index = source.indexOf("_");
    let imageID = source.substring(index - 2,index);
    if(imageID.slice(0,1) !== "0"){
        setImage(imageID);
    }else {
        setImage(imageID.slice(1));
    }
}

function setImage(imageID){
    document.getElementById("previewImage").src = "/assets/websites/Sample "+imageID+".jpg";
    $('#btnTrigger').click();
}