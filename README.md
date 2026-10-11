# Sage Guitar Trainer

Sage Guitar Trainer is a portable, offline-first HTML5 guitar-practice app. It provides a six-string scrolling tab highway, lead and chord exercises, BPM timing, optional microphone scoring, a tuner, plucked reference playback, individual JSON song files, and local song management.

This README describes the latest folder-based version. The app runs by opening `riff_trainer.html` directly in a modern browser; no server, build process, Node installation, account, or internet connection is required.

## Quick start

Recommended layout:

```text
SageGuitarTrainer/
├── riff_trainer.html
├── README.md
└── songs/
    ├── warmup-chromatic-e.json
    ├── ode-to-joy-lead.json
    ├── ode-to-joy-chords.json
    └── my-song.json
```

1. Open `riff_trainer.html` in Brave, Chrome, or Edge.
2. Click **Load Songs Folder** and select `songs/`.
3. Pick an item from **Song / Exercise**.
4. Set the desired BPM.
5. Click the green **Start** button.
6. Optionally enable the microphone for scoring.

Copy the entire folder to move the trainer to another computer. Browser permissions and favourite status may need to be re-established, but the songs themselves remain in `songs/`.

## Main controls

| Control | Purpose |
|---|---|
| Song / Exercise | Selects a local song JSON file |
| Lead / Chords badge | Shows the song type declared by its JSON file |
| ★ Favourite | Moves the selected song to the top of the list; this is a browser UI preference only |
| BPM | True beats-per-minute timing; editable while playing |
| Start / Pause | Green while stopped, red while playing; pauses/resumes the current queue |
| Reset | Clears score, queue, lyric position, and playback state |
| Repeat Forever | Repeats the song until Reset |
| Note Sound | Plays a plucked synthetic reference note/chord at the hit line |
| Note volume | Adjusts reference playback without affecting mic input |
| Lyrics | Opens the full lyric panel when a chord JSON contains lyrics |

Changing song while it is playing immediately resets the run and starts the selected replacement song. If no microphone is enabled, the highway still works as a visual/audio preview but cannot score hits.

## Song files

Each song is one JSON file. The `type` property decides the practice mode; there is no separate Lead/Chord mode button.

### Lead song

```json
{
  "label": "My Easy Lead Exercise",
  "type": "lead",
  "bpm": 80,
  "repeat": 1,
  "leadNotes": [[55, 1], [57, 0.5], [59, 0.5], [62, 2]]
}
```

`leadNotes` contains `[MIDI pitch, durationInBeats]` pairs. The app selects a playable standard-tuning string/fret position for each pitch. It does not currently preserve an original tab's exact string/fret choice.

### Chord song

```json
{
  "label": "My Chord Exercise",
  "type": "chords",
  "bpm": 90,
  "repeat": 1,
  "chordProgression": [["G", 4], ["D", 4], ["Em", 4], ["C", 4]],
  "lyrics": "Optional text for the lyrics panel and ticker."
}
```

`chordProgression` contains `[chordName, durationInBeats]` pairs. Use `repeat: 1` if the JSON already contains the full sequence. Lead songs default to three repeats when `repeat` is omitted; chord songs default to two.

## BPM

The timing model is musical:

```text
seconds per beat = 60 / BPM
```

All note and chord durations are expressed in beats. BPM changes update scrolling, note duration, chord duration, and reference playback together.

Add an optional `"bpm"` field to load a default tempo automatically. After changing it in the app, commit the field with Enter, the spinner arrows, or focus change to save it back to JSON when writable folder access is available.

## Loading and saving the songs folder

**Load Songs Folder** is the source-of-truth workflow. It reads every `.json` file in the selected folder and its subfolders. Reload after adding or editing files.

For direct BPM saves and song deletion, Brave/Chromium must grant write permission to that folder. Brave may require enabling:

```text
brave://flags/#file-system-access-api
```

If the browser cannot write, use the app's JSON download fallback and replace the file manually.

Avoid duplicate JSON basenames in subfolders because filenames without `.json` are used as song keys.

## Playback and scoring

### Note Sound

Reference playback uses a lightweight plucked-string synth, not recorded guitar samples. Lead mode plays the requested pitch. Chord mode plays the diagrammed voicing with a short staggered strum. The feature starts off by default.

Use headphones during microphone scoring so reference playback is not captured and mistaken for your own playing.

### Microphone scoring

- Lead mode uses monophonic pitch detection and works best with clean single notes.
- Chord mode uses frequency-spectrum/chroma matching, so it is naturally less exact. Strum cleanly and let chords ring briefly.
- The app can be used with no mic connected for visual practice and reference playback.

## Tuner

The Tuner supports standard tuning `E A D G B e`, auto/manual string selection, frequency display, cents offset, an input-level meter, and adjustable A4 calibration (default 440 Hz).

Use a clean isolated string in a quiet environment. Heavy distortion, speaker bleed, chords, and noise make pitch detection less reliable.

## Import Tab

Import Tab accepts copied **chord-and-lyric** text. It detects common chord lines, section headings, slash chords, and some bar notation. It downloads an individual `*-chords.json` file; move that file into `songs/`, then reload the folder.

Import Tab does not create lead songs. For lead material, create a `type: "lead"` JSON manually or convert structured MIDI, MusicXML, Guitar Pro, or carefully reviewed ASCII tab. PDF/image tabs are not directly supported because they often lack unambiguous note duration, BPM, and track information.

## Library, favourites, deletion, and restore

The Library lists loaded local JSON files and their Lead/Chords type.

- **Favourite:** browser-only display preference; favourites sort first.
- **Delete:** with writable folder permission, moves a backup to `songs/_deleted/` as a `.json.bak` file before deleting the source JSON.
- **Restore:** move a backup out of `songs/_deleted/`, remove `.bak` so it ends in `.json`, then reload the folder.

For safe external backups, copy the whole `songs/` directory.

## Portable storage and legacy files

Current song content belongs in `songs/*.json`. The previous `songs.js` and `sage-songs-library.json` formats are legacy data sources. Keep them as backups until all desired material has been migrated to individual JSON files.

The Library's export/import controls, if present, are for legacy browser-backed custom-song data only. They are not the preferred library mechanism.

## Troubleshooting

### No songs appear

- Select the actual `songs/` directory.
- Confirm files end in `.json`, not `.json.txt`.
- Check `"type"` is exactly `"lead"` or `"chords"`.
- Lead files need `leadNotes`; chord files need `chordProgression`.
- Press `F12` and inspect Console for JSON parse errors.

### No highway or no sound

- Select a valid song after loading the folder.
- Click Reset, then Start.
- Enable Note Sound and raise its volume.
- Browser audio requires a user click; Start provides that gesture.

### BPM will not save

- Reload the songs folder and grant write access.
- In Brave, enable the File System Access API flag if necessary.
- Ensure the loaded folder and linked write folder are the same.
- Use Download Updated JSON if direct writing is unavailable.

## Limitations

- This is a browser practice trainer, not a native ASIO/JUCE amp simulator.
- The plucked sound is synthetic, not a sampled guitar.
- Lead events are pitch-based rather than string/fret-aware.
- Alternate tunings, capo-aware mapping, explicit rests, bends, slides, ties, and multi-track notation are not fully represented.
- BPM cannot correct a guessed or inaccurate transcription.
- Lyrics ticker timing is a reading aid, not word-perfect karaoke synchronization.

## Copyright and personal use

Keep modern-song content for private practice unless you have permission to distribute it. Chord charts, tabs, melody transcriptions, arrangements, and lyrics may be protected even when fan-created or widely posted. Do not redistribute a `songs/` folder containing material you do not have rights to share.

## Recommended backup

Back up this complete folder:

```text
riff_trainer.html
songs/
songs/_deleted/
README.md
```
