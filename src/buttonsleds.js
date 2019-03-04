'use strict';

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var LEDAuto  = new Gpio(13, 'out'); 
var LED100  = new Gpio(19, 'out'); 
var LED50  = new Gpio(26, 'out'); 

var btnAuto = new Gpio(4, 'in', 'both'); //use GPIO as input, and 'both' button presses, and releases should be handled
var btn100 = new Gpio(17, 'in', 'both'); //use GPIO as input, and 'both' button presses, and releases should be handled
var btn50 = new Gpio(27, 'in', 'both'); //use GPIO as input, and 'both' button presses, and releases should be handled

btnAuto.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  LEDAuto.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
});

btn100.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
    return;
    }
    LED100.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
  });

  btn50.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
    return;
    }
    btn50.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
  });
  
function unexportOnClose() { //function to run when exiting program
    LEDAuto.writeSync(0); // Turn LED off
    LEDAuto.unexport(); // Unexport LED GPIO to free resources
    btnAuto.unexport(); // Unexport Button GPIO to free resources
    LED100.writeSync(0); // Turn LED off
    LED100.unexport(); // Unexport LED GPIO to free resources
    btn100.unexport(); // Unexport Button GPIO to free resources
    btn50.writeSync(0); // Turn LED off
    btn50.unexport(); // Unexport LED GPIO to free resources
    btn50.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c 