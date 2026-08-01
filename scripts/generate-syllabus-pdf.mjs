import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../public/beginner-guitar-syllabus.pdf");

const classes = [
  {
    title: "Class 1 - Guitar Fundamentals",
    body: "Introduction to the guitar; Parts of the guitar; String names (E A D G B E); Finger numbering; Proper posture and guitar holding; Hold a pick; Tuning; Chromatic exercise; Basic picking. Practice: Finger exercises and alternate picking.",
  },
  {
    title: "Class 2 - Reading Guitar Tabs",
    body: "Frets and strings; Read TABs; Coordination exercises; Alternate picking; First melody; Song: Happy Birthday (Tabs). Practice: TAB reading and melody.",
  },
  {
    title: "Class 3 - Introduction to Chords",
    body: "Notes vs Chords; Major and Minor; Chord diagrams; Finger placement; Open chords: Em, Am, C, G, D. Practice: Chord formation.",
  },
  {
    title: "Class 4 - Strumming and Rhythm",
    body: "Rhythm, 4/4 time, Tempo and BPM, Metronome, Strumming patterns, Chord transitions. Practice: First chord song.",
  },
  {
    title: "Class 5 - Lead Guitar Basics",
    body: "Fretboard notes; Finger independence; Hammer-ons, Pull-offs, Slides, Vibrato; Beginner melody tabs. Practice: Song intros.",
  },
  {
    title: "Class 6 - More Chords and Song Playing",
    body: "New chords: A, E, Dm, Easy F. Progressions, transitions, strumming, play along. Practice: Full songs.",
  },
  {
    title: "Class 7 - Guitar Techniques",
    body: "Capo, Palm muting, Dynamics, Rhythm accuracy, Faster transitions, Complete songs.",
  },
  {
    title: "Class 8 - Becoming an Independent Guitarist",
    body: "Learn songs independently, Find tabs/chords, Song structure, Practice routine, Performance, Feedback.",
  },
];

const outcomes = [
  "Proper technique",
  "Tune guitar",
  "Read tabs and chord diagrams",
  "Play 9+ chords",
  "Smooth transitions",
  "Strumming patterns",
  "Happy Birthday and full songs",
  "Lead techniques",
  "Use capo",
  "Learn songs independently",
];

const doc = new PDFDocument({
  margin: 54,
  size: "A4",
  info: {
    Title: "Beginner Guitar Course Syllabus - harishh.music",
    Author: "harishh.music",
  },
});

doc.pipe(fs.createWriteStream(outPath));

doc
  .fillColor("#0b121a")
  .fontSize(20)
  .font("Helvetica-Bold")
  .text("Beginner Guitar Course Syllabus", { align: "left" });

doc.moveDown(0.35);
doc
  .fillColor("#3da9ff")
  .fontSize(11)
  .font("Helvetica")
  .text("harishh.music");

doc.moveDown(0.8);
doc.fillColor("#1d1d1f").fontSize(10).font("Helvetica");
doc.text("Duration: 4 Weeks");
doc.text("Classes: 8 (2 classes per week / weekends)");
doc.text("Mode: One-on-One Personal Training");
doc.text("Level: Absolute Beginner");

doc.moveDown(0.9);
doc
  .strokeColor("#d2d2d7")
  .lineWidth(1)
  .moveTo(54, doc.y)
  .lineTo(541, doc.y)
  .stroke();
doc.moveDown(0.9);

for (const item of classes) {
  if (doc.y > 720) doc.addPage();
  doc
    .fillColor("#0b121a")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(item.title);
  doc.moveDown(0.25);
  doc
    .fillColor("#3d5249")
    .fontSize(10)
    .font("Helvetica")
    .text(item.body, { lineGap: 2 });
  doc.moveDown(0.7);
}

if (doc.y > 640) doc.addPage();

doc
  .fillColor("#0b121a")
  .fontSize(12)
  .font("Helvetica-Bold")
  .text("By the End");
doc.moveDown(0.35);
doc.fillColor("#3d5249").fontSize(10).font("Helvetica");
for (const item of outcomes) {
  doc.text(`•  ${item}`);
}

doc.moveDown(0.9);
doc
  .fillColor("#0b121a")
  .fontSize(12)
  .font("Helvetica-Bold")
  .text("Daily Practice (15-20 min)");
doc.moveDown(0.25);
doc
  .fillColor("#3d5249")
  .fontSize(10)
  .font("Helvetica")
  .text(
    "Finger exercises, Chords, Strumming, Songs, Metronome. Consistency is the key to becoming a great guitarist."
  );

doc.moveDown(1.2);
doc
  .fillColor("#86868b")
  .fontSize(9)
  .text("Contact: harishh.music@gmail.com  |  Instagram: @harishh.music");

doc.end();

console.log(`Wrote ${outPath}`);
