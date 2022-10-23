window.onload = function() {
   
    // I have to parse the item from a string into a JS object again
    document.getElementById("taskList").innerHTML = JSON.parse(localStorage.getItem('SavedList'))

  }

function validateNewTask() {
    
    let x = document.forms["insertTaskForm"]["newTask"].value;

    if (x == null || x == "") {
    document.forms.insertTaskForm.newTask.style.borderColor = "red";
    document.forms.insertTaskForm.newTask.select();  
    document.forms.insertTaskForm.newTask.focus(); 
    document.getElementById('newTaskFeedback').innerHTML="<b>*New task can't be empty</b>";
    return false;
    }

    let listLength = countItems('taskList');
    let nextNum = listLength+1;

    let newItem = document.createElement('li');
    let newULID = 'listOrder'+nextNum;
    newItem.setAttribute("id", newULID);

    document.getElementById('taskList').appendChild(newItem);

    let newItemInput = document.createElement("input");
    newItemInput.type = "checkbox";
    newItemInput.id = 'listInputOrder'+nextNum;

    document.getElementById(newULID).appendChild(newItemInput);
    document.getElementById(newULID).appendChild(document.createTextNode(x));

    // If item is properly added, I make sure that the form goes "back to normal"
    document.getElementById('newTaskFeedback').innerHTML="";
    document.forms.insertTaskForm.newTask.style.borderColor = "";
    document.forms["insertTaskForm"]["newTask"].value = "";
    document.getElementById('removeItemsFeedback').innerHTML="";
    return false;
    
}

function countItems(listID){
    let ul = document.getElementById(listID);
    let i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    return itemCount;
    }

function removeItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    let removedAmount = 0;

    for (let i = 0; i < listItems.length; i++) {

        let elementInList = document.getElementById('listInputOrder'+(i+1));

        if (elementInList.checked === true){
            let parentUL = elementInList.parentElement
            parentUL.parentElement.removeChild(parentUL);
            removedAmount++;
        }
        
      }
      
    // Then I need to redefine my IDs for the new order
    for (let i = 0; i < listItems.length; i++) {
        newOrder = parseInt([i])+1;
        listItems[i].id = 'listOrder'+newOrder;
        listItems[i].children[0].id = 'listInputOrder'+newOrder;
    }

      document.getElementById('removeItemsFeedback').innerHTML="<b>"+removedAmount+" items were removed</b>";
      document.getElementById('completeItemsFeedback').innerHTML="";
      document.getElementById('newTaskFeedback').innerHTML="";
    }

function completeItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");
    let completedAmount = 0;
    let reversedAmount = 0;

    for (let i = 0; i < listItems.length; i++) {

        let elementInList = document.getElementById('listInputOrder'+(i+1));

        if (elementInList.checked === true){
                if(listItems[i].className == "completed"){
                    listItems[i].className = "";
                    reversedAmount++;
                } else {
            listItems[i].setAttribute("class", "completed");
            completedAmount++;
                }
            }
        }

        if (completedAmount > 0){
        document.getElementById('completeItemsFeedback').innerHTML="<b>"+completedAmount+" items were completed</b>";
        } else if (reversedAmount > 0) {
            document.getElementById('completeItemsFeedback').innerHTML="<b>Selected items were reversed to pending</b>";
        }

        document.getElementById('removeItemsFeedback').innerHTML="";
        document.getElementById('newTaskFeedback').innerHTML="";

        uncheckItems();
}

function filterItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].className == "completed"){
            listItems[i].className = "filtered";
        }
    }

    uncheckItems();

    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

function unfilterItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].className == "filtered"){
            listItems[i].className = "completed";
        }
    }

    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

function uncheckItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {

        let elementInList = document.getElementById('listInputOrder'+(i+1));

        if (elementInList.checked === true){
            elementInList.checked = false;
            }
        }
}

function localstorageSave(){

    let ul = document.getElementById("taskList").innerHTML;
    localStorage.setItem("SavedList", JSON.stringify(ul));

    let button = document.getElementById('saveButton');
    
    button.style.backgroundColor = 'green';
    button.innerText = '---------------SAVED--------------';

    setTimeout(function(){ buttonReset('saveButton'); }, 2000);

}

function localstorageRemove(){

    localStorage.clear();

    let button = document.getElementById('clearButton');
    
    button.style.backgroundColor = 'red';
    button.innerText = '------------REMOVED------------';

    setTimeout(function(){ buttonReset('clearButton'); }, 2000);

}

function buttonReset(buttonID){

    let button = document.getElementById(buttonID);

    button.style.backgroundColor = '';
    button.style.fontWeight = '';

    if (buttonID == 'saveButton' ){
        button.innerText = 'Save to-do list in localstorage';
    } else if (buttonID == 'clearButton'){
        button.innerText = 'Remove list from localstorage';
    }
    
}