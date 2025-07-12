document.getElementById('voice-cloning-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const audioPlayer = document.getElementById('audio-player');

    button.disabled = true;
    button.textContent = 'Synthesizing...';

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
    }
});
