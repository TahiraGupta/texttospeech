const textarea = document.querySelector("textarea")
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");
let synth = speechSyntheis,
isSpeaking = true;
voices();

function voices(){
    for(let voice of synth.getVoices())
        {
            //selecting "Google US English" voice as default
        let selected = voice.name === "Google Us English"?  "selected" : "";          
        //creating an option tag with passing voice name and voice language
            let option = ' <option value ="">${voice.name}</option>'
            voiceList.insertAdjacentHTML("beforeend",option);


        }
}

synth.addEventListener("voiceschanged",voices);

function textToSpeech(text)
{
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value)
            {
            utternance.voice = voice;

    }
    }
    synth.speak(utternance);
}
    speechSynthesis.speak(utternance);//speak the speech/utternance

speechBtn.addEventListener("click",e=>{
    e.preventDefault();
    if(textarea.value !== "")
        {
            if(!synth.speaking)
                {
            textToSpeech(textarea.value);
        }
        if(textarea.value.length>80){
            if(isSpeaking)
                {
                   synth.resume();
                   isSpeaking = false; 
                   speechBtn.innerText = "Pause Speech";

                }
                else{
                    synth.pause();
                   isSpeaking = true; 
                   speechBtn.innerText = "Resume Speech";
                }
                setInterval(()=>{
                    if(!synth.speaking && !isSpeaking){
                        isSpeaking = true;
                        speechBtn.innerText = "Convert to Speech";
                    }

                });
        }else{
            speechBtn.innerText = "Convert to Speech";
        }
    }

});