<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];

  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll(
    '[type="range"], [name="text"]'
  );
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  const textArea = document.querySelector('[name="text"]');

  // Initial text
  msg.text = textArea.value;

  function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    voicesDropdown.innerHTML =
      '<option value="">Select A Voice</option>';

    voices.forEach((voice) => {
      const option = document.createElement('option');

      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;

      voicesDropdown.appendChild(option);
    });
  }

  function setVoice() {
    msg.voice = voices.find(
      voice => voice.name === this.value
    );

    toggle();
  }

  function toggle(startOver = true) {
    window.speechSynthesis.cancel();

    if (startOver && msg.text.trim() !== '') {
      window.speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    // Rate and pitch MUST be numbers
    if (this.name === 'rate') {
      msg.rate = Number(this.value);
    } 
    else if (this.name === 'pitch') {
      msg.pitch = Number(this.value);
    } 
    else if (this.name === 'text') {
      msg.text = this.value;
    }

    // Restart with updated settings if speaking
    if (window.speechSynthesis.speaking) {
      toggle();
    }
  }

  // Load voices
  populateVoices();

  window.speechSynthesis.addEventListener(
    'voiceschanged',
    populateVoices
  );

  // Voice selector
  voicesDropdown.addEventListener('change', setVoice);

  // Dynamically update rate and pitch
  options.forEach(option => {
    option.addEventListener('input', setOption);
    option.addEventListener('change', setOption);
  });

  // Speak
  speakButton.addEventListener('click', function () {
    msg.text = textArea.value;

    if (msg.text.trim() !== '') {
      toggle();
    }
  });

  // Stop
  stopButton.addEventListener('click', function () {
    toggle(false);
  });
</script>