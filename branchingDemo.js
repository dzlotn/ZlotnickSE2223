// Filename:    branchingDemo.js
//Author:       D. Zlotnick
//Objective:    Demonstrate how to use GitHub Brances
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December" ]
const d = new Date();
//getMonth() returns the month as an integer (0-11). Jan = 0, Dec = 13
let month = months[d.getMonth()]
let day= d.getDate()
let year= d.getFullYear()
let currentDate = "The current data is " + month + " " + day + ", " + year
console.log(d)
console.log(currentDate)

