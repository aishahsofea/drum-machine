import Drum from "./drum.js";
import {heaterKit} from "./audio.js";

const $powerCheckbox = document.querySelector("#power");
const $display = document.querySelector("#display");
let powerOff = true;

$powerCheckbox.addEventListener("change", _ => {
    if ($powerCheckbox.checked) {
        $display.style.opacity = "1";
        $display.innerHTML = `Welcome to the drum machine!`;
        Drum.listeners(powerOff);
        powerOff = false;
    }
    else {
        $display.style.opacity = ".6";
        $display.innerHTML = `See you later!`;
        Drum.listeners(powerOff);
        powerOff = true;
    }
});


