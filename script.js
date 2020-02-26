const searchContainer=document.getElementsByClassName("search-container")[0]
const gallery=document.getElementById("gallery");
const docBody=document.getElementById("docbody");
let divList=[]

function request(url){
    // create form
    const theForm=document.createElement("form");
    theForm.setAttribute("action","#");
    theForm.setAttribute("method","get");
    // creating inputs
    const input1= document.createElement("input");
    const input2=document.createElement("button");
    input1.setAttribute("type","search");
    input1.id="search-input"
    input1.className="search-input"
    input1.placeholder="search..."

    input2.setAttribute("type","sumbit");
    input2.setAttribute("value","&#x1F50D;");
    input2.className="search-submit"
    input2.id="search-submit"

    theForm.appendChild(input1);
    // theForm.appendChild(input2);

    searchContainer.appendChild(theForm)

    // create gallery of 12 employees
    fetch(url)
    .then(data=>data.json())
    // put each employee into gallery
    .then(data=>data.results.map(employee=>{

       const employeeDiv= document.createElement("div");
       employeeDiv.className="card"

     
       
       const imageContainer=document.createElement("div")
       imageContainer.className="card-img-container"
       const image=document.createElement("img")
       imageContainer.appendChild(image)
       image.className="card-img"
       image.setAttribute("src",employee.picture.medium)
       image.setAttribute("alt","profile picture")

       const cardInfo= document.createElement("div")
       cardInfo.className="card-info-container"
       cardInfo.innerHTML=`<h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                           <p class="card-text">email@yahoo.com</p>
                           <p class="card-text cap">${employee.location.city}</p>`

        employeeDiv.appendChild(cardInfo)
        employeeDiv.appendChild(imageContainer)

        gallery.appendChild(employeeDiv)

    //    modal
    employeeDiv.addEventListener("click",(e)=>{
        const myDate= new Date(employee.dob.date)
        const month=myDate.getMonth()+1
        const day= myDate.getDate()
        const year= myDate.getFullYear()
        
        const cards= document.getElementsByClassName("card")
       for(i=0;i<cards.length;i++){
           if(cards[i].style.display!=="none"){
               divList.push(cards[i])
           }
       }
      
      const currentIndex=Array.from(divList).indexOf(e.currentTarget)
      const modal=document.createElement("div")
      modal.className="modal-container"
      modal.innerHTML=
       `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
       <div class="modal-info-container">
           <img class="modal-img" src=${employee.picture.large} alt="profile picture">
           <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
           <p class="modal-text">${employee.email}</p>
           <p class="modal-text cap">${employee.location.city}</p>
           <hr>
           <p class="modal-text">${employee.cell}</p>
           <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.postcode}</p>
           <p class="modal-text">Birthday:${day}-${month}-${year}</p>
       </div>
       
       <div class="modal-btn-container">
       <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
       <button type="button" id="modal-next" class="modal-next btn">Next</button>
       </div>
   </div>`

   docBody.append(modal)
   
//    here i add the functionalities for the next and prev buttons
   const closeButton= document.getElementById("modal-close-btn")
     closeButton.addEventListener("click",(e)=>{
         
         document.getElementsByClassName("modal-container")[0].remove()
     })

    modal.addEventListener("click",(e)=>{
       
        if(e.target.innerText=="NEXT" && divList[currentIndex+1]!=undefined){
            document.getElementsByClassName("modal-container")[0].remove()
            
            divList[currentIndex+1].click()

        }
        else if(e.target.innerText=="NEXT" && divList[currentIndex+1]==undefined){
            document.getElementsByClassName("modal-container")[0].remove()
            divList[0].click()
        }
        else if(e.target.innerText=="PREV" && divList[currentIndex-1]!=undefined){
            document.getElementsByClassName("modal-container")[0].remove()
            divList[currentIndex-1].click()
        }
        else if(e.target.innerText=="PREV" && divList[currentIndex-1]==undefined){
            document.getElementsByClassName("modal-container")[0].remove()
            divList[divList.length-1].click()
        }
        
    })

    
})
// add event listenere to search box that removes divs that dont meet the search cretria from the dom as keyup is initiated
input1.addEventListener("keyup",()=>{
 divList=[]
 let cards=document.getElementsByClassName("card")
 for(i=0;i<cards.length;i++){
    if(cards[i].style.display!=="none"){
        divList.push(cards[i])
    }
}

 for(i=0;i<cards.length;i++){
     if(!cards[i].firstElementChild.firstElementChild.innerText.toLowerCase().includes(input1.value.toLowerCase())){
         cards[i].style.display="none"
     }
     else{
         cards[i].style.display="flex"
     }
 }

})



    }))

    
    
}


request("https://randomuser.me/api/?results=12&nat=us")