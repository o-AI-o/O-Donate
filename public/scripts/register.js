function checkData() {
    const alertField = document.getElementById('alertField');
    alertField.innerHTML = "";

    var username        = $("#Username").val();
    var email           = $("#Email").val();
    var password        = $("#Password").val();
    var confirmPassword = $("#cfPassword").val();

    if (!username)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Username.</li>";
    if (!email)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Email.</li>";
    if (!password)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Password.</li>";
    if (!confirmPassword)
        alertField.innerHTML = alertField.innerHTML + "<li>Please confirm Password.</li>";
    if (password != confirmPassword)
        alertField.innerHTML = alertField.innerHTML + "<li>Password don't match.</li>";

    if (alertField.innerHTML == "") return true;
    else return false;
}