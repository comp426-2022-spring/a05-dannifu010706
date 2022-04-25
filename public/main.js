// Focus div based on nav button click
const homenav = document.getElementById("homenav");
const guessnav = document.getElementById("guessnav");
const singlenav = document.getElementById("singlenav");
const multinav = document.getElementById("multinav");
const coin = document.getElementById("coin");
const coins = document.getElementById("multipleCoins");

homenav.addEventListener("click", activeHome);
guessnav.addEventListener("click", activeGuess);
singlenav.addEventListener("click", activeSingle);
multinav.addEventListener("click", activeMultiple);
coin.addEventListener("click", Flipcoin);
coins.addEventListener("submit", Flipmany);

function activeHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}



function activeSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}



function activeMultiple() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}


function activeGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}





function Flipcoin() {
    fetch('http://localhost:5000/app/flip')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("singleFlipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "./assets/img/" + result.flip + ".png");
        })
}


async function Flipmany(event) {
    event.preventDefault();
    const endpoint = "app/flip/coins/";
    const url = document.baseURI + endpoint;
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });
        console.log(flips);
        document.getElementById("heads").innerHTML = "heads: " + flips.summary.Heads;
        document.getElementById("tails").innerHTML = "tails: " + flips.summary.Tails;
    } catch (error) {
        console.log(error);
    }
}

async function sendFlips({ url, formData }) {

    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return response.json();
}