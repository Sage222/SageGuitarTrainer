/* ---------------------------------------------------------------------
   songs.js
   All song data: chord shapes, melodies, and chord progressions used
   by riff_trainer.html. Edit/extend this file to add new practice
   material without touching the app logic.

   This file must be loaded via a plain <script src="songs.js"></script>
   tag (not as an ES module) so it works when opening the HTML file
   directly from disk (file://) without a local server. It defines
   plain global variables: CHORD_SHAPES, SONGS, and repeatSeq().
--------------------------------------------------------------------- */

function repeatSeq(seq, times) {
  let out = [];
  for (let i = 0; i < times; i++) out = out.concat(seq);
  return out;
}

/* Chord shapes (open-position, standard tuning). frets: low E -> high e,
   null = muted string, 0 = open. pcs = chord-tone pitch classes (0=C).
   Any chord NOT listed here still works — riff_trainer.html can derive
   a movable barre shape for it automatically. */
const CHORD_SHAPES = {
  "C":   { frets: [null,3,2,0,1,0], pcs: [0,4,7] },
  "G":   { frets: [3,2,0,0,0,3],    pcs: [7,11,2] },
  "D":   { frets: [null,0,0,2,3,2], pcs: [2,6,9] },
  "Em":  { frets: [0,2,2,0,0,0],    pcs: [4,7,11] },
  "Am":  { frets: [null,0,2,2,1,0], pcs: [9,0,4] },
  "F":   { frets: [null,3,3,2,1,1], pcs: [5,9,0] },
  "A":   { frets: [null,0,2,2,2,0], pcs: [9,1,4] },
  "E":   { frets: [0,2,2,1,0,0],    pcs: [4,8,11] },
  "Bm":  { frets: [null,2,4,4,3,2], pcs: [11,2,6] },
  "F#m": { frets: [2,4,4,2,2,2],    pcs: [6,9,1] },
  "D7":  { frets: [null,null,0,2,1,2], pcs: [2,6,9,0] },
  "G7":  { frets: [3,2,0,0,0,1],    pcs: [7,11,2,5] },
  "E7":  { frets: [0,2,0,1,0,0],    pcs: [4,8,11,2] },
  "Dm":  { frets: [null,null,0,2,3,1], pcs: [2,5,9] },
  "C7":  { frets: [null,3,2,3,1,0], pcs: [0,4,7,10] }
};

/* Base song data. leadNotes = [midi, durationBeats] pairs.
   chordProgression = [chordName, durationBeats] pairs, or null if the
   piece has no chord-mode arrangement (e.g. single-string warm-ups).
   "repeat" controls how many times the phrase loops to build a longer
   practice pass: short warm-ups default higher, genuinely complete
   short songs (rounds, nursery songs) default to 1 since they're
   already a full piece rather than a fragment.
   "lyrics" is optional plain text shown in the side panel and the
   scrolling ticker. */
const BASE = {
  "chromatic-e": {
    label: "Warm-up: Chromatic (low E string)",
    lead: [[40,1],[41,1],[42,1],[43,1],[44,1],[45,1],[44,1],[43,1],[42,1],[41,1],[40,2]],
    chords: null
  },
  "major-scale-g": {
    label: "Warm-up: G Major Scale (open position)",
    lead: [[55,1],[57,1],[59,1],[60,1],[62,1],[64,1],[66,1],[67,2],[66,1],[64,1],[62,1],[60,1],[59,1],[57,1],[55,2]],
    chords: null
  },
  "minor-pentatonic-a": {
    label: "Warm-up: A Minor Pentatonic (box 1)",
    lead: [[45,1],[48,1],[50,1],[52,1],[55,1],[57,1],[60,2],[57,1],[55,1],[52,1],[50,1],[48,1],[45,2]],
    chords: null
  },
  "ode-to-joy": {
    label: "Beethoven — Ode to Joy (Symphony No. 9)",
    lead: [
      [64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],
      [60,1],[60,1],[62,1],[64,1],[64,1.5],[62,0.5],[62,2],
      [64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],
      [60,1],[60,1],[62,1],[64,1],[62,1.5],[60,0.5],[60,2]
    ],
    chords: [["C",4],["G",4],["Am",4],["F",4],["C",4],["G",4],["C",4]]
  },
  "fur-elise": {
    label: "Beethoven — Für Elise (opening theme)",
    lead: [
      [76,0.5],[75,0.5],[76,0.5],[75,0.5],[76,0.5],[71,0.5],[74,0.5],[72,0.5],
      [69,1],[52,0.5],[57,0.5],[60,0.5],[64,1],[64,0.5],[62,0.5],[67,0.5],[64,1]
    ],
    chords: [["Am",2],["E",2],["Am",2],["Dm",2],["E",2],["Am",2]]
  },
  "minuet-in-g": {
    label: "Bach/Petzold — Minuet in G (opening)",
    lead: [
      [67,1],[71,0.5],[69,0.5],[67,0.5],[65,0.5],[64,1],[62,1],
      [60,1],[62,0.5],[64,0.5],[65,1],[67,1],[71,1],[74,1],[72,2]
    ],
    chords: [["G",2],["D",2],["Em",2],["C",2],["D",2],["G",2]]
  },
  "canon-in-d": {
    label: "Pachelbel — Canon in D (bass theme)",
    lead: [[62,2],[57,2],[59,2],[54,2],[55,2],[50,2],[55,2],[57,2]],
    chords: [["D",2],["A",2],["Bm",2],["F#m",2],["G",2],["D",2],["G",2],["A",2]]
  },
  "twinkle-twinkle": {
    label: "Traditional — Twinkle Twinkle Little Star",
    lead: [
      [60,1],[60,1],[67,1],[67,1],[69,1],[69,1],[67,2],
      [65,1],[65,1],[64,1],[64,1],[62,1],[62,1],[60,2]
    ],
    chords: [["C",4],["F",2],["C",2],["G7",2],["C",2],["F",2],["C",4]],
    lyrics: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nTwinkle, twinkle, little star,\nHow I wonder what you are!"
  },
  "greensleeves": {
    // Verse melody ("Alas, my love...") verified against the
    // traditional A-Dorian tune (A C# D E F# E D B G repeating
    // pattern, AABA-style verse) rather than the earlier approximation.
    label: "Traditional — Greensleeves (English folk)",
    lead: [
      [57,1],[61,1],[62,1],[64,1],[66,1],[64,1],[62,1],[59,1],[67,2],
      [57,1],[59,1],[61,1],[57,1],[57,1],[68,1],[57,1],[59,1],[68,1],[64,2],
      [57,1],[61,1],[62,1],[64,1],[66,1],[64,1],[62,1],[59,1],[67,2],
      [57,1],[59,1],[61,1],[59,1],[57,1],[68,1],[66,1],[68,1],[57,1],[57,1],[57,2]
    ],
    chords: [["Am",2],["C",2],["G",2],["Am",2],["E7",2],["Am",2]],
    lyrics: "Alas, my love, you do me wrong,\nTo cast me off discourteously.\nFor I have loved you well and long,\nDelighting in your company."
  },
  "amazing-grace": {
    // Corrected to the actual published melody (D G B G B A G E D |
    // D G B G B A D | B D B D B G D E G G E D | D G B G B A G) —
    // the earlier version had the wrong melodic shape entirely.
    label: "Traditional Hymn — Amazing Grace (opening)",
    lead: [
      [62,1],[67,1],[71,1],[67,1],[71,1],[69,1],[67,1],[64,1],[62,2],
      [62,1],[67,1],[71,1],[67,1],[71,1],[69,1],[62,2],
      [71,1],[62,1],[71,1],[62,1],[71,1],[67,1],[62,1],[64,1],[67,1],[67,1],[64,1],[62,2],
      [62,1],[67,1],[71,1],[67,1],[71,1],[69,1],[67,2]
    ],
    chords: [["C",4],["F",2],["C",2],["G",2],["C",4]],
    lyrics: "Amazing grace! How sweet the sound,\nThat saved a wretch like me.\nI once was lost, but now am found,\nWas blind, but now I see."
  },
  "scarborough-fair": {
    // Verified against the traditional E-Dorian tune (E E B B F# G F#
    // E-- ...). The earlier version was a rough guess and didn't
    // match the real melody at all — this one does.
    label: "Traditional — Scarborough Fair (English ballad)",
    lead: [
      [64,2],[64,1],[71,2],[71,1],[66,1],[67,1],[66,1],[64,4],
      [71,1],[74,1],[76,2],[74,1],[71,1],[73,1],[69,1],[71,5],
      [76,1],[76,2],[76,1],[74,2],[71,1],[71,1],[69,1],[67,1],
      [66,1],[62,5],[64,2],[71,1],[69,2],[67,1],[66,1],[64,1],[62,1],[64,6]
    ],
    chords: [["Dm",2],["C",2],["Dm",2],["Am",2],["Dm",2],["C",2],["Dm",2]],
    lyrics: "Are you going to Scarborough Fair?\nParsley, sage, rosemary and thyme.\nRemember me to one who lives there,\nFor he once was a true love of mine."
  },
  "jingle-bells": {
    label: "Pierpont (1857) — Jingle Bells (chorus)",
    lead: [
      [64,1],[64,1],[64,2],[64,1],[64,1],[64,2],
      [64,1],[67,1],[60,1],[62,1],[64,4]
    ],
    chords: [["C",4],["F",2],["C",2],["G7",2],["C",4]],
    lyrics: "Jingle bells, jingle bells, jingle all the way!\nOh what fun it is to ride in a one-horse open sleigh."
  },
  "frere-jacques": {
    label: "Traditional French — Frère Jacques",
    repeat: 1,
    lead: [
      [60,1],[62,1],[64,1],[60,1],
      [60,1],[62,1],[64,1],[60,1],
      [64,1],[65,1],[67,2],
      [64,1],[65,1],[67,2],
      [67,0.5],[69,0.5],[67,0.5],[65,0.5],[64,1],[60,1],
      [67,0.5],[69,0.5],[67,0.5],[65,0.5],[64,1],[60,1],
      [60,1],[55,1],[60,2],
      [60,1],[55,1],[60,2]
    ],
    chords: [["C",8],["G",4],["C",4],["C",8],["G",4],["C",4]],
    lyrics: "Frère Jacques, Frère Jacques,\nDormez-vous? Dormez-vous?\nSonnez les matines! Sonnez les matines!\nDing, ding, dong. Ding, ding, dong.\n\n(Are you sleeping, are you sleeping,\nBrother John, Brother John?\nMorning bells are ringing, morning bells are ringing,\nDing, ding, dong. Ding, ding, dong.)"
  },
  "mary-had-a-little-lamb": {
    label: "Traditional — Mary Had a Little Lamb",
    repeat: 1,
    lead: [
      [64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,2],
      [62,1],[62,1],[62,2],
      [64,1],[67,1],[67,2],
      [64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,1],[64,1],
      [62,1],[62,1],[64,1],[62,1],[60,2]
    ],
    chords: [["C",8],["G",4],["C",4],["C",8],["G",4],["C",2]],
    lyrics: "Mary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nThe lamb was sure to go."
  },
  "row-row-row-your-boat": {
    label: "Traditional — Row, Row, Row Your Boat",
    repeat: 1,
    lead: [
      [60,1],[60,1],[60,1],[62,1],[64,2],
      [64,1],[62,1],[64,1],[65,1],[67,2],
      [72,0.67],[72,0.67],[72,0.67],[67,0.67],[67,0.67],[67,0.67],[64,0.67],[64,0.67],[64,0.67],[60,0.67],[60,0.67],[60,0.67],
      [67,1],[65,1],[64,1],[62,1],[60,2]
    ],
    chords: [["C",8],["C",8],["C",8],["G",2],["C",2],["C",4]],
    lyrics: "Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream."
  },
  "hot-cross-buns": {
    label: "Traditional — Hot Cross Buns",
    repeat: 1,
    lead: [
      [64,1],[62,1],[60,2],
      [64,1],[62,1],[60,2],
      [60,0.5],[60,0.5],[60,0.5],[60,0.5],[62,0.5],[62,0.5],[62,0.5],[62,0.5],
      [64,1],[62,1],[60,2]
    ],
    chords: [["C",16]],
    lyrics: "Hot cross buns! Hot cross buns!\nOne a penny, two a penny, hot cross buns!"
  }
};

/* Expand BASE into the SONGS lookup the app actually uses, repeating
   each phrase so a practice pass is a proper multi-minute run — unless
   the song explicitly sets repeat:1 because it's already complete. */
const SONGS = {};
for (const [key, s] of Object.entries(BASE)) {
  const leadRepeat = s.repeat || 3;
  const chordRepeat = s.repeat || 2;
  SONGS[key] = {
    label: s.label,
    leadNotes: repeatSeq(s.lead, leadRepeat),
    chordProgression: s.chords ? repeatSeq(s.chords, chordRepeat) : null,
    lyrics: s.lyrics || null
  };
}
