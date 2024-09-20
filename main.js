import { powerUpIntervals, upgrades } from "./constants/upgrades.js";
import { defaultUpgradeValues } from "./constants/defaultValues.js";

//initialize some general variables that we need
let hamburger = document.querySelector('.burger-cost');
let parsedBurger = parseFloat(hamburger.innerHTML);

let bpcText = document.getElementById("bpc-text");
let bpsText = document.getElementById("bps-text");

let burgerImgContainer = document.querySelector(".burger-img-container");

let prestigeButton = document.querySelector(".prestige-button");
let relic = document.getElementById("relic");

let bpc = 1;
let bps = 0;

const bgm = new Audio("/assets/audio/bgm.mp3");
bgm.volume = 0.15

//Implement the actual function for clicking the burger and getting anything, also add a fancy animation to show the gains
function incrementBurgers(event) {
    const clickingSound = new Audio("/assets/audio/click.wav");
    clickingSound.play()

    hamburger.innerHTML = Math.round(parsedBurger += bpc);

    const x = event.offsetX;
    const y = event.offsetY;

    const div = document.createElement('div');
    div.innerHTML = `+${Math.round(bpc)}`;
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
    burgerImgContainer.appendChild(div);

    div.classList.add('fade-up');

    timeout(div);
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 800)
}

//Implement the main function to buy more levels as well as the special upgrades
function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`);
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`);
    const nextLevelP = document.getElementById(`${mu.name}-next-p`);

    if (parsedBurger >= mu.parsedCost) {
        const upgradeSound = new Audio("/assets/audio/upgrade.mp3");
        upgradeSound.volume = 0.1;
        upgradeSound.play()

        hamburger.innerHTML = Math.round(parsedBurger -= mu.parsedCost);

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));

        if (index !== -1) {
            upgradeDiv.style.cssText = `border-color: white`;
            nextLevelDiv.style.cssText = `background-color: #5A5959; font-weight: normal`;
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)

            if (mu.name === "clicker") {
                bpc *= mu.powerUps[index].multiplier
                nextLevelP.innerHTML = `+${mu.parsedIncrease} burgers per click`
            } else {
                bps -= mu.power 
                mu.power *= mu.powerUps[index].multiplier 
                bps += mu.power
                nextLevelP.innerHTML = `+${mu.parsedIncrease} burgers per second`
            }
        }

        mu.level.innerHTML ++

        index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));

        if (index !== -1) {
            upgradeDiv.style.cssText = `border-color: orange`;
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`;
            nextLevelP.innerText = mu.powerUps[index].description 

            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML));
        } else {
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier);
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.burgerMultiplier).toFixed(2));

            if (mu.name === "clicker") nextLevelP.innerHTML = `${mu.parsedIncrease} burgers per click`
            else nextLevelP.innerHTML = `+${mu.parsedIncrease} burgers per second`
        }

        if (mu.name === "clicker") bpc += mu.parsedIncrease
        else {
            bps -= mu.power
            mu.power += mu.parsedIncrease
            bps += mu.power 
        }

        
    }
}

//Add in a function to save and load the game locally
function save() {
    localStorage.clear();

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, obj)
    })

    localStorage.setItem('bpc', JSON.stringify(bpc))
    localStorage.setItem('bps', JSON.stringify(bps))
    localStorage.setItem('burger', JSON.stringify(parsedBurger))
}

function load() {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;

        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease;
    })

    bpc = JSON.parse(localStorage.getItem('bpc'));
    bps = JSON.parse(localStorage.getItem('bps'));
    parsedBurger = JSON.parse(localStorage.getItem('burger'));

    hamburger.innerHTML = Math.round(parsedBurger);
}

//User may prestige once they have 1 million burgers. Doesn't really do much beyond a full reset but every clicker needs a feature like this
function prestige() {
    upgrades.map((upgrade) => {
        const mu = defaultUpgradeValues.find((u) => {if (upgrade.name === u.name) return u})
        
        upgrade.parsedCost = mu.cost;
        upgrade.parsedIncrease = mu.increase;
    
        upgrade.level.innerHTML = 0;
        upgrade.cost.innerHTML = mu.cost;
        upgrade.increase.innerHTML = mu.increase;

        const upgradeDiv = document.getElementById(`${mu.name}-upgrade`);
        const nextLevelDiv = document.getElementById(`${mu.name}-next-level`);
        const nextLevelP = document.getElementById(`${mu.name}-next-p`);

        upgradeDiv.style.cssText = `border-color: white`;
        nextLevelDiv.style.cssText = `background-color: #5A5959; font-weight: normal`;
        nextLevelP.innerHTML = `${mu.increase} burgers per click`
    })

    relic.innerHTML = Math.ceil(Math.sqrt(parsedBurger - 999999) / 300);

    bpc = 1;
    bps = 0;
    parsedBurger = 0;
    hamburger.innerHTML = parsedBurger;
}

setInterval(() => {
    parsedBurger += bps / 10;
    hamburger.innerHTML = Math.round(parsedBurger)
    bpcText.innerHTML = Math.round(bpc);
    bpsText.innerHTML = Math.round(bps);
    bgm.play()

    if (parsedBurger >= 1_000_000) {
        prestigeButton.style.display = "block";
    } else {
        prestigeButton.style.display = "none";
    }
}, 100)


window.incrementBurgers = incrementBurgers;
window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;
window.prestige = prestige;
