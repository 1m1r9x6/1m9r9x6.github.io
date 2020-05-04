let indicators={}

const audio=document.querySelector(".audio")
const socket = io.connect('http://192.168.0.102:8080');




class Tests{
    renderAll(array){        
        const parent=document.querySelector(".sub-menu__tests");
        for(let item in array){
            console.log(array[item]);
            let testItem=`<div class="test">
            <div class="label-test standart-color">${item}</div>`;
            for(let quastion in array[item]){
                testItem+=`<div class="questions-test standart-color">
                <div class="question-test">${quastion}</div>`;
                for(let response in array[item][quastion]){
                    testItem+=`<div class="test-response"><input checked type="radio"
                    name="${quastion}" value="${array[item][quastion][response]["value"]}">
                    <label>${array[item][quastion][response]["title"]}</label></div>`;
                }
                testItem+=`</div>`;
            }
            testItem+=`<button class="button button-test standart-color">Завершить текст</button>
            <div class="result-test"></div></div>`;
            parent.insertAdjacentHTML("beforeend",testItem);

        }
    }
    addEventsAll(){
        document.querySelectorAll(".test").forEach(value=>{
            const buttonTest=value.querySelector(".button-test");
            buttonTest.addEventListener("click",()=>{
                const result=value.querySelector(".result-test");
                const questions=value.querySelectorAll("input[type=radio]:checked");
                let resultSum=0;
                questions.forEach(value=>{
                    resultSum+=+value.value;
                })
                console.log(resultSum);
                while (result.firstChild)  result.removeChild(result.firstChild);
                result.insertAdjacentHTML("beforeend",`<div class="header standart-color">Результат теста ${resultSum}</div>`)
            })
        });
    }
}
const tests=new Tests();


class ToDoCardItem{
    constructor(){
    }
    render(time, discription, index, isdiscriptionMore, discriptionMore){
        listAlt.insertAdjacentHTML("beforeend",
        `<div class="card-to-do standart-color" style="order:${9999-time.replace(":","")}">
            <div class="card-to-do__block">
                <div class="card-to-do__time">${time}</div>
                <div class="card-to-do__discription">${discription}</div>
                <div class="card-to-do__switch">
                    <input id="checkbox-card-${index}"class="switch-checkbox"type="checkbox">
                    <label class="switch-label" for="checkbox-card-${index}">
                </div>
            </div>

            ${isdiscriptionMore?`<div class="card-to-do__more">
                <div class="card-to-do__learn-more">
                    ${discriptionMore}
                </div>
                <button class="button card-to-do__button standart-color" value="true">Читать далее</button>
            </div>`:''}
        </div>`
        );
    }
}

class ToDoCard{
    constructor(){
    }
    render(array){
        this.array=array;
        var now = new Date();
        now = new Date("01 01 1996 "+now.getHours()+":"+now.getMinutes()+":00");
        let len=0;
        for(let value in array)
        for(let time in array[value]["schedule"]){
            len++;
            let dateToDo="01 01 1996 "+array[value]["schedule"][time]+":00";
            if(((new Date(dateToDo))-now) >= 0)
            toDoCardItem.render(array[value]["schedule"][time], array[value]["discription"], len, array[value]["isArticle"], array[value]["Article"]);
            else
            delete array[value]["schedule"][time];
        }
    }
    startTimers(array){
        this.timer=setInterval(()=>{
            let now = new Date();
            let complite=[];
            now = new Date("01 01 1996 "+now.getHours()+":"+now.getMinutes()+":00");
            for(let value in this.array)
            for(let time in this.array[value]["schedule"]){
                let dateToDo="01 01 1996 "+this.array[value]["schedule"][time]+":00";
                if((((new Date(dateToDo))-now) >= 0)&&(((new Date(dateToDo))-now) <= 3600))
                    {
                        alert(`Внимание, скоро наступит время выполнения задания: ${this.array[value]["discription"]}`);
                        try{
                            window.navigator.vibrate(1000);
                            audio.src="https://sound-pack.net/download/Sound_11084.wav";
                            audio.play();
                        }catch{}
                        complite.push(this.array[value]["schedule"][time]);
                        delete this.array[value]["schedule"][time];
                    }
                    else if(((new Date(dateToDo))-now) < 0)
                    {
                        try{
                            window.navigator.vibrate(1000);
                            audio.src="https://sound-pack.net/download/Sound_11084.wav";
                            audio.play();
                        }catch{}
                        complite.push(this.array[value]["schedule"][time]);
                        delete this.array[value]["schedule"][time];
                    }
            }
        },990);
    }
    stopTimers(){
        clearInterval(this.timer);
    }
    addEvents(array){
        this.complite=document.querySelector(".to-do-complite");
        this.parent=document.querySelector(".sub-menu-list_alt");
        document.querySelectorAll(".card-to-do").forEach((value,index,parent)=>{
            const switchCheckbox=value.querySelector(".switch-checkbox");
            switchCheckbox.addEventListener("change",()=>{
                if(switchCheckbox.checked){
                    value.classList.remove("standart-color");
                    value.classList.add("complite-color");
                    value.querySelectorAll(".standart-color").forEach(item=>{
                        item.classList.remove("standart-color");
                        item.classList.add("complite-color");
                    })
                    this.complite.appendChild(value);
                }
                else{
                    value.classList.add("standart-color");
                    value.classList.remove("complite-color");
                    value.querySelectorAll(".complite-color").forEach(item=>{
                        item.classList.add("standart-color");
                        item.classList.remove("complite-color");
                    })
                    this.parent.appendChild(value);
                }
            });
            const buttonMore=value.querySelector(".card-to-do__button");
            if(buttonMore)
                buttonMore.addEventListener("click",()=>{
                    const textMore=value.querySelector(".card-to-do__learn-more");
                    while (buttonMore.firstChild) buttonMore.removeChild(buttonMore.firstChild);
                    if(buttonMore.value=="true"){
                        buttonMore.value="false";
                        buttonMore.insertAdjacentHTML("afterbegin","Скрыть");
                        textMore.classList.add("card-to-do__learn-more_active");
                    }
                    else{
                        buttonMore.value="true";
                        buttonMore.insertAdjacentHTML("afterbegin","Читать далее");
                        textMore.classList.remove("card-to-do__learn-more_active");
                    }
                });
        });
    }
}

class Cards{
    constructor(){
        this.card={};
        this.isNotLoad=null;
        socket.on("card",(data)=>{
            this.card=JSON.parse(data)["list"];
            this.isNotLoad=false;
            this.callback(this.card);
        });
    }
    loadData(diag,callback){
        this.callback=callback;
        this.isNotLoad=true;
        socket.emit("get card",diag);
    }
    getData(){
        return this.card;
    }
}

class SelectSingIn{
    constructor(){
        this.select=document.querySelector("select");
    }
    render(data){
        for(let i in data){
        this.select.insertAdjacentHTML("beforeend",`<option value="${data[i]}">${data[i]}</option>`);
        }
    }
}

const updateIndicator=document.querySelector(".update-indicator");
const listAlt = document.querySelector(".sub-menu-list_alt");
const toDoCardItem = new ToDoCardItem();
const toDoCard = new ToDoCard();
const cards=new Cards();
const signIn=document.querySelector(".sign-in");
const select=document.querySelector("select");

document.querySelectorAll(".menu-btn").forEach((menuBtn,index,parent)=>{
    menuBtn.addEventListener("click",()=>{
        document.querySelector(".menu-btn_active").classList.remove("menu-btn_active");
        menuBtn.classList.add("menu-btn_active");
        document.querySelector(".sub-menu_active").classList.remove("sub-menu_active");
        document.querySelector(".sub-menu-"+menuBtn.value).classList.add("sub-menu_active");
    });
});



class GraphicsRender{
    constructor(){}
    renderNew(nameData){
        let now = new Date().toString();
        indicators[now]={}
        document.querySelectorAll(nameData).forEach(value=>{
            indicators[now][value.name]=value.value;
            value.placeholder=value.value;
            const graphics=document.querySelector(".graphics-"+value.name);
            if(value.name!="temperature")
            graphics.insertAdjacentHTML("beforeend",`
                <div class="graphics-column" style="min-height:${value.value}px">${value.value}</div>
            `)
            else{
                graphics.insertAdjacentHTML("beforeend",`
                <div class="graphics-column" style="min-height:${(+value.value-20)*7}px">${value.value}</div>
                `)  
            }
            graphics.scrollBy(100,100);
        });
    }
}

const graphicsRender=new GraphicsRender();

updateIndicator.addEventListener("click",()=>{
    graphicsRender.renderNew(".set-indicator");
    socket.emit("update indicators",JSON.stringify(indicators))
});


signIn.addEventListener("click",(e)=>{
    const value = select.selectedOptions[0].value;
    console.log(value);
    cards.loadData(value,(array)=>{
        toDoCard.render(array);
        toDoCard.startTimers(array);
        toDoCard.addEvents(array);
    });
    document.querySelector(".virus-hack-app-sign-in").classList.add("hidden");
    document.querySelector(".virus-hack-app").classList.remove("hidden");
    graphicsRender.renderNew(".set-indicator-start");
});

selectSingIn=new SelectSingIn();

socket.emit('get diagnozes','');
socket.on('diagnozes',(data)=>{
    selectSingIn.render(JSON.parse(data)["list"]);
});

socket.emit('get tests','null');
socket.on('tests',(data)=>{
    console.log(data);
    tests.renderAll(JSON.parse(data)["list"]);
    tests.addEventsAll();
});