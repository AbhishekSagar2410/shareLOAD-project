

// file-photo-animation

let dropZone = document.getElementById('dropZone');
let innerDiv = document.getElementById('innerDiv');
let browseBtn = document.getElementById('browseBtn');


let host= "https://shareload-project.herokuapp.com";
let uploadURL= `${host}/api/files`;
// let emailURL=;


//dragover event listener
dropZone.addEventListener('dragover', dropZoneDragoverfun);
function dropZoneDragoverfun(e) {

    e.preventDefault();
    console.log('dragging');
    if (!dropZone.classList.add('dragged')) {
        dropZone.classList.add('dragged');
        innerDiv.style.backgroundColor = "rgb(202 238 255)";
    }
}

//leave event listener
dropZone.addEventListener('dragleave', dropZoneDragleavefun);
function dropZoneDragleavefun(e) {
    e.preventDefault();
    if (dropZone.classList.contains('dragged')) {
        dropZone.classList.remove('dragged');
        innerDiv.style.backgroundColor = "#96dafb";
    }
}




//drop event listener

let fileInput = document.getElementById('fileInput');
dropZone.addEventListener('drop', dropZoneDropfun);
function dropZoneDropfun(e) {
    e.preventDefault();
    dropZone.classList.remove('dragged');
    innerDiv.style.backgroundColor = "#96dafb";

    let files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files;
        console.log(files);
        uploadFile();
    }
}



fileInput.addEventListener('change', () => {
    console.log(fileInput.files[0]);
    uploadFile();
})

// upload file
function uploadFile() {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile", file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        console.log(xhr.readyState);
        // if (xhr.readyState == XMLHttpRequest.DONE) {
        //     console.log(xhr.response);
        //      showLink(JSON.parse(xhr.response));
        // }
    }

xhr.upload.onprogress=uploadProgressFun;

    xhr.open("POST", uploadURL);
    xhr.send(formData);
}


//browse file
browseBtn.addEventListener('click', () => {
    fileInput.click();
})



//progress bar

let progessBar=document.getElementById('progessBar');
function uploadProgressFun(e){
    const percentage= MAth.round((e.loaded/e.total)*100);
    progessBar.style.width=`${percentage}`;
    console.log(e);
}

//show link and show link 
let fileURL=document.getElementById('fileURL');
function showLink(link)
{
    console.log(link.file);
    fileURL.value=link.file;

}
console.log(fileURL.value);
// copy link icon
let copyIcon=document.getElementById('copyIcon');
copyIcon.addEventListener('click',()=>{
    fileURL.select();
    document.execCommand("copy");
})

//email send to reciever

let emailForm=document.getElementById('emailForm');
emailForm.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    console.log("Form Submit");

    const sendformData={

        uuid: (fileURL.value).split('/').splice(-1,1)[0],
        sender: emailForm.elements["senderEmail"].value,
        reciever: emailForm.elements["receiverEmail"].value
    }

    console.log(sendformData.uuid);

    fetch(emailURL,{
        method:"POST",
        headers:{
            "Content-Type": application/json 
        },
        body: JSON.stringify(sendformData)
    }).then(res=>res.json()).then((data)=>{
        console.log('Success');
    })

})
