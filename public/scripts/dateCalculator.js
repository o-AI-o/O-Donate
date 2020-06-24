var nowDate = Date.now();

function calDate (thisDate) {

    if (thisDate.getFullYear() != nowDate.getFullYear() && thisDate.getMonth() <= nowDate.getMonth())
        return (nowDate.getFullYear()-thisDate.getFullYear()) + " years ago.";
    else if (thisDate.getMonth() != nowDate.getMonth() && thisDate.getDate() <= nowDate.getDate())
        return (nowDate.getMonth()-thisDate.getMonth()) + " months ago.";
    else if (thisDate.getDate() != nowDate.getDate() && thisDate.getHours() <= nowDate.getHours())
        return (nowDate.getDate()-thisDate.getDate()) + " days ago.";
    else if (thisDate.getHours() != nowDate.getHours() && thisDate.getMinutes() <= nowDate.getMinutes())
        return (nowDate.getHours()-thisDate.getHours()) + " hours ago.";
    else if (thisDate.getMinutes() != nowDate.getMinutes() && thisDate.getSeconds() <= nowDate.getSeconds())
        return (nowDate.getMinutes()-thisDate.getMinutes()) + " minutes ago.";
    else
        return (nowDate.getSeconds()-thisDate.getSeconds()) + " seconds ago.";
}