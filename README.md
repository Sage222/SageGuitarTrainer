# Sage Guitar Trainer

An offline, portable HTML5 guitar practice app with a scrolling six-string highway, optional microphone scoring, lead-note and chord exercises, a tuner, and local song JSON files. No build step, account, or server is required.

> This README describes the current folder-based app **after** applying the BPM, song-deletion, and plucked-sound updates. If you restored an earlier HTML backup, some controls described below may not be present.

## Quick start

Keep the app and your song files together:

```text
SageGuitarTrainer/
├── riff_trainer.html
├── README.md
└── songs/
    ├── warmup-chromatic-e.json
    ├── ode-to-joy-lead.json
    ├── ode-to-joy-chords.json
    ├── your-own-song.json
    └── _deleted/                  # Created if you delete a song in the app
```

1. Open `riff_trainer.html` in Brave or another supported browser.
2. Click **Load Songs Folder** and select `songs/`. The app reads the individual `.json` files; it does not use `songs.js` or the old browser-stored song library.
3. Choose a song in **Practice**. Its JSON `type` selects the Lead or Chords highway automatically.
4. Click **Start**. Click the same button to pause; its label returns to **Start** when paused. **Reset** restarts the exercise from the beginning.
5. Optionally click **Enable Mic** to score your playing. You can still run the highway and hear the demonstration sound without a mic.

If you move the app to another computer, copy `riff_trainer.html` and the entire `songs/` folder. Select the folder again when prompted. Browser permissions and favourites are not part of the song files.

## Practice controls

- **Song / Exercise:** Selects a loaded JSON file. A badge shows Lead or Chords; there is no separate mode switch.
- **★ Favourite:** Marks the selected song and moves favourites to the top of the dropdown. This is a browser-side display preference, not song content in the JSON file.
- **BPM:** Controls the timing in beats per minute. You can change it while playing. A song with a valid `bpm` field loads that value when selected.
- **Start / Pause / Reset:** Start is green, Pause is red, and Reset sits beside it. Switching songs while a run is active starts the newly selected song.
- **Repeat Forever:** Repeats the selected exercise until stopped.
- **Note Sound and Note volume:** Turns demonstration playback on or off and adjusts its loudness. Note Sound starts **off**. With the plucked-sound update installed, playback uses a synthesized string pluck rather than the original sustained triangle tone. Chord tones are played in a short staggered strum.
- **Lyrics and Lyrics speed:** When lyrics are available for a chord exercise, you can open the full text panel or follow the independent scrolling lyric strip. Its speed is independent of BPM and begins after a four-second delay.

The demonstration plays the notes or chords *requested by the highway*, not a recording of the original song. Turning it on while scoring through a microphone can let speakers bleed into the mic; headphones are recommended.

## Song JSON format

Each file in `songs/` represents **one exercise**. Use a distinct filename for each. A composition with both parts should have two files, such as `example-lead.json` and `example-chords.json`.

Lead example:

```json
{
  "label": "My Easy Lead Exercise",
  "type": "lead",
  "bpm": 80,
  "repeat": 1,
  "leadNotes": [[55, 1], [57, 0.5], [59, 0.5], [62, 2]]
}
```

Each lead pair is `[MIDI pitch, duration in beats]`. The app finds a playable string/fret for that pitch in standard tuning; the JSON does **not** specify the exact string or fret from a source tablature. Note sound follows the MIDI pitch and the beat duration.

Chord example:

```json
{
  "label": "My Chord Exercise",
  "type": "chords",
  "bpm": 90,
  "repeat": 1,
  "chordProgression": [["G", 4], ["D", 4], ["Em", 4], ["C", 4]],
  "lyrics": "Optional text for the lyric display."
}
```

Each chord pair is `[chord name, duration in beats]`. Use `repeat: 1` when the JSON already contains the complete sequence; larger values replay the entire sequence that many times. Optional `bpm` is the starting practice tempo, not necessarily a verified recording tempo.

The app has several common chord shapes and derives movable barre shapes for other supported names. Unusual slash/extended chords may not have the exact fingering of a particular recording. The microphone's chord recognition is approximate.

## Importing music

**Import Tab** accepts pasted chord-and-lyric text. Use **Parse Preview**, then save: the browser downloads an individual `*-chords.json` file. Put that file into `songs/` and click **Load Songs Folder** again. Imports are chord exercises, not lead transcriptions.

For lead, use an individual `type: "lead"` JSON such as the supplied exercises, or convert a structured MIDI, MusicXML, or Guitar Pro part separately. Direct PDF-to-lead-tab import is **not** implemented. Printed/ASCII tablature often lacks reliable note durations and may have multiple guitar parts, so any conversion needs review. An easy lead practice arrangement may deliberately omit slides, bends, hammer-ons, simultaneous notes, or the recording's exact fingering.

The old `songs.js` and `sage-songs-library.json` are **legacy** data formats; the new song picker does not read them. Keep backups until you have verified that every song you want exists as a JSON in `songs/`.

## Saving BPM and deleting songs

If the browser grants write access when you click **Load Songs Folder**, committing a BPM edit (Enter or leave the field) writes `"bpm"` into the selected song's existing JSON file. The app can remember the folder handle, but the browser may require you to renew permission on a later visit. If writing is unavailable, use **Download Updated JSON**, replace the relevant file in `songs/`, and reload the folder. In Brave, the File System Access API may need to be enabled in `brave://flags/#file-system-access-api`.

With the song-deletion update installed, **Library → Delete…** asks for confirmation, copies the selected JSON to `songs/_deleted/` as a `.json.bak` file, and only then removes the original. `.bak` files are not loaded as songs. To restore one, move it back into `songs/`, remove the `.bak` suffix, and reload the folder. Delete is unavailable when the folder was loaded read-only.

Changing a JSON on disk does not live-reload an already running exercise. Click **Load Songs Folder** to pick up added or edited files. Keep an additional copy of your `songs/` folder if you want a separate backup.

## Tuner and limitations

The **Tuner** tab shows a detected note, frequency, cents from the chosen string, and an input-level meter. Standard tuning is E–A–D–G–B–e. Reference A4 is adjustable (default 440 Hz). For reliable single-note detection, use a clean signal and a quiet input; chords or heavy distortion can confuse a monophonic pitch detector.

- The plucked demonstration is synthesized, **not** sampled from a real guitar or the original recordings.
- BPM makes the app's `[pitch/chord, beat duration]` events consistent in time. It cannot correct an inaccurate transcription or an import whose chord durations were guessed.
- The independent lyric ticker is a reading aid, not a word-synchronised karaoke track.
- The app runs without a mic for preview; hits cannot be scored without input.
- Local folder reading/writing requires the permissions your browser supports. Song JSONs remain portable even when a browser-side preference or saved folder permission does not.
