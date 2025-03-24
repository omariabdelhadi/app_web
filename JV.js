let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let Te=document.getElementById("T")
let catégorie=document.getElementById("catégorie");
let submit=document.getElementById("submit");
let title=document.getElementById("title")
let count=document.getElementById("count")
let Tble=document.getElementById("Tble")
let mood="creat"
let tmp;
let Search=document.getElementById("search");
let moodSrch="sbt"
let SbtBtn=document.getElementById("SBT")
let SbcBtn=document.getElementById("SBC")


function totle(){
    if(price.value!=''){
        let resultat=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        Te.innerHTML=resultat;
        Te.style.background="green";
    }
    else{
        T.style.background="red";
        Te.innerHTML='';
    }
}



// creation de produit:
let dataPro;
if(localStorage.D!=null){
    dataPro =JSON.parse(localStorage.D);
}
else{
    dataPro=[];
}
submit.onclick=function(){
    let data={
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        title:title.value,
        catégorie:catégorie.value,
        Totale:Te.innerHTML,
    }
   if(data.title!="" && data.catégorie!=""){
    if(mood=="creat"){
        if(count.value!=""){
            if(count.value<=100){
                for(let i=0;i<count.value;i++){
                    dataPro.push({ ...data });
                }
                ClearData()
            }
        }
        else{
           dataPro.push(data);
           ClearData()
        }
    }
    else{
             dataPro[tmp].price=data.price;
             dataPro[tmp].taxes=data.taxes;
             dataPro[tmp].ads=data.ads;
             dataPro[tmp].discount=data.discount;
             dataPro[tmp].title=data.title;
             dataPro[tmp].catégorie=data.catégorie;
             dataPro[tmp].Totale=Te.innerHTML;
             count.style.display="block"
             submit.innerHTML="Creat"
             mood="creat";
             ClearData()
             
    }
    //enregistrer:
    localStorage.setItem("D",JSON.stringify(dataPro))
    show()
   }
}
function ClearData(){

    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    catégorie.value="";
    count.value="";
    title.value="";
    Te.innerHTML="";
    Te.style.background=""
}

function show(){
    let table=""
    for(let i=0;i<dataPro.length;i++){
        table+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].Totale}</td>
                        <td>${dataPro[i].catégorie}</td>
                        <td><button onclick="dlt(${i})" class="delet">delet</button></td>
                        <td><button onclick="updt(${i})" class="update">update</button></td>
                    </tr>`
    }
    Tble.innerHTML=table;
    let btndeletall=document.getElementById("deletAll");
    if(dataPro.length>0){
        btndeletall.innerHTML=`
        <button onclick="deletall()">deletAll</button>`
    }else{
        btndeletall.innerHTML=``
    }
}
show()

function dlt(i){
    dataPro.splice(i,1);
    localStorage.D=JSON.stringify(dataPro);
    show()
}
function deletall(){
    localStorage.clear();
    dataPro.splice(0);
    show();
}

function updt(j){
    title.value=dataPro[j].title;
    price.value=dataPro[j].price;
    taxes.value=dataPro[j].taxes;
    ads.value=dataPro[j].ads;
    discount.value=dataPro[j].discount;
    catégorie.value=dataPro[j].catégorie;
    count.style.display="none"
    submit.innerHTML="update"
    mood="update"
    totle()
    tmp=j

}
SbtBtn.onclick=function(){
    moodSrch="sbt"
    Search.focus();
    Search.style.placeholder="Search By title"
    
}
SbcBtn.onclick=function(){
    moodSrch="sbc"
    Search.focus();
    Search.placeholder="Search By categorie"
    
}

Search.onkeyup= function(){
    let table="";
    let value=Search.value;
    if(moodSrch=="sbt"){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].Totale}</td>
                    <td>${dataPro[i].catégorie}</td>
                    <td><button onclick="dlt(${i})" class="delet">delet</button></td>
                    <td><button onclick="updt(${i})" class="update">update</button></td>
                </tr>`
                Tble.innerHTML=table;
            }
        }
    }
    else if(moodSrch=="sbc"){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].catégorie.includes(value)){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].Totale}</td>
                    <td>${dataPro[i].catégorie}</td>
                    <td><button onclick="dlt(${i})" class="delet">delet</button></td>
                    <td><button onclick="updt(${i})" class="update">update</button></td>
                </tr>`
                Tble.innerHTML=table;
            }
        }
    }
}