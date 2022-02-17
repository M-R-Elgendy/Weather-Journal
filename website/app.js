/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'c42931776eef40cc9aa2e9251b7a4700&units=metric'; // My API Key 
const genBtn = document.querySelector('#generate');
const errSpan = document.querySelector('.errSpan');
const errMsg = document.querySelector('.errMsg');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
genBtn.addEventListener('click', performAction);


// Helper functions

// Function to GET Weather Data
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const finalUrl = `${baseUrl}?q=${zipCode}&appid=${apiKey}`
    const res = await fetch(finalUrl);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

// Function to send data 
const sendData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content,
            name: data.name
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

// Funtion to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();

        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined && allData.name !== undefined) {
            document.getElementById('date').innerHTML = `Date: <span class='color-red'>${allData.date}</span>`;
            document.getElementById('temp').innerHTML = `Temp In <span class='color-red'>${allData.name}</span> Is: <span class='color-red'>${allData.temp}</span> C`;
            document.getElementById('content').innerHTML = `You Are Feel Like: <span class='color-red'>${allData.content}</span>`;
        }
    } catch (err) {
        console.log('error', err);
    }
};



// Main Function
function performAction(e) {
    e.preventDefault();

    //get user input
    const zipCode = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;

    if (zipCode !== '') {
        getWeatherData(baseUrl, zipCode, apiKey)
            .then((data) => {
                // add data to POST request
                errSpan.classList.add("hidden");
                sendData('/add', {
                    temp: data.main.temp,
                    date: newDate,
                    content: content,
                    name: data.name
                });

            }).then(() => {
                updateUI()

            }).catch(function (error) {
                errSpan.classList.remove("hidden");
                errMsg.innerHTML = ("Invalid zip code.");
            });
    } else {
        errSpan.classList.remove("hidden");
        errMsg.innerHTML = ("Zip code can not be empty.");
    }


}