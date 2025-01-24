getMemes();
getDog();
getChuck();
getUseless();

function getUseless() {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('uselessfact').innerText = data.text;
            console.table(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        document.getElementById('dog').src = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getMemes() {
    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            const meme = document.getElementById('meme');
            const id = Math.floor(Math.random() * data.data.memes.length);
            meme.src = data.data.memes[id].url;
            meme.alt = data.data.memes[id].name;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function getChuck() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('joke').innerText = data.value;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}