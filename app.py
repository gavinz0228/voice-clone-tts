from flask import Flask, render_template, request, send_file
import torch
from TTS.api import TTS
import os

os.environ["COQUI_TOS_AGREED"] = "1"
app = Flask(__name__)

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Init TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

# Ensure the uploads directory exists
if not os.path.exists("uploads"):
    os.makedirs("uploads")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/synthesize", methods=["POST"])
def synthesize():
    if 'speaker_wav' not in request.files:
        return "No speaker audio file provided.", 400

    speaker_wav_file = request.files['speaker_wav']
    text = request.form.get('text')
    language = request.form.get('language')

    if not all([speaker_wav_file, text, language]):
        return "Missing required fields.", 400

    # Save the uploaded file
    speaker_wav_path = os.path.join("uploads", speaker_wav_file.filename)
    speaker_wav_file.save(speaker_wav_path)

    # Generate speech
    output_path = "output.wav"
    tts.tts_to_file(
        text=text,
        speaker_wav=speaker_wav_path,
        language=language,
        file_path=output_path
    )

    return send_file(output_path, mimetype="audio/wav")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8001, debug=True)