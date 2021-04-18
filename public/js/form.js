let ratebar=document.getElementById('ratebar');
let rateusformID=document.getElementById('rateusformID');
let host= "https://shareload-project.herokuapp.com";

let rateURL=`${host}/rateus/check`



let alertDivOuter=document.getElementById('alertDivOuter')

let startMsg=document.getElementById('startMsg')
let alertDivinner=document.getElementById('alertDivinner')
let visitorCount=document.getElementById('visitorCount');

rateusformID.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    
    let inputEmail=document.getElementById('inputEmail');
    let inputUsername=document.getElementById('inputUsername');

    const sendformData={
        userName: inputUsername.value,
        email:inputEmail.value
    }

    fetch(rateURL,{
        method:"POST",
        headers:{
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(sendformData)
    }).then(res=>res.json()).then((data)=>{

        alertDivinner.innerHTML=`<strong id="startMsg">${data.startMsg}</strong>${data.nextMsg}`;
        visitorCount.innerText= `Visitors Count | ${data.countUser}`;
        if(data.startMsg=="Oops ! ")
        {
            alertDivinner.style.backgroundColor='#ffc8c8';
        }
        else{
            alertDivinner.style.backgroundColor='#b3fccd';
            
        }
        alertDivinner.classList.add('show')
    })

})

setInterval(() => {
    alertDivinner.classList.remove('show')
}, 4000);

