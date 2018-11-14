/*  
    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

// global variables

var httpRequest = new XMLHttpRequest();
var myRows = new Array(row1, row2, row3, row4, row5);
var next5Button = document.getElementById("next5");
var next5Falcon = document.getElementById("nextFalcon");
var next5Ariane = document.getElementById("nextAriane");
var next5LauncherOne = document.getElementById("nextLauncherOne");
var countdownTimer = document.getElementById("counter");
window.addEventListener("load", next5Launches);
next5Button.addEventListener("click", next5Launches);
next5Falcon.addEventListener("click", nextFalconLaunches);
next5Ariane.addEventListener("click", nextArianeLaunches);
next5LauncherOne.addEventListener("click", nextLauncherOneLaunches);

function next5Launches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?next=5");
    httpRequest.send();
    theRockets.innerHTML = "Next Five Rocket Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextFalconLaunches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=falcon&next=5");
    httpRequest.send();
   theRockets.innerHTML = "Falcon Next Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextArianeLaunches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=ariane&next=5");
    httpRequest.send();
   theRockets.innerHTML = "Ariane Next Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function nextLauncherOneLaunches()
{
    httpRequest.abort();
    httpRequest.open("get", "https://launchlibrary.net/1.4/launch?name=launcherone&next=5");
    httpRequest.send();
    theRockets.innerHTML = "LauncherOne Next Launches";
    httpRequest.onreadystatechange = launchFunction;
}
function launchFunction()
{
    if(httpRequest.readyState === 4 && httpRequest.status === 200)
    {

        var launchReport = httpRequest.responseText;
        console.log(launchReport);
        
        var launchObject = JSON.parse(launchReport);
        console.log(launchObject);
        console.log(launchObject.launches.length);
        console.log(launchObject.launches[0].name);

        var countdown = new Date(launchObject.launches[0].windowend).getTime();
        var timer = setInterval(function(){
        var now = new Date().getTime();
        var distanceBetween = countdown - now;

        var days = Math.floor(distanceBetween / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distanceBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distanceBetween % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distanceBetween % (1000 * 60)) / 1000);

            countdownTimer.innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";


            if (distanceBetween < 0) {
                clearInterval(timer);
                countdownTimer.innerHTML = "";
            }
            }, 1000);
        
                for(let i = 0; i < 5; i++)
                {
                    myRows[i].innerHTML = launchObject.launches[i].name + " || " + launchObject.launches[i].windowend;
                }
            }
}