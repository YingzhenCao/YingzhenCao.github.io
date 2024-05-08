
let modifiedTimestamp;

async function getTimeDetails() {
    try {
        const response = await fetch('http://api.timezonedb.com/v2.1/get-time-zone?key=F71OF6TJRUIH&format=xml&by=zone&zone=America/Chicago');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const xmlData = await response.text(); 
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const timestamp = parseInt(xmlDoc.getElementsByTagName("timestamp")[0].textContent);

        const dateObj = new Date((timestamp * 1000) + (5 * 60 * 60 * 1000)); 
        modifiedTimestamp = dateObj.getTime();

        return { timestamp: modifiedTimestamp, hour, minute, second };
    } catch (error) {
        console.error('There was a problem with fetching the timestamp:', error);
        return null;
    }
}


function updateClock() {
    const dateObj = new Date(modifiedTimestamp); 
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();

    console.log(hour, minute, second);


    document.getElementById("clock").innerHTML = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    document.getElementById("second").innerHTML = second;
}


getTimeDetails();


setInterval(() => {
    modifiedTimestamp += 1000;
    updateClock();
}, 1000);



document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('secondsContainer');
    const hourDisplay = document.getElementById('hour');
    const minuteDisplay = document.getElementById('minute');
    const containerWidth = container.offsetWidth;

    function addSecondElement(second) {
        const secondDiv = document.createElement('div');
        secondDiv.className = 'second';
        secondDiv.textContent = second;
        secondDiv.style.color = 'black';  
        secondDiv.style.backgroundColor='';
        secondDiv.style.fontSize = '30px';
        secondDiv.style.left = `${Math.random() * (containerWidth - 50)}px`;
        secondDiv.style.transform = `rotate(${(Math.random() * 60) - 30}deg)`;

        if (container.firstChild && container.firstChild.className === 'second') {
            container.firstChild.style.color = '';
            container.firstChild.style.fontSize = '';
        }

        container.prepend(secondDiv); 


        const seconds = container.getElementsByClassName('second');
        if (seconds.length > 60) {
            container.removeChild(seconds[seconds.length - 1]);  
        }
    }


    function updateClock() {
        const modifiedDate = new Date(modifiedTimestamp); 
        const hour = modifiedDate.getHours();
        const minute = modifiedDate.getMinutes();
        const second = modifiedDate.getSeconds();

        hourDisplay.textContent = hour < 10 ? `0${hour}` : hour;
        minuteDisplay.textContent = minute < 10 ? `0${minute}` : minute;
        addSecondElement(second < 10 ? `0${second}` : second);

        modifiedTimestamp += 1000;
    }
    setInterval(updateClock, 1000);
});





