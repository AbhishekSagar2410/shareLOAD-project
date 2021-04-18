

// file-photo-animation

let dropZone = document.getElementById('dropZone');
let innerDiv = document.getElementById('innerDiv');
let outerEmailContainer=document.getElementById('outerEmailContainer');



let host= "https://shareload-project.herokuapp.com";
let uploadURL= `${host}/api/files`;
let emailURL= `${host}/api/files/send` ;


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
        if (xhr.readyState == XMLHttpRequest.DONE) {
            
             showLink(JSON.parse(xhr.response));
        }
    }

xhr.upload.onprogress=uploadProgressFun;

    xhr.open("POST", uploadURL);
    xhr.send(formData);
}

let browseBtn = document.getElementById('browseBtn');
//browse file
browseBtn.addEventListener('click', () => {
    fileInput.click();
})



//progress bar

let progessBar=document.getElementById('progessBar');
let percentageNum=document.getElementById('percentageNum');

function uploadProgressFun(e){
    const percentage= Math.round((e.loaded/e.total)*100);
    progessBar.style.width=`${percentage}%`;
    percentageNum.innerText=`${percentage}%`
    if(percentage>=90){
        outerEmailContainer.style.display='block';
    }
}

//show link and show link 
let fileURL=document.getElementById('fileURL');
function showLink(link)
{
    console.log(link.file);
    fileURL.value=link.file;

}

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
        emailTo: emailForm.elements["receiverEmail"].value,
        emailFrom: emailForm.elements["senderEmail"].value
    }


    console.log(sendformData);

    fetch(emailURL,{
        method:"POST",
        headers:{
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(sendformData)
    }).then(res=>res.json()).then((data)=>{

        console.log(data);
    })

})

let ratebar=document.getElementById('ratebar');
let rateusform=document.getElementById('rateusform');

rateusform.addEventListener('submit' ,()=>{
    console.log(ratebar.value)
})

