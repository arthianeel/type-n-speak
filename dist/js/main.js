const synth=window.speechSynthesis;
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

let voices=[];

const  getVoices=()=>{

    voices=synth.getVoices();
    
voices.forEach(voice=>{

    const option=document.createElement('option');
    
    option.textContent=voice.name+ '('+ voice.lang +')';
    
    option.setAttribute('data-name',voice.name);
    voiceSelect.appendChild(option);
});

};
getVoices();
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged=getVoices;
}

const speak=()=>{
   
    if(synth.speaking){
        console.error('already speaking');
        return;
    }
    if(textInput.value!==''){
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
    
        const speakText=new SpeechSynthesisUtterance(textInput.value);
        speakText.onend=e=>{
            console.log('done speaking');
            body.style.background = '#141414';
        }
        speakText.onerror=e=>{
            console.error('Something went wrong');
        }
        const selectedvoice=voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice=>{
            if(voice.name===selectedvoice){
                speakText.voice=voice;
            }
        });

        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        synth.speak(speakText);
    }
};

textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change',e=>(rateValue.textContent=rate.value));
pitch.addEventListener('change',e=>(pitchValue.textContent=pitch.value));

voiceSelect.addEventListener('change',e=>speak());
