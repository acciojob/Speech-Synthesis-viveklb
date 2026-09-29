<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];

  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  // Load available voices
  function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    voicesDropdown.innerHTML = '';

    if (voices.length === 0) {
      const option = document.createElement('option');
      option.textContent = 'No voices available';
      option.value = '';
      voicesDropdown.appendChild(option);
      return;
    }

    voices.forEach((voice) => {
      const option = document.createElement('option');

      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;

      voicesDropdown.appendChild(option);
    });

    msg.voice = voices[0];
  }

  // Select voice
  function setVoice() {
    msg.voice = voices.find(
      (voice) => voice.name === voicesDropdown.value
    );

    toggle();
  }

  // Update rate, pitch or text
  function setOption() {
    msg[this.name] = this.value;

    if (window.speechSynthesis.speaking) {
      toggle();
    }
  }

  // Speak text
  function toggle(startOver = true) {
    window.speechSynthesis.cancel();

    if (!startOver) {
      return;
    }

    const text = document.querySelector('[name="text"]').value.trim();

    if (text === '') {
      return;
    }

    msg.text = text;

    if (voices.length > 0 && !msg.voice) {
      msg.voice = voices[0];
    }

    window.speechSynthesis.speak(msg);
  }

  // Get voices
  populateVoices();

  window.speechSynthesis.addEventListener(
    'voiceschanged',
    populateVoices
  );

  // Voice change
  voicesDropdown.addEventListener('change', setVoice);

  // Rate, pitch and text changes
  options.forEach((option) => {
    option.addEventListener('change', setOption);
  });

  // Speak button
  speakButton.addEventListener('click', function () {
    toggle();
  });

  // Stop button
  stopButton.addEventListener('click', function () {
    toggle(false);
  });
</script>