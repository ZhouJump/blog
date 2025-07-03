{
   function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    let time = new Date(decodeURI(getQueryVariable("time")))
    let text = getQueryVariable("text");
    let countdown = document.querySelector(".countdown");
    let title = document.querySelector(".title");
    title.innerHTML = decodeURI(text);
    let countdownItems = countdown.querySelectorAll(".countdown-item");
    let countdownNums = countdown.querySelectorAll(".countdown-num");
    let countdownUnits = countdown.querySelectorAll(".countdown-unit");

    
    setInterval(() => {
        let countdownTime = time - Date.now();
        let countdownTimeDay = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
        let countdownTimeHour = Math.floor(countdownTime / (1000 * 60 * 60) % 24);
        let countdownTimeMinute = Math.floor(countdownTime / (1000 * 60) % 60);
        let countdownTimeSecond = Math.floor(countdownTime / 1000 % 60);
        countdownNums[0].innerHTML = countdownTimeDay;
        countdownNums[1].innerHTML = countdownTimeHour;
        countdownNums[2].innerHTML = countdownTimeMinute;
        countdownNums[3].innerHTML = countdownTimeSecond;
    }, 500);
    

}