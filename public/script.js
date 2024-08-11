const gifContainer = document.getElementById('gif-container');
const convincedButton = document.getElementById('convinced-button');
const notConvincedButton = document.getElementById('not-convinced-button');
const convinceText = document.getElementById('convince-text');
const convinceAudio = document.getElementById('convince-audio');
const nameH1 = document.querySelector('#name')
const Myname = prompt("Please Enter Your Name🥹:")

if (!Myname) {
    nameH1.textContent += "My love❤️";
}
else {
    nameH1.textContent += `${Myname}❤️`;
}


let gifIndex = 1;
let notConvincedCount = 0;
const messages = [
    "Aree, tu maro diko chone to mani jaa",
    "Oyy babydiii",
    "mani jaa ne dikaa",
    "Mani jaa mare Dalda matching karva che",
    "Evu shu kare che manii jaa ne",
    "You mean the world to me!",
    "oyy sadelii",
    "Okay, last time have nai kau evu!",
    "Please, let me win your heart!",
    "please....."
];

const favoriteGif = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXJocDNsYzI4MmJ3MzZveXRpbmQ4YTkydzZqZzNxNzRwZGNhbnR3aCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fvN5KrNcKKUyX7hNIA/200.webp'; // Set your favorite GIF path here
const gifSources = [
    'https://media.tenor.com/VXqink0UhmcAAAAj/bite.gif',
    'https://media.tenor.com/1dgu7F5zsFMAAAAj/milk-and-mocha.gif',
    'https://media.tenor.com/-Oes-vO2J-sAAAAj/milk-and-mocha.gif',
    'https://media.tenor.com/lRfKPZBEXXAAAAAj/milk-and-mocha.gif',
    'https://media.tenor.com/0nb_g8Y5NzQAAAAj/milk-and-mocha-cute.gif',
    'https://media.tenor.com/cI4bskqyalQAAAAj/milk-and-mocha.gif',
    'https://media.tenor.com/-Oes-vO2J-sAAAAj/milk-and-mocha.gif',
    'https://media.tenor.com/aJ46M1lGpr4AAAAM/angry-girl.gif',
    'https://media.tenor.com/2xsDm_DuCwsAAAAj/github-sticker.gif',
    'https://media.tenor.com/5HNW7Bv4FGgAAAAM/bandri.gif',
];

function preloadGIFs(callback) {
    let loadedGIFs = 0;
    gifSources.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            loadedGIFs++;
            if (loadedGIFs === gifSources.length) {
                callback();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load GIF: ${src}`);
            loadedGIFs++;
            if (loadedGIFs === gifSources.length) {
                callback();
            }
        };
    });
}

function loadNewGif() {
    gifIndex++;
    if (gifIndex >= gifSources.length) gifIndex = 0; // Reset to the first GIF in the array after reaching the end
    const newGif = document.createElement('img');
    newGif.src = gifSources[gifIndex]; // Use GIF from the array
    newGif.id = 'convince-gif';
    newGif.className = 'fade-in';

    gifContainer.innerHTML = ''; // Clear the previous gif
    gifContainer.appendChild(newGif);

    convinceText.textContent = messages[notConvincedCount % messages.length];
}

convincedButton.addEventListener('click', () => {
    const newGif = document.createElement('img');
    newGif.src = favoriteGif; // Load the favorite GIF when convinced
    newGif.id = 'convince-gif';
    newGif.className = 'fade-in';

    gifContainer.innerHTML = ''; // Clear the previous gif
    gifContainer.appendChild(newGif);

    convincedButton.textContent = "I love you😘";
    convinceText.style.display = 'none'
    notConvincedButton.style.display = 'none'
    convinceAudio.play();
    collectUserData();
});

notConvincedButton.addEventListener('click', () => {
    notConvincedCount++;
    loadNewGif();

    if (notConvincedCount >= 10) {
        enableMovingButton();
    }
});

function enableMovingButton() {
    notConvincedButton.classList.add('move');
    notConvincedButton.addEventListener('mouseover', moveButtonRandomly);
}

function moveButtonRandomly() {
    const x = Math.random() * (window.innerWidth - notConvincedButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - notConvincedButton.offsetHeight);
    notConvincedButton.style.position = 'absolute';
    notConvincedButton.style.left = `${x}px`;
    notConvincedButton.style.top = `${y}px`;
}

function init() {
    document.getElementById('preloader').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

preloadGIFs(init);


function collectUserData() {
    const userData = {
        name : Myname,
        browser: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        userAgent: navigator.userAgent
    };

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            userData.ipAddress = data.ip;
            sendUserData(userData);
        })
        .catch(error => console.error('Error fetching IP address:', error));
}

function sendUserData(userData) {
    fetch('/send-email-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(response => {
        if (response.ok) {
            console.log("okk");

        } else {
            console.log("not ok");
        }
    });
}

