function timer() {
        //timer 
        const deadline = '2022-02-15';

        //const deadline = `2021-${deadline1.getMonth()+1}-${deadline1.getDay()+12}`; // always deadline 1 day
    
    
        function getTimeRemaining(endtime) {
            const toTime = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(toTime /(1000*60*60*24)),
                hours = Math.floor(toTime /(1000*60*60) % 24),
                minutes = Math.floor((toTime /1000/60)%60),
                seconds = Math.floor((toTime /1000)%60);
                return {
                    'total' : toTime,
                    'days' : days,
                    'hours':hours,
                    'minutes' : minutes,
                    'seconds': seconds
                }
        }
    
        function addZero(num) {
            if (num >= 0 && num <10) {
                return `0${num}`;
            } else 
            return num;
        }
    
    
        function setClock(selector, endTime) {
            const timer = document.querySelector(selector),
                days =timer.querySelector('#days'),
                hourse =timer.querySelector('#hourse'),
                minutes =timer.querySelector('#minutes'),
                seconds =timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
                updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endTime);
                    days.innerHTML = addZero(t.days);
                    hours.innerHTML = addZero(t.hours);
                    minutes.innerHTML = addZero(t.minutes);
                    seconds.innerHTML = addZero(t.seconds);
    
                    if (t.total <= 0) {
                        clearInterval(timeInterval);
                    }
            }
    
        }
    
        setClock('.timer', deadline);

}

module.exports = timer;