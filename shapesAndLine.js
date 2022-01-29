  // step one to use features of the open board tapme 
  document.querySelector("#tapmeImg").addEventListener('click',function(){
    let ct=document.getElementById("ctoolsId");
    let odiv=document.getElementById("outerdivId");
    if(ct.style.display==="none" && odiv.style.maxWidth==="fit-content"){
        ct.style.display="flex";
        odiv.style.maxWidth="none";
    }else {
        ct.style.display="none";
        odiv.style.maxWidth="fit-content";
    }
    });
// implementing the canvas and use it's features
// and also taking the height and weight of the white board (or canvas)
let cboard=document.querySelector("canvas");
cboard.height=window.innerHeight;
cboard.width=window.innerWidth;
let tools=cboard.getContext("2d");

//Selections of the mainTools 
// Selection of pencil,line,eraser,color tool etc. if click
let pencilTool=document.querySelector("#pencilImg");
let linetool=document.querySelector("#lineImg");
let eraserTool=document.querySelector("#eraserImg");
let colorTool=document.querySelector("#paintImg");
let shapeTool=document.querySelector("#shapesImg");
let zoomInTool=document.querySelector("#zoomInImg");
let zoomOutTool=document.querySelector("#zoomOutImg");

let mn=document.querySelector("#menu");
let ssm=document.querySelector("#shapesSubMenu");


// Selections of the colors are used
document.getElementById("red").addEventListener("click",(e)=>{
    tools.strokeStyle="red";
    colorType="red";
 });
document.getElementById("green").addEventListener("click",(e)=>{
    tools.strokeStyle="green";
    colorType="green";
 });;
document.getElementById("blue").addEventListener("click",(e)=>{
    tools.strokeStyle="blue";
    colorType="blue";
 });;
document.getElementById("black").addEventListener("click",(e)=>{
    tools.strokeStyle="black";
    colorType="black";
 });;
document.getElementById("yellow").addEventListener("click",(e)=>{
    tools.strokeStyle="yellow";
    colorType="yellow";
 });;
document.getElementById("purple").addEventListener("click",(e)=>{
    tools.strokeStyle="purple";
    colorType="purple";
 });


 //
 zoomInTool.addEventListener("click",function(){

 })
 zoomOutTool.addEventListener("click",function(){
     
 })
 // implementing the different sizes of tools (means it's thickness)
let arrayOfsize=document.querySelectorAll(".size-box");

arrayOfsize[0].addEventListener("click",(e) => {
    let ele=["size1","size2","size3","size4"];
    let  allClasses=e.target.classList;
    let fclass=allClasses[0];
    let boo=ele.includes(fclass);
    console.log(fclass)
    if(boo){
        
        if(fclass=="size1"){
            pencilSize=1
        }else if(fclass=="size2"){
            pencilSize=5
        }else if(fclass=="size3"){
            pencilSize=14
        }else if(fclass=="size4"){
            pencilSize=19
        }
    }
    tools.lineWidth=pencilSize;
});
arrayOfsize[1].addEventListener("click",(e) => {
    let ele=["size1","size2","size3","size4"];
    let  allClasses=e.target.classList;
    let fclass=allClasses[0];
    let boo=ele.includes(fclass);
    console.log(fclass)
    if(boo){
        if(fclass=="size1"){
            lineSize=1
        }else if(fclass=="size2"){
            lineSize=5
        }else if(fclass=="size3"){
            lineSize=10
        }else if(fclass=="size4"){
            lineSize=15
        }
    }
    tools.lineWidth=lineSize;
});
arrayOfsize[2].addEventListener("click",(e) => {
    let ele=["size1","size2","size3","size4"];
    let  allClasses=e.target.classList;
    let fclass=allClasses[0];
    let boo=ele.includes(fclass);
    console.log(fclass)
    if(boo){
        if(fclass=="size1"){
            eraserSize=5
        }else if(fclass=="size2"){
            eraserSize=12
        }else if(fclass=="size3"){
            eraserSize=18
        }else if(fclass=="size4"){
            eraserSize=25
        }
     
    }
    tools.lineWidth=eraserSize;
});


//shapes selection in the shapetool;
document.getElementById("recImg").addEventListener("click",(e)=>{
    shapeType="rectangle";
   toolUsing(pencilSize);
});
document.getElementById("cirImg").addEventListener("click",(e)=>{
    shapeType="circle";
   toolUsing(pencilSize);
});
document.getElementById("triImg").addEventListener("click",(e)=>{
    shapeType="triangle";
   toolUsing(pencilSize);
});

//
let body=document.querySelector("body");

// initializing the value of cTools so, that it is understood that which tool we are using
let cTool="";
let colorType="black"
let shapeType="none" 
let pencilSize=1;
let lineSize=1;
let eraserSize=1;



// initial and final co-ordinates of a pointer of a mouse
let xi,yi,xf,yf;
let boo=false;

pencilTool.addEventListener("click",(e)=>{
   
togglingLogic("pencil",0);
toolUsing();
});

linetool.addEventListener("click",(e)=>{     
                                                                                                              
togglingLogic("line",1);
toolUsing();
});

eraserTool.addEventListener("click",(e)=>{
   
    togglingLogic("eraser",2);
    toolUsing();
});

colorTool.addEventListener("click",(e)=>{
    togglingLogic("color",-1);
});

shapeTool.addEventListener("click",(e)=>{
    togglingLogic("shape",-2);
});


function toolUsing(){
    //console.log("using pencil");
    
    body.addEventListener("mousedown",(e)=>{
        console.log(cTool+"down");
         boo=true;
        xi=e.clientX;
        yi=e.clientY;
        });       
    
    body.addEventListener("mousemove",(e)=>{
            
            if(boo==false){
                return ;
            }
            console.log(cTool +"move");
            if(cTool=="pencil" || cTool=="eraser"){
            xf=e.clientX;
            yf=e.clientY;
            tools.beginPath();
            tools.moveTo(xi,yi-83.5);
            tools.lineTo(xf,yf-83.5); 
            tools.stroke(); 
            xi=xf;
            yi=yf;
            }
            else if(cTool=="shape" && shapeType=="circle"){
                console.log("circle")
 let centerX = Math.max(xi,xf) - Math.abs(xi - xf)/2;
let centerY = Math.max(yi,yf) - Math.abs(yi - yf)/2;
let distance = Math.sqrt(Math.pow(xi - xf,2) + Math.pow(yi - yf));
tools.arc(centerX, centerY, distance/2,0,Math.PI*2 ,true);
tools.stroke();
            }

        
        });


    body.addEventListener("mouseup",(e)=>{
          console.log(cTool+"up");
             boo=false;
             if(cTool=="line"){ 
                xf=e.clientX;
                yf=e.clientY;
                console.log(cTool+"using.....");
                tools.beginPath();
                tools.moveTo(xi,yi-83.5);
                tools.lineTo(xf,yf-83.5); 
                tools.stroke();
                
             }else if(cTool=="shape" && shapeType=="rectangle"){
                 tools.lineWidth=pencilSize;
                 tools.strokeStyle=colorType
                 tools.strokeRect(xi,yi-105,e.clientX-xi,e.clientY-yi);
                }else if(cTool=="shape" && shapeType=="triangle"){
//doo something with triangle
                }
               });
            }



function togglingLogic(myName,idx){
    if(cTool==myName){
        if(idx<0){
            if(cTool=="color")
            mn.style.display="none";
            else if(cTool=="shape"){
            ssm.style.display="none";
            }

        }else{
            if(cTool=="eraser"){
                tools.strokeStyle="white";
            }else{
                tools.strokeStyle=colorType;
            }
            arrayOfsize[idx].style.display="none";
        }
        cTool="";
    }else if(cTool.length>0){
        for(let i=0;i<arrayOfsize.length;i++){
            arrayOfsize[i].style.display="none";
        }
        mn.style.display="none";
        ssm.style.display="none";
        cTool=myName;
        if(idx<0){
            if(cTool=="color")
            mn.style.display="flex";
            else if(cTool=="shape"){
            ssm.style.display="flex";
            }

        }else{
            if(cTool=="eraser"){
                tools.strokeStyle="white";
            }else{
                tools.strokeStyle=colorType;
            }
            arrayOfsize[idx].style.display="flex";
        }
    }else if(cTool.length==0){
        cTool=myName;
        if(idx<0){
            if(cTool=="color")
            mn.style.display="flex";
            else if(cTool=="shape"){
            ssm.style.display="flex";
            }
        }else{
            if(cTool=="eraser"){
                tools.strokeStyle="white";
            }else{
                tools.strokeStyle=colorType;
            }
            arrayOfsize[idx].style.display="flex";
        }

    }
}
