class LoadOnScroll{
    constructor(elements){
        this.elements = elements;

        this.observer = new IntersectionObserver((hiddenElements) => {
            hiddenElements.forEach(elem => {
                if(elem.isIntersecting){
                    elem.target.classList.add("visible");
                }
            })
        });

        this.elements.forEach(element => {
            this.observer.observe(element);
        })
    }
}

const scrollLoadElements = document.querySelectorAll('.hidden');
const loader = new LoadOnScroll(scrollLoadElements);