//Classes
class Storage{
    constructor(key){
        this.key = key;
    }
    getStorage(){
        const string_data = window.localStorage.getItem(this.key)
        console.log(string_data);
        
        if(string_data){
            return JSON.parse(string_data)
        }
        
    }


    save(json_data){
        window.localStorage.setItem(this.key,JSON.stringify(json_data))
    }
        
    
}

//Helper function
const objToHTML = (todo, i) =>{
    return `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${todo}
                <span data-index=${i} class="badge badge-primary badge-pill">X</span>
            </li>`
}

const storage = new Storage('app-state')


//  event listener on searchbar and update state
const search = document.querySelector('.js-input')
search.addEventListener('keydown',e =>{
    if(e.keyCode === 13){
        //console.log(e.target.value)
        state.todos.unshift(e.target.value)
        e.target.value = ""
        storage.save(state.todos)
        render(state)
    }
})

//Event listener on the X button deleting 
const list = document.querySelector('.js-list-group')
list.addEventListener('click',response =>{
    //console.log(response.target);
    if(response.target.matches('span')){
        //console.log(response.target.getAttribute('data-index'));
        const i = response.target.getAttribute('data-index')
        state.todos.splice(i,1)
        storage.save(state.todos)
        render(state)
        
    }
    
})

const state = {
    todos:[]
}


//---------------------------------------
//Render function
const render = state =>{
    //const list = document.querySelector('.js-list-group')
    let innerHTML = ""; 
   
    for(let i = 0; i < state.todos.length; i++){
        innerHTML += objToHTML(state.todos[i], i)
    }
    list.innerHTML = innerHTML;
}

//-----------------------------------------

if(storage.getStorage()){
    state.todos = storage.getStorage();
}

render(state)


