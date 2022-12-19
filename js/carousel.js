class Carousel{
    constructor(content, storage, names, front, back, btnBack, btnForward){
        this.content = content;
        this.storage = storage;
        this.names = names;
        this.front = front;
        this.back = back;
        this.btnBack = btnBack;
        this.btnForward = btnForward;
        this.activeIndex = 0;
        this.elementList = [];
        this.nameList = [];
        this.currentFace = "front";
        this.currentRotation = 0;
        this.frame = null;
        this.frameClassName = "carousel-names-frame";
        
        this.initLoop();
        
        this.maxIndex = this.elementList.length-1;

        this.createFrame();

        this.btnBack.addEventListener("click", () => {
            this.loopBack();
            this.moveFrame();
            this.btnBack.disabled = true;
            setTimeout(() => {
                this.btnBack.disabled = false;}
            ,500);
        });

        this.btnForward.addEventListener("click", () => {
            this.loopForward();  
            this.moveFrame();    
            this.btnForward.disabled = true;
            setTimeout(() => {
                this.btnForward.disabled = false;}
            ,500); 
        });

        this.nameList.forEach(nameEl => {
            nameEl.addEventListener("click", () => {
                this.goDirectlyTo(this.nameList.indexOf(nameEl));
                this.moveFrame();
            });
        });
    }

    initLoop = () => {
        for(this.tempElement of this.storage.children){
            this.elementList.push(this.tempElement);
        }

        for(this.tempName of this.names.children){
            if(this.tempName.getAttribute("data-carousel-role") == "project-name")
            this.nameList.push(this.tempName);
        }
    }

    createFrame = () => {
        const newFrame = document.createElement("div");
        const inner = document.createElement("div");
        newFrame.appendChild(inner);
        newFrame.setAttribute("data-carousel-role", "project-frame");
        newFrame.classList.add(this.frameClassName);
        this.names.appendChild(newFrame);
        this.frame = this.names.querySelector('[data-carousel-role="project-frame"]');
        this.moveFrame();
    }
    
    moveFrame = () => {
        const containerRect = this.names.getBoundingClientRect();
        const activeElementRect = this.nameList[this.activeIndex].getBoundingClientRect();

        this.frame.style.width = `${activeElementRect.width}px`; // ok
        this.frame.style.left = `${activeElementRect.left - containerRect.left}px`;
        this.frame.style.height = `${activeElementRect.height}px`;
        this.frame.style.top = `${activeElementRect.top - containerRect.top}px`;
    }

    goDirectlyTo = (index) => {
        if(index > this.activeIndex || index == this.maxIndex){
            this.activeIndex = index-1;
            this.loopForward();
        }else{
            this.activeIndex = index+1;
            this.loopBack();
        } 
    }

    loopBack = () =>{
        this.currentRotation-=180;
        this.content.style.transform = `rotateY(${this.currentRotation}deg)`;
        
        if(this.activeIndex > 0){
            this.activeIndex--;
        }else{
            this.activeIndex = this.maxIndex;
        }

        this.changeContent();  
    }

    loopForward = () =>{
        this.currentRotation+=180;
        this.content.style.transform = `rotateY(${this.currentRotation}deg)`;

        if(this.activeIndex < this.maxIndex){
            this.activeIndex++;
        }else{
            this.activeIndex = 0;
        }

        this.changeContent();
    }

    changeContent = () =>{
        if(this.currentFace == "front"){
            this.currentFace = "back";
            this.back.innerHTML = "";
            this.back.append(this.elementList[this.activeIndex]);

            setTimeout(() => {
                this.front.setAttribute("data-hidden", "true");
                this.back.removeAttribute("data-hidden");
            }, 250);

        }else if(this.currentFace == "back"){
            this.currentFace = "front";
            this.front.innerHTML = "";
            this.front.append(this.elementList[this.activeIndex]);

            setTimeout(() => {
                this.back.setAttribute("data-hidden", "true");
                this.front.removeAttribute("data-hidden");
            }, 250);
        }     
    }
}

const carouselButtonBack = document.querySelector('[data-carousel-role="back-button"]');
const carouselButtonForward = document.querySelector('[data-carousel-role="forward-button"]');
let carouselContent = document.querySelector('[data-carousel-role="content"]');
let carouselFront = document.querySelector('[data-carousel-role="front"]');
let carouselBack = document.querySelector('[data-carousel-role="back"]');
let carouselStorage = document.querySelector('[data-carousel-role="storage"]');
let carouselProjectsNames = document.querySelector('[data-carousel-role="project-name-container"]');

let carousel = new Carousel(carouselContent, carouselStorage, carouselProjectsNames, carouselFront, carouselBack, carouselButtonBack, carouselButtonForward);