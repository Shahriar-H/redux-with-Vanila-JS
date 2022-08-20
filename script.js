//target element
const counterElement = document.getElementById('counter');
const counters = document.getElementById('counters')
const firstCounter = document.getElementById('firstCounter')
let forWhwer='increment0';
var statesId;

//initial state
const initialState = {
    newInitail:{
        value:0,
        incrementORdecrement:0
    }
}
//initial state for every counter
var variableState=Array();

// add addEventListener increment
function increment(id){
    //initia.area=showArea;
    statesId=id.split('increment')
    statesId=statesId[1]
    forWhwer=id;
    store.dispatch({
        type:'increment',
         id:id,
    })
    
    
}
// add addEventListener decrement
function decrement(id){
    statesId=id.split('increment')
    statesId=statesId[1]
    forWhwer=id;
    store.dispatch({
        type:'decrement',
        id:id,
    })
    
    
}
function reset(){
    store.dispatch({
        type:'reset',
    })
    
    
}
function erase(){
    store.dispatch({
        type:'erase',
    })
    
    
}

//add counter function

let myS = '';
let lopp = 0;
var incVar;

function addCounter(){
    incVar = 'increment'+lopp;
    variableState[incVar]=0;
    initialState[incVar]={
        value:0,
        incrementORdecrement:lopp+1
    };
    myS = `<div class="counterDiv"><h1 style="font-weight: 600;" id="${incVar}">${variableState[incVar]}</h1><button class="btn btn-primary" onclick="increment('${incVar}')" id="increment'+index+'">Increment +${lopp+1}</button><button class="btn btn-danger" onclick="decrement('${incVar}')" id="decrement'+index+'">Decrement -${lopp+1}</button></div><br>`;        
    if(lopp==0){
        firstCounter.innerHTML = myS
    }else{
        counters.innerHTML += myS
    }
     
    lopp++;
   
   
}
//call for initial 1st counter show
addCounter()






//reducer Function
function CounterReducer(state=initialState,action){
    var ArrayInObject = action.id;
    
    if(action.type==='increment' && state[ArrayInObject]){
        var val = state[ArrayInObject].value+=initialState[ArrayInObject].incrementORdecrement     
        return  {
            ...state,
            [ArrayInObject]:{
                value: val,
            }

        }
        
    }else if(action.type==='decrement'){
        var val = state[ArrayInObject].value -= initialState[ArrayInObject].incrementORdecrement
        
        return  {
            ...state,
            [ArrayInObject]:{
                value: val,
            }

        }
    }else if(action.type==='reset'){
        return {
            ...state,
            reset:true,
        }
    }else if(action.type==='erase'){
        return {
            erase:true,
        }
    }
    else{
        var covertToInt = parseInt(statesId);
        var forInitialValue = covertToInt+1;
        var newCreatedID = 'increment'+covertToInt
        console.log(newCreatedID)
        state[newCreatedID]={
            value:forInitialValue
        }
        return {
            ...state,
        }
         
    }
}


//for updateUI
const render = ()=>{
    const state = store.getState();
    if(state.reset===true){
        resetAllCounter(state)
        
    }else if(state.erase===true){
        deleteAllCounter(state)
        state.erase=false
    }
    else{

        var covertToInt = parseInt(statesId);
        var newCreatedID = 'increment'+covertToInt
        console.log(newCreatedID)
        if(state[forWhwer]){
            document.getElementById(forWhwer).innerText = state[forWhwer].value;
        }else{
            document.getElementById(newCreatedID).innerText = state[newCreatedID].value;
        }
    }
  
}
//create store redux
const store = Redux.createStore(CounterReducer);

//subscribe 
store.subscribe(render)
//call for initial UI Update
render()





//reseet value
function resetAllCounter(state){
    let index=1;
    let element = state['increment0'];
    var iniaialIndex=0;
    while (element) {
        
        element = state['increment'+iniaialIndex];
        if(!element){
            console.log('element')
            state.reset=false
            return 0;
        }
        state['increment'+iniaialIndex].value=0
        document.getElementById('increment'+iniaialIndex).innerText = 0;
        iniaialIndex=index-1;
        index++;
        
    }
    
  
}

// //delete Counter
function deleteAllCounter(state){
    alert("Are you sure?")
    counters.innerHTML ='';
    document.getElementById('increment0').innerText = 0;
    state.erase=false
    lopp=1;

    
}















