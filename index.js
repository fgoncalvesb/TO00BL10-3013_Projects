function checkFormInput() {
    
    var x = document.forms["myForm"]["email"].value;
    var y = document.forms["myForm"]["password"].value;

    if ((x == null || x == "") || (x.length < 3 || x.includes("@")==false)) {
    document.forms.myForm.email.style.borderColor = "red";
    document.forms.myForm.email.select();  
    document.forms.myForm.email.focus(); 
    document.getElementById('emailFeedback').innerHTML="<b>*Fill in properly</b>";
    alert("Email must be properly filled out");

    // I Return false so there is no submission (no refreshing)
    return false;
    }

    if (y == null || y == "") {
        document.forms.myForm.password.style.borderColor = "red";
        alert("Password must be properly filled out");
        document.getElementById('passwordFeedback').innerHTML="<b>*Fill in properly</b>";
        return false;
        }

    if (x == 'admin@admin' || y == 'admin'){
        window.location.replace("ToDoList.html");
        return false;
    } else {
        alert("Wrong username or password");
    }

    
}