const alertField = document.getElementById('alertField');

function checkData() {
    console.log("Check");
    var username        = $("#Username").val();
    var email           = $("#Email").val();
    var password        = $("#Password").val();
    var confirmPassword = $("#cfPassword").val();

    alertField.innerHTML = "";

    if (!username)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Username.</li>";
    if (!email)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Email.</li>";
    if (!password)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Password.</li>";
    if (!confirmPassword)
        alertField.innerHTML = alertField.innerHTML + "<li>Please confirm password.</li>";
    if (password != confirmPassword)
        alertField.innerHTML = alertField.innerHTML + "<li>Password don't match.</li>";

    if (alertField.innerHTML == "") return true;
    else return false;
}