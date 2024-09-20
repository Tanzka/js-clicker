import { defaultUpgradeValues } from "./defaultValues.js";

//Function to dynamically generate upgrades with regexp on the site so we can easily add more
function createUpgrades() {
    const upgradesContainer = document.getElementById("upgrades-container");
    const template = document.getElementById("upgrade-template").textContent;

    defaultUpgradeValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        });

        upgradesContainer.innerHTML += html;
    })
}

createUpgrades()

//Array to store the upgrades and their powerups
export const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector(".clicker-cost").innerHTML),
        increase: document.querySelector(".clicker-increase"),
        parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
        level: document.querySelector(".clicker-level"),
        powerUps: [
            {
                name: "2x clicker",
                description: "double your clicking power",
                multiplier: 2,
            },
            {
                name: "3x clicker",
                description: "triple your clicking power",
                multiplier: 3,
            },
            {
                name: "4x clicker",
                description: "quadruple your clicking power",
                multiplier: 4,
            },
            {
                name: "5x clicker",
                description: "quintuple your clicking power",
                multiplier: 5,
            },
            {
                name: "6x clicker",
                description: "sextuple your clicking power",
                multiplier: 6,
            },
            {
                name: "7x clicker",
                description: "septuple your clicking power",
                multiplier: 7,
            },
            {
                name: "8x clicker",
                description: "octuple your clicking power",
                multiplier: 8,
            },
            {
                name: "9x clicker",
                description: "Ninefold-Finger-Fury",
                multiplier: 9,
            },
            {
                name: "10x clicker",
                description: "The universe quakes",
                multiplier: 10,
            },
        ],
        burgerMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parsedCost: parseFloat(document.querySelector(".pickaxe-cost").innerHTML),
        increase: document.querySelector(".pickaxe-increase"),
        parsedIncrease: parseFloat(document.querySelector(".pickaxe-increase").innerHTML),
        level: document.querySelector(".pickaxe-level"),
        powerUps: [
            {
                name: "2x pickaxe",
                description: "double your mining power",
                multiplier: 2,
            },
            {
                name: "3x pickaxe",
                description: "triple your mining power",
                multiplier: 3,
            },
            {
                name: "4x pickaxe",
                description: "quadruple your mining power",
                multiplier: 4,
            },
            {
                name: "5x pickaxe",
                description: "quintuple your mining power",
                multiplier: 5,
            },
            {
                name: "6x pickaxe",
                description: "sextuple your mining power",
                multiplier: 6,
            },
            {
                name: "7x pickaxe",
                description: "septuple your mining power",
                multiplier: 7,
            },
            {
                name: "8x pickaxe",
                description: "octuple your mining power",
                multiplier: 8,
            },
            {
                name: "9x pickaxe",
                description: "Is there anything more left to mine?",
                multiplier: 9,
            },
            {
                name: "10x pickaxe",
                description: "The Earth's crust weeps",
                multiplier: 10,
            },
        ],
        power: 0,
        burgerMultiplier: 1.03,
        costMultiplier: 1.115,
    },
    {
        name: 'chef',
        cost: document.querySelector('.chef-cost'),
        parsedCost: parseFloat(document.querySelector(".chef-cost").innerHTML),
        increase: document.querySelector(".chef-increase"),
        parsedIncrease: parseFloat(document.querySelector(".chef-increase").innerHTML),
        level: document.querySelector(".chef-level"),
        powerUps: [
            {
                name: "2x chef",
                description: "double your patty-making power",
                multiplier: 2,
            },
            {
                name: "3x chef",
                description: "triple your patty-making power",
                multiplier: 3,
            },
            {
                name: "4x chef",
                description: "quadruple your patty-making power",
                multiplier: 4,
            },
            {
                name: "5x chef",
                description: "quintuple your patty-making power",
                multiplier: 5,
            },
            {
                name: "6x chef",
                description: "sextuple your patty-making power",
                multiplier: 6,
            },
            {
                name: "7x chef",
                description: "septuple your patty-making power",
                multiplier: 7,
            },
            {
                name: "8x chef",
                description: "octuple your patty-making power",
                multiplier: 8,
            },
            {
                name: "9x chef",
                description: "The chefs are breaking containment",
                multiplier: 9,
            },
            {
                name: "10x chef",
                description: "There are more restaurants than streets now",
                multiplier: 10,
            },
        ],
        power: 0,
        burgerMultiplier: 1.035,
        costMultiplier: 1.11,
    },
    {
        name: 'restaurant',
        cost: document.querySelector('.restaurant-cost'),
        parsedCost: parseFloat(document.querySelector(".restaurant-cost").innerHTML),
        increase: document.querySelector(".restaurant-increase"),
        parsedIncrease: parseFloat(document.querySelector(".restaurant-increase").innerHTML),
        level: document.querySelector(".restaurant-level"),
        powerUps: [
            {
                name: "2x restaurant",
                description: "double your cooking power",
                multiplier: 2,
            },
            {
                name: "3x restaurant",
                description: "triple your cooking power",
                multiplier: 3,
            },
            {
                name: "4x restaurant",
                description: "quadruple your cooking power",
                multiplier: 4,
            },
            {
                name: "5x restaurant",
                description: "quintuple your cooking power",
                multiplier: 5,
            },
            {
                name: "6x restaurant",
                description: "sextuple your cooking power",
                multiplier: 6,
            },
            {
                name: "7x restaurant",
                description: "septuple your cooking power",
                multiplier: 7,
            },
            {
                name: "8x restaurant",
                description: "octuple your cooking power",
                multiplier: 8,
            },
            {
                name: "9x restaurant",
                description: "The restaurants are monopolizing",
                multiplier: 9,
            },
            {
                name: "10x restaurant",
                description: "Every building is now a restaurant",
                multiplier: 10,
            },
        ],
        power: 0,
        burgerMultiplier: 1.04,
        costMultiplier: 1.10,
    },
]

export const powerUpIntervals = [10, 20, 30, 50, 70, 100, 150, 200, 250, 300]
