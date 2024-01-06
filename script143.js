

// two functions one to submit  and have the voice speak
// the other to fill the select box with voices

// variable to get different voices
const voiceSelect = document.getElementById('voice-select');

const synth = window.speechSynthesis

let voices;

// function to add other voices
function addVoiceToSelect() {
    // synth object has a method called getVoices that will get me the voices
    voices = synth.getVoices();

    // looping through the voices and filling the select box with options
    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
        option.textContent = `${voices[i].name}`;

        if (voices[i].default) {
            option.textContent += ' - DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}

// function to speak
function onSubmit(e) {
    e.preventDefault();

    const textInput = document.getElementById('text-input');

    const utterThis = new SpeechSynthesisUtterance(textInput.value);

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }

    synth.speak(utterThis);
};

// calling the voices
addVoiceToSelect();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = addVoiceToSelect;
}

// event to speak
document.getElementById('form').addEventListener('submit', onSubmit);