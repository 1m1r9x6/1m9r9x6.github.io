
const audio=document.querySelector(".audio")
const socket = io.connect('http://192.168.0.102:8080');


class SaveLoadDB{
    is(name){
        if(localStorage.getItem(name))
            return true;
        return false;
    }
    save(name,value){
        localStorage.setItem(name,JSON.stringify(value));
    }
    load(name){
        return JSON.parse(localStorage.getItem(name));
    }
}
const saveLoadDB = new SaveLoadDB();
let indicators
if(saveLoadDB.is("indicators"))
    indicators=saveLoadDB.load("indicators")
else    
    indicators={}


class Tests{
    renderAll(array){        
        const parent=document.querySelector(".sub-menu__tests");
        for(let item in array){
            // console.log(array[item]);
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
                // console.log(resultSum);
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
        this.parent=listAlt;
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


class Search{
    render(data){
        while(searchResult.firstChild) searchResult.removeChild(searchResult.firstChild)
        for(let i in data){
            searchResult.insertAdjacentHTML("beforeend",`<div class="standart-color"><a target="_blank" href="${data[i]}">${i}</a></div>`);
        }
    }
}
search=new Search();


class GraphicsRender{
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
        saveLoadDB.save("indicators",indicators);
    }
    renderAll(indicators){
        // debugger;
        for(let time in indicators){
            for(let name in indicators[time]){
                const value=indicators[time][name];
                const graphics=document.querySelector(".graphics-"+name);
                if(name!="temperature")
                graphics.insertAdjacentHTML("beforeend",`
                    <div class="graphics-column" style="min-height:${value}px">${value}</div>
                `)
                else{
                    graphics.insertAdjacentHTML("beforeend",`
                    <div class="graphics-column" style="min-height:${(+value-20)*7}px">${value}</div>
                    `)  
                }
                graphics.scrollBy(100,100);
            }
        }
    }
}

class Gallery{
    addPhoto(base64img,parent){
        parent.insertAdjacentHTML("beforeend",`
            <div class="photo-element">
                <div class="photo" style="background-image:url(${base64img});">
                </div>
                <input class="button standart-color"type=text>
            </div>
        `)
    }
}


class SubMenu{
    addAllSubMenu(array,parent){
        const menuInfo=document.querySelector(".sub-menu-info");
        for(name in array)
        {
            console.log("arrname",array[name]);
            console.log("name",name);
            menuInfo.insertAdjacentHTML("afterbegin",`<button class="button-tile standart-color" value=".sub-menu-${name}">${array[name]}</button>`);
            parent.insertAdjacentHTML("beforeend",`
            <div class="sub-menu sub-menu-${name}">
            </div>`);
            socket.emit("get articles by name",array[name]);
            socket.on("articles by name",(data)=>{
                name=JSON.parse(data)["name"];
                console.log(name);
                data=JSON.parse(data)["list"];
                console.log(data);
                const sub=document.querySelector(`.sub-menu-${name}`)
                for(let i in data){
                    sub.insertAdjacentHTML("afterbegin",`<div class="standart-color"><a target="_blank" href="${data[i]}">${i}</a></div>`);
                }
            });

        }
    }
    events(){
        document.querySelectorAll(".button-tile").forEach(value=>{
            value.addEventListener("click",()=>{
                document.querySelector(".sub-menu_active").classList.remove("sub-menu_active");
                document.querySelector(value.value).classList.add("sub-menu_active");
            })
        })
    }
}

class MountsEvents{
    constructor(){
        this.data={};
        if(saveLoadDB.is("eventsData"))
        this.data=saveLoadDB.load("eventsData");
        document.querySelectorAll(".calendar-day").forEach(btn=>{
            // alert(1);
            btn.addEventListener("click",()=>{
                this.view(btn.value);
            });
        });
    }
    view(value){
        let text = '';
        if(this.data[value])
        text = this.data[value]["text"]?this.data[value]["text"]:"";
        document.querySelector(".virus-hack-app").insertAdjacentHTML('beforebegin',`
        <div class="modal-event">
            <div class="event">
                <div class="header standart-color">${value}</div>
                <textarea class="standart-color" style="height:200px;max-width:100%; min-width:100%;">${text}</textarea>
                <button class="button standart-color">Сохранить и закрыть</button>
            </div>
        </div>` 
        );
        const parent = document.querySelector(".modal-event")
        const save = parent.querySelector(".button");
        save.addEventListener("click",()=>{
            if(!this.data[value])
            this.data[value]={};
            const textarea = document.querySelector("textarea");
            this.data[value]["text"]=textarea.value;
            parent.parentNode.removeChild(parent);
        });
        saveLoadDB.save("eventsData",this.data);
    }
}

const mountsEvents = new MountsEvents();
const content=document.querySelector(".content");
const subMenu=new SubMenu();
const updateIndicator=document.querySelector(".update-indicator");
const listAlt = document.querySelector(".to-do-current");
const toDoCardItem = new ToDoCardItem();
const toDoCard = new ToDoCard();
const cards=new Cards();
const signIn=document.querySelector(".sign-in");
const select=document.querySelector("select");
const searchButton=document.querySelector(".search-button");
const searchResult=document.querySelector(".search-result");
const searchWord=document.querySelector(".search-word");
const galleryImg=document.querySelector(".sub-menu__photo");
const gallery=new Gallery();
const menuBtns=document.querySelectorAll(".menu-btn");
const graphicsRender=new GraphicsRender();
const selectSingIn=new SelectSingIn();

menuBtns.forEach((menuBtn,index,parent)=>{
    menuBtn.addEventListener("click",()=>{
        document.querySelector(".menu-btn_active").classList.remove("menu-btn_active");
        menuBtn.classList.add("menu-btn_active");
        document.querySelector(".sub-menu_active").classList.remove("sub-menu_active");
        document.querySelector(".sub-menu-"+menuBtn.value).classList.add("sub-menu_active");
    });
});


updateIndicator.addEventListener("click",()=>{
    graphicsRender.renderNew(".set-indicator");
    socket.emit("update indicators",JSON.stringify(indicators))
    saveLoadDB.save("indicators",indicators);
});


function loadData(value){
    cards.loadData(value,(array)=>{
        toDoCard.render(array);
        toDoCard.startTimers(array);
        toDoCard.addEvents(array);
    });
    document.querySelector(".virus-hack-app-sign-in").classList.add("hidden");
    document.querySelector(".virus-hack-app").classList.remove("hidden");
}

if (!(saveLoadDB.is("Диагноз")))
signIn.addEventListener("click",(e)=>{
    const value = select.selectedOptions[0].value;
    saveLoadDB.save("Диагноз",value);
    graphicsRender.renderNew(".set-indicator-start");
    loadData(value)
})
else{
    loadData(saveLoadDB.load("Диагноз"))
    if(saveLoadDB.is("indicators"))
    graphicsRender.renderAll(saveLoadDB.load("indicators"));
}

socket.on("card",(data)=>{
    cards.card=JSON.parse(data)["list"];
    cards.isNotLoad=false;
    cards.callback(cards.card);
});


searchButton.addEventListener("click",()=>{
    const word=searchWord.value;
    socket.emit("get articles search",word);
});

socket.on("articles search",data=>{
    data=JSON.parse(data)["list"];
    search.render(data);
})

socket.emit('get diagnozes');
socket.on('diagnozes',(data)=>{
    selectSingIn.render(JSON.parse(data)["list"]);
});

socket.emit('get tests','null');
socket.on('tests',(data)=>{
    tests.renderAll(JSON.parse(data)["list"]);
    tests.addEventsAll();
});

function saveNewPhoto(evt){
    const tgt = evt.target || window.event.srcElement, files = tgt.files;
    if (FileReader && files && files.length) {
    const fr = new FileReader();
    fr.onload = function(){
        gallery.addPhoto(fr.result,galleryImg);
    }
    fr.readAsDataURL(files[0]);
    }
}

const input=document.querySelector(".set-photo");        
input.onchange = saveNewPhoto;


socket.emit('get articles names');
socket.on('articles names',(data)=>{    
    subMenu.addAllSubMenu(JSON.parse(data)["list"],content);
    subMenu.events();
});

if(saveLoadDB.is("numbers")){
    const parent=document.querySelector(".sub-menu-phone");
    let numbers=saveLoadDB.load("numbers");
    for(let i in numbers){
        parent.insertAdjacentHTML("afterbegin",`<a class="button standart-color" href="tel:${i}">${numbers[i]}</a>`);
    }
}

document.querySelector(".add-new-phone").addEventListener("click",()=>{
    document.querySelector(".sub-menu-phone").insertAdjacentHTML('beforebegin',`
    <div class="modal-event">
        <div class="number">
            <div class="header standart-color">Введите имя и номер</div>
            <input type="text" value="0" placeholder="Имя" class="number-save-name input standart-color">
            <input type="phone" value="0"  class="number-save-number input standart-color">
            <button class="number-save-button standart-color">Сохранить и закрыть</button>
        </div>
    </div>` 
    );
    const save = document.querySelector(".number-save-button");
    save.addEventListener("click",(e)=>{
        const parent = document.querySelector(".modal-event")
        const subMenu = document.querySelector(".sub-menu-phone")
        let i1 = document.querySelector(".number-save-name");
        let i2 = document.querySelector(".number-save-number");
        let numbers={}
        if(saveLoadDB.is("numbers"))
        numbers=saveLoadDB.load("numbers");
        numbers[`${i2.value}`]=i1.value;
        saveLoadDB.save("numbers",numbers);
        subMenu.insertAdjacentHTML("afterbegin",`<a class="button standart-color" href="tel:${i2.value}">${i1.value}</a>`);
        console.log(`<a class="button standart-color" href="tel:${i2.value}">${i1.value}</a>`);
        parent.parentNode.removeChild(parent);
    });
})
