const fileInput = document.getElementById('speaker_wav');
const fileUploadPlaceholder = document.querySelector('.file-upload-placeholder');
const fileUploadText = fileUploadPlaceholder.querySelector('span');

fileUploadPlaceholder.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileUploadText.textContent = fileInput.files[0].name;
    } else {
        fileUploadText.textContent = 'Click to upload';
    }
});

document.getElementById('voice-cloning-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const audioPlayer = document.getElementById('audio-player');

    button.disabled = true;
    button.textContent = 'Synthesizing...';
    loadingSpinner.style.display = 'block';
    audioPlayerContainer.style.display = 'none';

    try {
        const response = await fetch('/synthesize', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
            audioPlayerContainer.style.display = 'block';
        } else {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
        }
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    } finally {
        button.disabled = false;
        button.textContent = 'Synthesize';
        loadingSpinner.style.display = 'none';
    }
});
