import {heaterKit} from "./audio.js";
import {smoothPianoKit} from "./audio.js";


const Drum = (_ => {

    // cache the DOM
    const $drumPad = document.querySelector("#keys");
    const $volumeSlider = document.querySelector(".volume-slider");
    const $bankCheckbox = document.querySelector("#bank");
    const $display = document.querySelector("#display");
    const $volumeDown = document.querySelector("#volume-down");
    let bankOff = true;
    let kit = heaterKit;

    const listeners = permission => {
        if (permission) {
            $bankCheckbox.addEventListener("change", function() {
                if ($bankCheckbox.checked) {
                    $display.innerHTML = `Smooth Piano Kit`;
                    bankOff = false;
                    kit = smoothPianoKit;
                } else {
                    $display.innerHTML = `Heater Kit`;
                    bankOff = true;
                    kit = heaterKit;
                }
            });
            $drumPad.addEventListener("click", playDrumPad);
        } else {
            $drumPad.removeEventListener("click", playDrumPad);
        }
    }

    const playDrumPad = event => {
        if (event.target && event.target.matches("button.drum-pad")) {
            const arrByKeyTrigger = kit.filter((obj) => obj.keyTrigger === event.target.id);
            const audio = new Audio(`${arrByKeyTrigger[0].url}`);
            audio.volume = $volumeSlider.value/100;
            audio.play();
            $display.innerHTML = `${arrByKeyTrigger[0].id}`;
            console.log(arrByKeyTrigger[0].id);
        }
    }

    $volumeSlider.oninput = function() {
        document.querySelector("#volume-range").innerHTML = `volume: ${this.value}`;
        if (this.value == 0) {
            console.log(`the value is ${this.value} now`)
            $volumeDown.innerHTML = `<i class="fa fa-volume-off"></i>`;
        } else {
            $volumeDown.innerHTML = `<i class="fa fa-volume-down"></i>`;
        }
    }


    return {
        listeners
    }

})();

export default Drum;