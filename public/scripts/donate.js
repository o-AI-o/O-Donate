const alertField1 = document.getElementById("alertField1");
const donateBox = document.getElementById("donateBox");

function donateCheck() {
    var donateAmount = $("#donateBox").val();

    if (donateAmount < 5 || donateAmount > 50000) {
        alertField1.innerHTML = "Your donate out of range. Your donate should be around $5-$50k";
    } else {
        alertField1.innerHTML = "";
    }

    if (alertField1.innerHTML == "") return true;
    else return false;
}