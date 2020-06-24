const alertField = document.getElementById('alertField');

function checkData() {
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

function checkA() {
    alertField.innerHTML = "";

    var image           = $("#imgPreview").val();
    var firstname       = $("#Firstname").val();
    var lastname        = $("#Lastname").val();
    var address         = $("#Address").val();
    var description     = $("#Description").val();

    if (!image)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Image.</li>";
    if (!firstname)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Firstname.</li>";
    if (!lastname)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Lastname.</li>";
    if (!address)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Address.</li>";
    if (!description)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Some Detail.</li>";

    if (alertField.innerHTML == "") return true;
    else return false;
}

function checkB() {
    alertField.innerHTML = "";

    var creditnum       = $("#Creditnum").val();
    var month           = $("#Month").val();
    var year            = $("#Year").val();
    var cvv             = $("#CVV").val();

    if (!creditnum)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Credit.</li>";
    if (month == 0)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Expired Month For Credit Confirm.</li>";
    if (year == 0)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Expired Year For Credit Confirm.</li>";
    if  (!cvv)
        alertField.innerHTML = alertField.innerHTML + "<li>Require CVV For Credit Confirm.</li>";

    if (alertField.innerHTML == "") return true;
    else return false;
}

function checkFundraiser() {
    alertField.innerHTML = "";

    var image           = $("#imgPreview").val();
    var category        = $("#Category").val();
    var name            = $("#FName").val();
    var topic           = $("#FTopic").val();
    var description     = $("#FDesc").val();
    var target          = $("#FTarget").val();

    if (!image)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Image.</li>";
    if (category == 0)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Fundraiser Category.</li>";
    if (!name)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Fundraiser Name.</li>";
    if (!topic)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Fundraiser Topic.</li>";
    if (!description)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Fundraiser Description.</li>";
    if (!target)
        alertField.innerHTML = alertField.innerHTML + "<li>Require Fundraiser Donate Amount.</li>";

    if (alertField.innerHTML == "") return true;
    else return false;
}