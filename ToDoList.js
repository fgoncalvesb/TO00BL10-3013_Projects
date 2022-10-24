// Executes as the page loades
window.onload = function() {
   
    // I load a saved list. If it doesn't exist, this does nothing.
    // I have to parse the item from a string into a JS object again.
    document.getElementById("taskList").innerHTML = JSON.parse(localStorage.getItem('SavedList'))

  }

function validateAndAddNewTask() {
    
    // I save into variables each part of the form that I want to validate
    let x = document.forms["insertTaskForm"]["newTask"].value;

    // Conditions that I want to validate
    if (x == null || x == "") {

    // When conditions are not met, I want the borders of the field to become red, to select the text and focus on the field.
    document.forms.insertTaskForm.newTask.style.borderColor = "red";
    document.forms.insertTaskForm.newTask.select();  
    document.forms.insertTaskForm.newTask.focus(); 

    // In the "span" part of the label, I want for a message to appear if validation is not passed
    document.getElementById('newTaskFeedback').innerHTML="<b>*New task can't be empty</b>";

    // I Return false so there is no submission (no refreshing)
    return false;
    }

    // Now that the input has been validated, we can add it to the list
    // I first use a created function in order to count the number of elements in the current list, so I can then define the "ID" of the following item
    // Each element of the list will have an ID with the name "listOrder" + its order number, starting in 1.
    // Each input of this list, will have an ID with the name "listInputOrder" + its order number, starting in 1.
    let listLength = countItems('taskList');
    let nextNum = listLength+1;

    // I create the item, with its attributes.
    let newItem = document.createElement('li');
    let newULID = 'listOrder'+nextNum;
    newItem.setAttribute("id", newULID);

    // I append the new item to the list
    document.getElementById('taskList').appendChild(newItem);

    // Then I define the input
    let newItemInput = document.createElement("input");
    newItemInput.type = "checkbox";
    newItemInput.id = 'listInputOrder'+nextNum;

    // I append the input and I add the text that was validated => "x"
    document.getElementById(newULID).appendChild(newItemInput);
    document.getElementById(newULID).appendChild(document.createTextNode(x));

    // If item is properly added, I make sure that the form goes "back to normal" (empty all other error messages)
    document.getElementById('newTaskFeedback').innerHTML="";
    document.forms.insertTaskForm.newTask.style.borderColor = "";
    document.forms["insertTaskForm"]["newTask"].value = "";
    document.getElementById('removeItemsFeedback').innerHTML="";
    return false;
    
}

// Function I created to count items in a list. I then realised this can be replaced by just using .length
function countItems(listID){
    let ul = document.getElementById(listID);
    let i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
    return itemCount;
    }

// Funciton to remove an item from the list
function removeItems(){

    // I create an empty array of the items that I'm going to then remove
    // At first I didn't use an array, I deleted the items inside the For Loop but that caused some bugs
    let arr = [];

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    // Items removed counter
    let removedAmount = 0;

    // I fill the array with the items that are checked and increase my counter
    for (let i = 0; i < listItems.length; i++) {

        newOrder = parseInt([i])+1;
        let elementInList = document.getElementById('listInputOrder'+newOrder);

        if (elementInList.checked === true){
            let parentUL = elementInList.parentElement
            arr.push(parentUL);
            removedAmount++;
        }
        
      }

    // I now start removing the items
      for (let i = 0; i < arr.length; i++) {
        arr[i].parentElement.removeChild(arr[i]);
    }
      
    // Then I need to redefine my IDs for the new order of the "new" list
    for (let i = 0; i < listItems.length; i++) {
        newOrder = parseInt([i])+1;
        listItems[i].id = 'listOrder'+newOrder;
        listItems[i].children[0].id = 'listInputOrder'+newOrder;
    }

      // Showing amount of removed items in corresponding Span and also emptying other Spans
      document.getElementById('removeItemsFeedback').innerHTML="<b>"+removedAmount+" items were removed</b>";
      document.getElementById('completeItemsFeedback').innerHTML="";
      document.getElementById('newTaskFeedback').innerHTML="";
    }

// This function changes the style of a list item, in order to "complete it"
function completeItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");
    let completedAmount = 0;
    let reversedAmount = 0;

    // I loop inside the list, check for checked items and change the class to "Completed", which has different style in CSS
    // If the item is already completed, it will undo the action by editing the class with an ""
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

        // The message in Span is different whether at least one item was completed. Then checks if at least one item was reversed.
        if (completedAmount > 0){
        document.getElementById('completeItemsFeedback').innerHTML="<b>"+completedAmount+" items were completed</b>";
        } else if (reversedAmount > 0) {
            document.getElementById('completeItemsFeedback').innerHTML="<b>Selected items were reversed to pending</b>";
        }

        // Clears possible previous messages from other Spans
        document.getElementById('removeItemsFeedback').innerHTML="";
        document.getElementById('newTaskFeedback').innerHTML="";

        uncheckItems();
}

// Function that filters completed items. Changes class to "filtered", which just adds hidden style
function filterItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].className == "completed"){
            listItems[i].className = "filtered";
        }
    }

    // I created a function that unchecks all items. I use it here because I don't want an item to be hidden while remaining checked.
    uncheckItems();

    // Cleaning all messages
    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

// This function removes the hidden status of ex-completed items, by returning them to the "completed" class
function unfilterItems(){

    let ul = document.getElementById("taskList");
    let listItems = ul.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].className == "filtered"){
            listItems[i].className = "completed";
        }
    }

    // Cleaning all messages
    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

// Functions that unchecks all items in the list
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

// Function that saves list in localstorage
function localstorageSave(){

    let ul = document.getElementById("taskList").innerHTML;
    // I need to save the object as a string
    localStorage.setItem("SavedList", JSON.stringify(ul));

    let button = document.getElementById('saveButton');
    
    // Changes button style and text as to give a feedback that it "worked"
    button.style.backgroundColor = 'green';
    button.innerText = '---------------SAVED--------------';

    // Functinon that makes another function wait for 2 seconds before executing
    // The buttonReset function only returns the button to its previous style and put the original text again
    setTimeout(function(){ buttonReset('saveButton'); }, 2000);

    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

// Function that clears the local storage
function localstorageRemove(){

    localStorage.clear();

    let button = document.getElementById('clearButton');
    
    // Changes button style and text as to give a feedback that it "worked"
    button.style.backgroundColor = 'red';
    button.innerText = '------------REMOVED------------';

    // Functinon that makes another function wait for 2 seconds before executing
    // The buttonReset function only returns the button to its previous style and put the original text again
    setTimeout(function(){ buttonReset('clearButton'); }, 2000);

    document.getElementById('completeItemsFeedback').innerHTML="";
    document.getElementById('removeItemsFeedback').innerHTML="";
    document.getElementById('newTaskFeedback').innerHTML="";
}

// Function that resets the style and text of the corresponding "save" button
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
