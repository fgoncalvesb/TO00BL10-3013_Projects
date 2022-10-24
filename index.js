function checkFormInput() {
    
    // I save into variables each part of the form that I want to validate
    var x = document.forms["myForm"]["email"].value;
    var y = document.forms["myForm"]["password"].value;

    // Conditions that I want to validate for email
    if ((x == null || x == "") || (x.length < 3 || x.includes("@")==false)) {
    
    // When conditions are not met, I want the borders of the field to become red, to select the text and focus on the field.
    document.forms.myForm.email.style.borderColor = "red";
    document.forms.myForm.email.select();  
    document.forms.myForm.email.focus(); 

    // In the "span" part of the label, I want for a message to appear if validation is not passed, together with an alert message
    document.getElementById('emailFeedback').innerHTML="<b>*Fill in properly</b>";
    alert("Email must be properly filled out");

    // I Return false so there is no submission (no refreshing)
    return false;
    }

    // Conditions that I want to validate for password
    if (y == null || y == "") {
        document.forms.myForm.password.style.borderColor = "red";
        alert("Password must be properly filled out");
        document.getElementById('passwordFeedback').innerHTML="<b>*Fill in properly</b>";
        return false;
        }

    // Finally, validation not for format but for correct username and password
    if (x == 'admin@admin.com' && y == 'admin'){
        window.location.replace("ToDoList.html");
        return false;
    } else {
        alert("Wrong username or password");
        return false;
    }

    
}
