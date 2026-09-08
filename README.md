# Sage Guitar Trainer

A single-file, offline-first HTML5 guitar practice app. No install, no
build step, no server — open `riff_trainer.html` in a browser and play.
Everything runs client-side using the Web Audio API for pitch/chord
detection; nothing is ever sent anywhere.

## Files

| File | Purpose |
|---|---|
| `riff_trainer.html` | The app itself — UI, audio engine, game logic |
| `songs.js` | All song/exercise data (melodies, chords, lyrics). Must live in the same folder as the HTML file |
| `sage-songs-library.json` | Auto-created if you use folder linking (see **Portable Storage** below) — your custom imported songs, stored as a plain JSON file |

To run it: keep `riff_trainer.html` and `songs.js` in the same folder
and open the HTML file directly in a browser (Chrome, Edge, Brave, or
Firefox). No local server, no npm install, no dependencies.

## Features

### 🎯 Practice
- **Lead mode**: a 6-string tab highway (`e B G D A E` lanes, just like
  reading real tab) scrolls fret numbers toward a hit-line. Play the
  matching note on your guitar as it crosses the line.
- **Chords mode**: chord blocks scroll across all six string lanes at
  once, each showing the chord name and its fret positions. Strum the
  full chord and hold briefly through the hit-line to register a hit.
  Matching uses a chroma-based (frequency-spectrum) analysis since a
  single strum contains multiple simultaneous notes — this is
  approximate by nature, not frame-perfect like single-note detection.
- **5-speed Tempo control** (Very Slow → Very Fast), adjustable live
  even mid-song.
- **Repeat Forever** loop toggle — keeps looping and accumulating score
  across passes until you hit Reset.
- **Independent Lyrics ticker** — a continuously scrolling lyric line
  in Chords mode, with its own speed slider completely decoupled from
  the chord tempo (because it's easier to speed the lyrics up to catch
  a chord run than to slow them down after they've gotten ahead of
  you). Includes a 4-second head-start delay before scrolling begins.
- **Pause/Resume** — the Start button toggles to Pause mid-song and
  resumes exactly where it left off.
- **Works without a microphone** — if no mic is connected, the highway
  still plays through for previewing/reading, it just won't register
  scored hits (there's nothing to grade without audio input).

### 🎸 Tuner
A chromatic tuner with a needle dial, cents-off readout, and a live
input-level meter. Includes a **Reference A4 (Hz)** calibration field
(415–466 Hz) if you need to match another fixed-pitch instrument.

### 📥 Import Tab
Paste a chord/tab chart copied from any site (Ultimate Guitar, etc. —
chords positioned above the lyric line, exactly as shown on the page)
and the parser will:
- Detect chord lines vs. lyric lines automatically
- Preserve the exact column alignment so each chord is paired with the
  word it sits above (handles chords that split mid-word, instrumental
  bar notation like `|(G) D/F# Em D|`, `[Section]` headers, and PDF
  page-break artifacts)
- Save it as a playable custom song in Chords mode

Everything is parsed locally in your browser — nothing is uploaded.

### 📚 Library
Manage every song in the app, built-in or custom:
- **Rename** any song's display name
- **Edit Tab** — reopens a custom song's original pasted text for
  re-parsing/re-saving
- **Hide/Restore** built-in songs from the dropdown (doesn't touch
  `songs.js`, just filters your view)
- **Delete** custom imports permanently

## Chord Diagrams for Any Chord

`songs.js` only hand-defines the common open-position shapes (C, G, D,
Em, Am, F, A, E, Bm, F#m, and a few 7ths). Anything else you import —
B, Cm, F#, Bb7, whatever — gets a real fretting diagram automatically,
computed as a movable E-shape or A-shape barre chord (whichever lands
on the lower, more playable fret). This is genuinely how guitarists
play those chords, not a placeholder.

## Portable Storage

Custom imported songs are stored in your browser's `localStorage` by
default, which means they're tied to that specific browser/machine.
Two ways to make them portable, in the **Library** tab:

- **📁 Link Folder Next to This File** (Chrome/Edge, or Brave with the
  `file-system-access-api` flag enabled at `brave://flags/`) — writes
  a real `sage-songs-library.json` file next to `riff_trainer.html`
  automatically, on every change. Copy the whole folder anywhere and
  your library goes with it.
- **⬇ Export Backup / ⬆ Import Backup** — works in any browser, no
  flags needed. Manually export a JSON snapshot, or import one back in.

## A Note on Copyright

The built-in classical/traditional songs (Ode to Joy, Für Elise,
Minuet in G, Canon in D, Twinkle Twinkle, Greensleeves, Amazing Grace,
Scarborough Fair, Jingle Bells, Frère Jacques, Mary Had a Little Lamb,
Row Row Row Your Boat, Hot Cross Buns) are public domain or traditional
works, transcribed and verified against reliable sources.

The **Import Tab** feature lets you add contemporary songs for your
own private practice. Bare chord progressions are generally not
independently copyrightable, but exact melodies and lyrics are — this
tool is intended for personal use only and isn't meant to be
redistributed with copyrighted material baked in.

## Known Limitations

- **Web Audio latency** is higher than a native audio engine (roughly
  20–80ms depending on OS/browser vs. single-digit ms for something
  like JUCE or ASIO). Fine for note/chord matching timing windows used
  here, not suitable for real-time amp simulation or effects.
- **Chord detection is approximate.** Single-note (Lead mode) detection
  via autocorrelation is precise. Chord (polyphonic) detection via
  chroma analysis is inherently fuzzier — strum clearly and let the
  chord ring for the best results.
- **Folder linking (File System Access API)** only works in Chromium
  browsers, and is disabled by default in Brave for privacy reasons
  (enable via `brave://flags/#file-system-access-api`). Firefox and
  Safari don't support it at all — use Export/Import Backup instead.

## Adding Your Own Songs

Two ways:
1. **Import Tab** (recommended) — paste a tab/chord chart, preview,
   save. No editing files required.
2. **Edit `songs.js` directly** — add an entry to the `BASE` object
   following the existing pattern (`lead` = `[midi, durationBeats]`
   pairs, `chords` = `[chordName, durationBeats]` pairs or `null`,
   optional `lyrics` and `repeat`).
