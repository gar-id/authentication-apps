import './style.css';
import './app.css';
import './webCrumbs.css'
import {OTP} from '../wailsjs/go/main/App';

document.querySelector('#otpCode').innerHTML = getOTP();

setInterval(function() {
    // Get current time
    let currentTime = new Date().getSeconds();

    // If second is modulus of 30, then refresh
    if (currentTime % 30 == 0) {
        getOTP()
        document.querySelector("#countdown").innerHTML = "Will be refresh in 30 second"
    } else {
        let refreshCount = 0;
        if (currentTime > 30 ) {
            refreshCount = currentTime - 60
            refreshCount = Math.abs(refreshCount)
        } else {
            refreshCount = currentTime - 30 
            refreshCount = Math.abs(refreshCount)
        }
        document.querySelector("#countdown").innerHTML = `Will be refresh in ${refreshCount} second`
    }
}, 100);

function getOTP() {
    // Call App.OTP()
    try {
        OTP()
            .then((result) => {
                console.log(result);
                let otpHTML = "";

                for (const [key, value] of Object.entries(result)) {
                    otpHTML = otpHTML+`
                    <div class="w-full text-grey">${key}</div>
                    <div class="w-full space-y-4 mb-8">
                        <div class="relative w-full">
                            <input id="${key}" value="${value}" type="text" readonly="" class="w-full h-12 text-center text-xl font-mono bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                            <div class="absolute right-2 top-1/2 -translate-y-1/2">
                                <div class="h-10 w-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
                                    <span id="copy-${key}" onclick="copyOTP('${key}')" class="text-white font-medium">Copy</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
                document.querySelector('#otpCode').innerHTML = otpHTML       
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
}