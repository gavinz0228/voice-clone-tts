import torch
import argparse
from TTS.api import TTS

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Set up argument parser
parser = argparse.ArgumentParser(description='Clone a voice from an audio file and synthesize text.')
parser.add_argument('--speaker_wav', type=str, required=True, help='Path to the speaker audio file (WAV format).')
parser.add_argument('--text', type=str, required=True, help='Text to synthesize.')
parser.add_argument('--language', type=str, default='en', help='Language of the text.')
parser.add_argument('--output_path', type=str, default='cloned_voice_output.wav', help='Path to save the output audio file.')

args = parser.parse_args()

# Init TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

# Generate speech
tts.tts_to_file(
    text=args.text,
    speaker_wav=args.speaker_wav,
    language=args.language,
    file_path=args.output_path
)

print(f"Voice cloning complete. Check the {args.output_path} file.")
