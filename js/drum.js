import {heaterKit} from "./audio.js";
import {smoothPianoKit} from "./audio.js";


const Drum = (_ => {

    // cache the DOM
    const $drumPad = document.querySelector("#keys");
    const $volumeSlider = document.querySelector(".volume-slider");
    const $bankCheckbox = document.querySelector("#bank");
    const $display = document.querySelector("#display");
    const $volumeDown = document.querySelector("#volume-down");
    const $volumeRange = document.querySelector("#volume-range");
    let bankOff = true;
    let kit = heaterKit;

    $bankCheckbox.disabled = true;

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

            $bankCheckbox.disabled = false;
            $drumPad.addEventListener("click", playDrumPad);
            window.addEventListener("keypress", playWithKey);
        } else {
            $bankCheckbox.checked = false;
            $bankCheckbox.disabled = true;
            $volumeSlider.value = 50;
            $volumeRange.innerHTML = `volume: ${$volumeSlider.value}`;
            $drumPad.removeEventListener("click", playDrumPad);
            window.removeEventListener("keypress", playWithKey)
        }
    }

    const playWithKey = event => {
        const arrByKeyPress = kit.filter((obj) => obj.keyCode == event.keyCode - 32);
            const audio = new Audio(`${arrByKeyPress[0].url}`);
            audio.volume = $volumeSlider.value/100;
            audio.play()
            $display.innerHTML = `${arrByKeyPress[0].id}`;
    }

    const playDrumPad = event => {
        if (event.target && event.target.matches("button.drum-pad")) {
            const arrByKeyTrigger = kit.filter((obj) => obj.keyTrigger === event.target.id);
            const audio = new Audio(`${arrByKeyTrigger[0].url}`);
            audio.volume = $volumeSlider.value/100;
            audio.play();
            $display.innerHTML = `${arrByKeyTrigger[0].id}`;
        }
    }

    $volumeSlider.oninput = function() {
        $volumeRange.innerHTML = `volume: ${this.value}`;
        if (this.value == 0) {
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