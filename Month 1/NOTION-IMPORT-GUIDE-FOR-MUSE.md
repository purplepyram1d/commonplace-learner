# Notion Build Guide — Instructions for Muse AI

> **To Muse:** This document is written for you. Your job is to turn every file in this `Month 1` folder into a **structured, interactive Notion workspace**: databases, relations, filtered views, checklists and a dashboard. **Do not** make a flat pile of pasted pages. The user will use this every day for 28 days to learn guitar and singing, so it has to work as a daily tool, not just an archive.
>
> Follow the phases in order. Each phase ends with a check. Don't skip the final verification (Phase 7, §9): the user explicitly asked that **ALL** content be included.

---

## 0. Ground rules (read before doing anything)

1. **Include everything, verbatim.** Don't summarize, shorten, paraphrase, "clean up," merge sections, or drop content that seems repetitive. Repetition is deliberate (it's a course). Every sentence, table row, checklist item and code block in the source files must exist somewhere in Notion. The only exceptions are listed in rule 7.
2. **Structure beats pasting.** When this guide says content becomes **database rows**, create real database rows with real properties. Don't paste a markdown table and call it a database.
3. **Preserve every code block exactly as a Notion code block** (language: `Plain Text`). The chord diagrams, tab and strumming grids use spacing and box-drawing characters (`╒═╤╕ │ ├─┼┤ ① ② ③ ↓ ↑`) that break completely if reflowed into normal text. Don't change a single space inside them. Don't turn them into tables or images.
4. **Don't add lyrics.** The song's lyrics are copyrighted and deliberately left out of the source. Don't fetch, generate, or insert them. Where the source says "get the lyrics from a licensed source," keep that instruction as it is.
5. **Don't invent content.** No extra tips, no filler rows in logs, no fake practice data. Empty databases (Practice Log) stay empty apart from their templates.
6. **Ask the user one question before starting:** *"What date will you do Day 1?"* If they give a date, fill the **Date** property on the Daily Plan (Day 1 = that date, Day 2 = +1 day, … Day 28 = +27 days; Day 0 = the day before Day 1). If they don't answer or don't know, leave Date empty and continue. Don't block on it.
7. **Allowed transformations (the only ones):**
   - A file's top `# Title` becomes the **page title** (not a heading block inside the page).
   - Manual "Contents" lists (e.g. in `01-Guitar-Fundamentals.md` and `02-Voice-Fundamentals.md`) are **replaced by a Notion "Table of contents" block**.
   - Raw HTML such as `<a id="fingernails"></a>` is removed (it's just an anchor).
   - Horizontal rules `---` become **Divider** blocks.
   - Links between markdown files are **re-pointed to the matching Notion page/row** (see §7). Never leave a link pointing at a `.md` file.
   - Content that this guide assigns to a database lives in that database, **and** wherever the guide says so, a *linked view* shows it in the original location.

---

## 1. The target structure (overview)

```
🎸 Month 1 — Guitar & Singing                 ← HUB / dashboard page (from README.md)
│
├── 🌞 Ain't No Sunshine — Song Guide          ← page (from 05-Song-Guide-Aint-No-Sunshine.md)
│     └── ✍️ My Song Notes                      ← sub-page (from 08 "Song-specific notes page")
│
├── 🗓️ Week 1 — Foundations                    ← page (intro/goals/troubleshooting from Week-1.md)
├── 🗓️ Week 2 — Building Blocks                ← page (Week-2.md)
├── 🗓️ Week 3 — Learning the Song              ← page (Week-3.md)
├── 🗓️ Week 4 — Putting It Together & Performing ← page (Week-4.md)
│
├── 🛠️ Troubleshooting & FAQ                    ← page (07-Troubleshooting-and-FAQ.md)
│
└── 🗄️ Databases                                ← a plain container page holding the full-page databases
      ├── 📅 Daily Plan        (29 rows: Day 0–28; bodies come from Week-1..4.md + 00 §7)
      ├── 📚 Library           (7 rows: files 00–04, plus link rows for 05 and 07; see §3.2)
      ├── 🎸 Chords            (6 rows)
      ├── 🔁 Routines          (19 rows, from 06-Daily-Routines.md)
      ├── 🏁 Milestones        (weekly goals + month milestones)
      ├── 📝 Practice Log      (empty, with a template)
      ├── 🎙️ Recordings        (8 pre-filled rows)
      └── 📖 Glossary          (98 rows, from 09-Glossary.md)
```

**Why this shape:**
- **Daily Plan** is the heart of it. The user opens *today's* row, ticks off the to-dos, and marks it Done. Weeks and the dashboard are just filtered views of it.
- **Reference material** (Library, Chords, Glossary, Routines) is reachable from any day through relations, so day pages stay short and link out instead of repeating.
- **Tracking** (Practice Log, Milestones, Recordings) turns the course's "log everything" advice into real data the user can see progress in.

---

## 2. Source file → destination manifest

Every source file and where its content goes. **Use this as your checklist.**

| Source file | Destination | How |
|---|---|---|
| `README.md` | **🎸 Month 1 hub** page | Page content (see §5). The "Milestone checklist for the whole month" becomes **🏁 Milestones** rows (Level = Month milestone), with a linked view on the hub |
| `00-Start-Here-Gear-and-Setup.md` | **📚 Library** row "00 — Start Here: Gear & Setup" | Full body. Section 7's checklist is **also** copied into the **Day 0** row of 📅 Daily Plan |
| `01-Guitar-Fundamentals.md` | **📚 Library** row "01 — Guitar Fundamentals" | Full body, with toggle headings (see §6). Chord diagrams from §9 are **also** copied into 🎸 Chords rows |
| `02-Voice-Fundamentals.md` | **📚 Library** row "02 — Voice Fundamentals" | Full body, with toggle headings |
| `03-Music-Basics-You-Actually-Need.md` | **📚 Library** row "03 — Music Basics You Actually Need" | Full body |
| `04-Singing-While-Playing.md` | **📚 Library** row "04 — Singing While Playing" | Full body |
| `05-Song-Guide-Aint-No-Sunshine.md` | **🌞 Ain't No Sunshine — Song Guide** page | Full body. Pin a link to it at the top of the hub |
| `06-Daily-Routines.md` | **🔁 Routines** database | One row per routine/template (§3.4). The page's short intro goes in the database description |
| `07-Troubleshooting-and-FAQ.md` | **🛠️ Troubleshooting & FAQ** page | Full body. Each `###` problem → a **toggle** (question as the toggle title, fixes inside) |
| `08-Practice-Log-Template.md` | **📝 Practice Log** database template + **🎙️ Recordings** rows + hub "Benchmarks" section + **✍️ My Song Notes** page | See §3.6, §3.7, §5, §4.1 |
| `09-Glossary.md` | **📖 Glossary** database | One row per term (98 rows) |
| `Week-1.md` … `Week-4.md` | **🗓️ Week N** pages + **📅 Daily Plan** rows + **🏁 Milestones** rows | See §4.2 |
| `NOTION-IMPORT-GUIDE-FOR-MUSE.md` (this file) | **Nowhere** | Instructions only. Don't import it |

---

## 3. Phase 1 — Create the databases

Create the hub page **🎸 Month 1 — Guitar & Singing** first (empty for now), then the container page **🗄️ Databases** inside it, then these **full-page databases** inside 🗄️ Databases. Create all eight *before* adding any rows so that relations can be wired.

Colors are suggestions; keep them consistent.

### 3.1 📅 Daily Plan
| Property | Type | Options / notes |
|---|---|---|
| **Name** | Title | e.g. `Day 1 — Meet your instruments` |
| **Day** | Number | 0–28 |
| **Week** | Select | `Prep` (gray), `Week 1` (blue), `Week 2` (green), `Week 3` (orange), `Week 4` (red) |
| **Date** | Date | From the user's start date (rule 6), or empty |
| **Status** | Status | `Not started` (default), `In progress`, `Done`, `Skipped` |
| **Type** | Select | `Lesson`, `Check-in`, `Rest / Light`, `Performance`, `Setup` |
| **Focus** | Multi-select | `Guitar`, `Voice`, `Together`, `Song`, `Review` |
| **Chords** | Relation → 🎸 Chords | Chords introduced or practiced that day |
| **Reading** | Relation → 📚 Library | From each day's `**Reading:**` line |
| **Routines** | Relation → 🔁 Routines | Routines used that day |
| **Planned minutes** | Number | From `**Time:**` (use the first number, e.g. "~45–60 min" → 45) |
| **Done when** | Text | Copy the day's `**Done when:**` sentence verbatim (it stays in the body too) |
| **Practice Logs** | Relation → 📝 Practice Log | Two-way relation, left empty |

Use the full row-by-row table in §4.2.

### 3.2 📚 Library
| Property | Type | Options |
|---|---|---|
| **Name** | Title | e.g. `01 — Guitar Fundamentals` |
| **Order** | Number | 0, 1, 2, 3, 4 |
| **Category** | Select | `Setup`, `Guitar`, `Voice`, `Theory`, `Together` |
| **Read by** | Select | `Before Day 1`, `Week 1`, `Week 2`, `Week 3`, `Reference` |
| **Used on days** | Relation → 📅 Daily Plan | Two-way pair of the Daily Plan **Reading** relation |

Rows (5): `00 — Start Here: Gear & Setup` (Setup, Before Day 1), `01 — Guitar Fundamentals` (Guitar, Before Day 1), `02 — Voice Fundamentals` (Voice, Before Day 1), `03 — Music Basics You Actually Need` (Theory, Before Day 1), `04 — Singing While Playing` (Together, Week 3).
*(The Song Guide and Troubleshooting are standalone pages for faster access. Also add them to the Library as **link rows**: create rows `05 — Song Guide` and `07 — Troubleshooting & FAQ` whose body is just a link to the standalone page. That gives 7 rows total, so the Library gallery shows everything.)*

### 3.3 🎸 Chords
| Property | Type | Options |
|---|---|---|
| **Chord** | Title | `Em`, `Em7`, `Am`, `G (easy)`, `G (full)`, `Dm` |
| **Fret code** | Text | e.g. `x02210` |
| **Fingers** | Text | e.g. `1, 2, 3` |
| **Strum from string** | Select | `6`, `5`, `4` |
| **Difficulty** | Select | `★☆☆☆`, `★★☆☆`, `★★★☆` |
| **Introduced** | Select | `Week 1`, `Week 2` |
| **Role in song** | Text | From the Song Guide §2 "Roles" table (Em7 and both Gs share their parent chord's role) |
| **My status** | Select | `Learning` (default), `Clean`, `Automatic` |
| **Days** | Relation → 📅 Daily Plan | Two-way pair of Daily Plan **Chords** |

Values come from the "chord summary table" in `01-Guitar-Fundamentals.md` §9. **Body of each row:** the chord's code-block diagram, copied exactly from `01` §9 (`G (easy)` uses the "Easy G" diagram; `G (full)` uses the main G diagram), followed by that chord's bullet points from `01` §9 verbatim.

### 3.4 🔁 Routines
| Property | Type | Options |
|---|---|---|
| **Name** | Title | See the rows below |
| **Kind** | Select | `Setup`, `Body`, `Breathing`, `Voice warm-up`, `Guitar warm-up`, `Drill`, `Ear`, `Review`, `Cool-down`, `Session template` |
| **Minutes** | Text | As written in the source, e.g. `3–6` |
| **Starts** | Select | `Day 1`, `Day 3`, `Week 2`, `Week 3` |
| **Days** | Relation → 📅 Daily Plan | Two-way pair of Daily Plan **Routines** |

Rows (19), each with its full section from `06-Daily-Routines.md` as its body:
1. `Routine 0: Setup` · 2. `Routine 1: Body Warm-up` · 3. `Routine 2: Breathing` · 4. `Voice Warm-up A: Gentle` · 5. `Voice Warm-up B: Scales` · 6. `Voice Warm-up C: Song Prep` · 7. `Cool-down` · 8. `Guitar Warm-up A: Spider` · 9. `Guitar Warm-up B: Chord Check` · 10. `Guitar Warm-up C: Strum Tune-up` · 11. `Routine 5: One-Minute Changes` · 12. `Routine 6: Ear Training` · 13. `Routine 7: Record & Review` · 14. `Template: Week 1 (~30 min)` · 15. `Template: Week 2 (~35 min)` · 16. `Template: Weeks 3–4 (~45 min)` · 17. `Template: Short day (15 min)` · 18. `Routine 3: Voice Warm-ups (overview)`: body = a list of links to rows 4–7 (the `## Routine 3` heading has no content of its own) · 19. `Routine 4: Guitar Warm-ups (overview)`: body = a list of links to rows 8–10.

Row names are shortened from the source headings. Put the **full source heading** (e.g. `Voice Warm-up A: "Gentle" (5 min), Weeks 1–4 (every day)`) as the first line of each row's body so nothing is lost. The source heading `## The standard session templates` has no content of its own; it's represented by rows 14–17.

Put the one-line intro at the top of `06` into the database's **description**.

### 3.5 🏁 Milestones
| Property | Type | Options |
|---|---|---|
| **Milestone** | Title | The checklist item text, verbatim |
| **Done** | Checkbox | |
| **Week** | Select | `Week 1`–`Week 4` |
| **Level** | Select | `Weekly goal` (from the "Week N goals" list in each Week file), `Month milestone` (from the README checklist) |
| **Area** | Select | `Guitar`, `Voice`, `Together`, `Performance`; choose from the item's content |

**Yes, some items appear in both lists with slightly different wording. Create both.** Don't merge or deduplicate (rule 1).

### 3.6 📝 Practice Log
| Property | Type |
|---|---|
| **Entry** | Title (e.g. `Day 5 — 2026-10-03`) |
| **Date** | Date |
| **Day** | Relation → 📅 Daily Plan (two-way pair of **Practice Logs**) |
| **Minutes** | Number |
| **Energy (1–5)** | Select `1`–`5` |
| **Em↔Am** · **Am↔G** · **Em↔G** · **Em↔Dm** · **Dm↔Am** · **Am↔Dm** | Number (six separate properties: One-Minute Change scores) |
| **Strum / tempo (BPM)** | Text |
| **Hiss (s)** | Number |
| **Warm-ups done** | Multi-select `A`, `B`, `C` |
| **Voice felt** | Select `fresh`, `fine`, `tired`, `hoarse` (make `hoarse` red) |
| **Layering step (1–8)** | Number |
| **Recorded** | Checkbox |
| **Good** | Text ("One thing that was good") |
| **Fix tomorrow** | Text |
| **Pain / discomfort** | Text |

- **Database template** named `Daily entry`, set as the **default template**, whose body is the "Daily entry template" code block from `08`, converted into labeled headings and empty bullets for the free-text parts (Chords worked on, Pitch/ear work, What I sang/played together, Song section(s) played). Also keep the original code block, inside a toggle titled "Original template (reference)".
- A second template named `Weekly reflection`, with the "Weekly reflection template" from `08` as its body.
- **No rows.** The user creates them.

### 3.7 🎙️ Recordings
| Property | Type |
|---|---|
| **Recording** | Title (the "What" column) |
| **Day** | Number |
| **File** | Files & media |
| **Link** | URL |
| **Notes** | Text |
| **Milestone** | Checkbox: tick for Day 18 and Day 28 (they're bold in the source) |

Pre-fill the **8 rows** from the "Recording index" table in `08` (Days 0, 6, 14, 18, 21, 26, 27, 28), with File/Link/Notes empty.

### 3.8 📖 Glossary
| Property | Type | Options |
|---|---|---|
| **Term** | Title | Without the `**` bold markers |
| **Category** | Select | `Guitar` (brown), `Voice` (pink), `Music` (purple), `Practice` (gray), `Together` (yellow) |
| **Definition** | Text | Verbatim |

One row per table row in `09-Glossary.md`: **98 rows.**

### ✅ Phase 1 check
Eight databases exist inside 🗄️ Databases, with all properties above, and every relation is **two-way** and appears on both sides.

---

## 4. Phase 2 — Fill the databases

### 4.1 Pages derived from `08`
- **✍️ My Song Notes**: create it as a sub-page of the Song Guide. Convert the "Song-specific notes page" code block into a fill-in form: one bold label per line followed by an empty text line. Keep the original code block at the bottom inside a toggle "Original template."

### 4.2 📅 Daily Plan: the 29 rows

**Parsing rule for Week files:** each `## Day N — Title` heading starts one row, and its content runs until the next `---` divider or the next `## ` heading. The row's **Name** is the heading text exactly. The **body** is everything under the heading, converted as in §6: `**Warm-up (8 min)**`-style bold lines become **Heading 3** blocks, and `- [ ]` items become **to-do blocks** (so the user can tick them off). Keep all nested code blocks (e.g. Day 12's strum grid) as code blocks.

Row values (the Reading and Routines relations follow each day's `**Reading:**` line and the routines named in its body):

| Day | Name (exact) | Week | Type | Focus | Chords | Reading | Mins |
|---|---|---|---|---|---|---|---|
| 0 | Day 0 — Before you start | Prep | Setup | Review | — | 00 | 10 |
| 1 | Day 1 — Meet your instruments | Week 1 | Lesson | Guitar, Voice | — | 01, 02 | 30 |
| 2 | Day 2 — Your first chord: Em | Week 1 | Lesson | Guitar, Voice | Em, Em7 | 01 | 30 |
| 3 | Day 3 — Second chord: Am, and your first chord change | Week 1 | Lesson | Guitar, Voice | Em, Am | 01 | 30 |
| 4 | Day 4 — Strumming in time | Week 1 | Lesson | Guitar, Voice | Em, Am | 01, 03 | 30 |
| 5 | Day 5 — First "together": humming over a chord | Week 1 | Lesson | Guitar, Together | Em, Am | 04 | 30 |
| 6 | Day 6 — Consolidate & first check-in | Week 1 | Check-in | Guitar, Voice, Together, Review | Em, Am | — | 30 |
| 7 | Day 7 — Rest (or a light day) | Week 1 | Rest / Light | Review | — | 03 | 15 |
| 8 | Day 8 — G chord | Week 2 | Lesson | Guitar, Voice | G (full), G (easy), Em, Am | 01 | 35 |
| 9 | Day 9 — G changes & eighth-note strumming | Week 2 | Lesson | Guitar, Voice | G (full), G (easy), Em, Am | 01 | 35 |
| 10 | Day 10 — Dm chord | Week 2 | Lesson | Guitar, Voice, Together | Dm, Em, Am | 01, 04 | 35 |
| 11 | Day 11 — Four-chord day | Week 2 | Lesson | Guitar, Voice, Together | Em, Am, G (full), Dm | — | 35 |
| 12 | Day 12 — The rhythm of the song | Week 2 | Lesson | Guitar, Voice, Together, Song | Em, Am, G (full), Dm | Song Guide | 35 |
| 13 | Day 13 — Independence training | Week 2 | Lesson | Guitar, Together | Em, Am, G (full) | 04 | 35 |
| 14 | Day 14 — Review, check-in & rest | Week 2 | Check-in | Review | all 6 | — | 20 |
| 15 | Day 15 — The map of the song | Week 3 | Lesson | Guitar, Voice, Song | Am, Em, G (full), Dm | Song Guide | 45 |
| 16 | Day 16 — Whole-song chords & humming the melody | Week 3 | Lesson | Guitar, Voice, Together, Song | Am, Em, G (full), Dm | — | 45 |
| 17 | Day 17 — The folk strum & speaking the words | Week 3 | Lesson | Guitar, Voice, Together, Song | Am, Em, G (full), Dm | 01, Song Guide | 45 |
| 18 | Day 18 — First real singing & playing | Week 3 | Lesson | Together, Song | Am, Em, G (full), Dm | 04 | 45 |
| 19 | Day 19 — The "I know" section | Week 3 | Lesson | Together, Song | Am | Song Guide | 45 |
| 20 | Day 20 — Quarter notes under the voice | Week 3 | Lesson | Together, Song | Am, Em, G (full), Dm | — | 45 |
| 21 | Day 21 — Check-in & rest | Week 3 | Check-in | Review | all 6 | 04 | 20 |
| 22 | Day 22 — Fix the weak spots, add the full strum | Week 4 | Lesson | Together, Song | Am, Em, G (full), Dm | — | 45 |
| 23 | Day 23 — Tempo & the whole song with the pattern | Week 4 | Lesson | Together, Song | Am, Em, G (full), Dm | — | 45 |
| 24 | Day 24 — Dynamics & feel | Week 4 | Lesson | Guitar, Together, Song | Am, Em, G (full), Dm | Song Guide | 45 |
| 25 | Day 25 — Performance skills | Week 4 | Lesson | Together, Song | Am, Em, G (full), Dm | — | 45 |
| 26 | Day 26 — Dress rehearsal | Week 4 | Performance | Together, Song | Am, Em, G (full), Dm | — | 45 |
| 27 | Day 27 — Performance day 🎤 | Week 4 | Performance | Together, Song | Am, Em, G (full), Dm | — | 30 |
| 28 | Day 28 — The final recording & reflection 🏁 | Week 4 | Performance | Together, Song, Review | Am, Em, G (full), Dm | — | 45 |

"Song Guide" in the Reading column means: the Song Guide isn't a Library database row with content, so link the **`05 — Song Guide` link row** in the relation *and* keep the in-body link to the standalone page.

**Day 0 body:** the "Before your very first session: 10-minute checklist" from `00` §7, as to-dos, plus the Week 1 file's "### Before Day 1" line.

**Routines relation:** tag each day with the routines it names (e.g. Day 3 → Routine 0, Routine 1, Routine 2, Voice Warm-up A, Routine 5, Routine 7). If a day says "Setup + Body + Breathing," that's Routines 0, 1 and 2.

**Status:** all `Not started`.

### 4.3 🏁 Milestones rows
- From each `Week-N.md`, the `### Week N goals` checklist → one row per item, **Level = Weekly goal**, Week = N.
- From `README.md`, the "Milestone checklist for the whole month" → one row per item, **Level = Month milestone**, Week from its `### Week N` subheading.

### ✅ Phase 2 check
- Daily Plan has **29 rows** (Day 0–28) and none has an empty body.
- Glossary has **98 rows**; Routines **19**; Chords **6**; Recordings **8**; Library **7** (5 content + 2 link rows).
- Milestones has **53 rows**: 33 weekly goals (Week 1: 9, Week 2: 9, Week 3: 8, Week 4: 7) + 20 month milestones from the README.

---

## 5. Phase 3 — The hub page (🎸 Month 1 — Guitar & Singing)

Icon 🎸. Build it top to bottom:

1. **Callout 🎯 (blue background):** the README's "Goal for the month" blockquote, verbatim.
2. **Callout 🌞** with a big link: "Open the Song Guide → 🌞 Ain't No Sunshine — Song Guide" (a page mention).
3. **Heading: "▶️ Today"**: a **linked view of 📅 Daily Plan**:
   - If dates are set: **List** view, filter `Date is today`, showing properties Week, Type, Planned minutes, Status.
   - If dates are empty: **List** view, filter `Status is not Done` AND `Status is not Skipped`, sort `Day ascending`. The first card is today's session. Name the view "Up next."
4. **Heading: "🗓️ The four weeks"**: a **4-column** layout, each column holding a page mention of one Week page plus that week's row from the README "How to use this folder" week table (Theme + "By the end you can…") as a short text block.
5. **Heading: "📈 Progress"**, two columns:
   - Left: linked view of **📅 Daily Plan**, **Table**, grouped by Week, with the Status column calculation set to **Percent per group → Done** (or "Percent done"), showing only Name, Status, Date.
   - Right: linked view of **🏁 Milestones**, **Board** grouped by Week, filtered `Level = Month milestone`, with the Done checkbox visible on cards.
6. **Heading: "📚 Reference"**: linked view of **📚 Library** as a **Gallery** (card preview: none; properties: Category, Read by), sorted by Order; then page mentions for 🛠️ Troubleshooting & FAQ, 🔁 Routines, 🎸 Chords, 📖 Glossary.
7. **Heading: "📊 Benchmarks"**: the "Benchmark tracker" table and the "Targets" table from `08`, as **simple tables** (editable) exactly as they are in the source, including the `—` cells.
8. The rest of the README, verbatim, **in its original order**, under a **toggle heading "📖 About this course"**:
   - "Why this song is a good first song" (simple table)
   - "How to use this folder": with every file link re-pointed per §7 (keep the text, change the targets)
   - "The daily time commitment" (simple table + paragraphs)
   - "The four rules of this month": as a **callout ⚠️** containing the numbered list
   - "A note on the lyrics": a **callout ©️**
9. The README's **Milestone checklist**: don't duplicate it as to-dos here (it lives in 🏁 Milestones). Instead put a linked Milestones view (**Table**, filter `Level = Month milestone`, grouped by Week) under a heading "🏁 Month milestones." That's how the checklist is included on the hub.

---

## 6. Phase 4 — Converting markdown into Notion blocks

Apply these rules to every page and database row body.

| Markdown | Notion block |
|---|---|
| `# Title` (first line) | Page title, **not** a block |
| `## Heading` | **Heading 1** |
| `### Heading` | **Heading 2** |
| `#### Heading` | **Heading 3** |
| Bold-only line used as a mini-header (e.g. `**Guitar (15 min)**` in day plans) | **Heading 3** |
| Paragraph | Text |
| `- item` / `1. item` | Bulleted / numbered list (keep the nesting) |
| `- [ ] item` | **To-do** block (unchecked) |
| ` ``` ` code block | **Code block, language Plain Text**, content byte-for-byte identical |
| `> quote` that starts with **Goal**, **Theme**, **To Muse**, **About the lyrics**, or **Trust your ears** | **Callout**: 🎯 for goal/theme, ©️ for lyrics, 👂 for "Trust your ears" |
| Any other `> quote` | **Callout 💡** (gray background) |
| Table | **Simple table** with a header row (unless §3–§4 made it a database) |
| `---` | Divider |
| `**bold**`, `*italic*`, `` `code` `` | Same inline formatting |
| `★`, `✓`, `→`, `↓`, `↑`, `♭`, `♯`, emoji | Keep the characters exactly |

### Long reference pages: use toggle headings
For **01 — Guitar Fundamentals**, **02 — Voice Fundamentals**, **🛠️ Troubleshooting & FAQ** and the **Song Guide**:
- Put a **Table of contents** block at the top.
- Make every `##` section a **toggle Heading 1** (collapsed), with the section content inside the toggle.
- **Exception:** in the Song Guide, keep §4 "The chord chart" and §5 "The full song on one page" **expanded (not toggles)**. The user reads these while playing.
- In Troubleshooting, each `###` problem heading becomes a **toggle** (plain toggle, question as its title) inside its section's toggle heading.

For **day rows (Daily Plan)** and **Week pages**: **no toggles** around to-dos. The user needs to see their checklist immediately.

### Week pages (🗓️ Week N)
Each Week page contains, in this order:
1. The `> Theme…` blockquote → **callout 🎯**.
2. The "Week N goals" → a **linked view of 🏁 Milestones** (List, filter `Week = Week N` AND `Level = Weekly goal`, Done checkbox shown). *Don't* also paste them as to-dos.
3. Any text between the goals and Day 1 (e.g. "Session template…", "Before Day 15…", "Your targets list…", "Before Day 1") → verbatim text, links re-pointed.
4. Heading "Days" → a **linked view of 📅 Daily Plan**, **Board** grouped by Status, filter `Week = Week N`, sort Day ascending, card properties: Day, Type, Planned minutes, Date. Add a second tab: **Table** view with the same filter.
5. The `## Week N troubleshooting quick hits` table → a **toggle Heading 1** containing the simple table and the closing line (e.g. "More in 07 — Troubleshooting & FAQ"), links re-pointed.
6. The navigation line ("← Previous · Next →") → page mentions.

The day content lives **only** in the Daily Plan rows (not duplicated on the Week pages). The linked view is how each Week page "includes" its days.

### Performance chart (Song Guide §5)
Keep it as the exact code block. Also, directly under it, add a **callout 🖨️**: "Tip: use ••• → Export → PDF on this page, or screenshot this block, to print the chart for your music stand."

---

## 7. Phase 5 — Links

Re-point every markdown link.

| Link target in source | Point it to |
|---|---|
| `README.md` / `README.md#…` | 🎸 hub page |
| `00-…md`, `01-…md`, `02-…md`, `03-…md`, `04-…md` | The matching 📚 Library row |
| `05-Song-Guide-Aint-No-Sunshine.md…` | 🌞 Song Guide page |
| `06-Daily-Routines.md` (no anchor) | 🔁 Routines database |
| `06-Daily-Routines.md#week-2-template-35-min` etc. | The matching 🔁 Routines **row** (e.g. `Template: Week 2 (~35 min)`) |
| `07-Troubleshooting-and-FAQ.md` | 🛠️ Troubleshooting & FAQ page |
| `08-Practice-Log-Template.md` | 📝 Practice Log database |
| `09-Glossary.md` | 📖 Glossary database |
| `Week-N.md` | 🗓️ Week N page |
| Links with `#section-anchor` into a page | Link to the page. If you can create a **link to block** for that heading, prefer that. Otherwise link the page and keep the section name in the link text |

Also add these **backlinks** (new, but purely navigational, so they're allowed):
- At the top of every Daily Plan row body: a small text line: `← 🗓️ Week N` (page mention) `· 🎸 Hub`.
- At the top of every Library row, the Song Guide, and Troubleshooting: `← 🎸 Hub`.

---

## 8. Phase 6 — Views to create inside the databases themselves

| Database | Views |
|---|---|
| 📅 Daily Plan | **All days** (Table, sort Day asc) · **By week** (Board, group by Week) · **Calendar** (by Date; only if dates exist) · **Remaining** (List, Status ≠ Done, sort Day asc) |
| 📚 Library | **Gallery** (sort Order) · **Table** |
| 🎸 Chords | **Gallery** with **card preview = Page content** (so the diagram shows on the card), sort by Introduced then Difficulty · **Table** |
| 🔁 Routines | **By kind** (Board, group by Kind) · **Table** |
| 🏁 Milestones | **By week** (Board, group by Week) · **Open** (Table, Done unchecked) · **Month milestones** (Table, Level = Month milestone) |
| 📝 Practice Log | **Log** (Table, sort Date desc) · **Change scores** (Table showing only Date, Day, the six change properties and Hiss) · If Notion **chart views** are available: **Line chart**, X = Date, Y = Em↔Am (then one per pair), titled "One-Minute Changes over time" |
| 🎙️ Recordings | **Table** (sort Day asc) · **Gallery** (card preview = File) |
| 📖 Glossary | **A–Z** (Table, sort Term asc) · **By category** (Table, grouped by Category) |

---

## 9. Phase 7 — Final verification (required)

Go through this list and **fix anything that fails** before telling the user you're done. Then report the results to the user as a short checklist.

**Coverage**
- [ ] Every row in the §2 manifest has been handled.
- [ ] For **each source file**, pick its **last paragraph or table row** and confirm it exists in Notion (this catches truncation on long pages). Particularly: `01` ends with the restringing video tip; `02` ends with "That's what makes a cover worth listening to."; `07` ends with the "I'm older" FAQ answer; `05` ends with listening homework item 9.
- [ ] Every `##` heading in every source file exists as a heading (or a database row, or a toggle title) in Notion.
- [ ] Counts: Daily Plan **29**, Library **7**, Chords **6**, Routines **19**, Recordings **8**, Glossary **98**, Milestones **53**, Practice Log **0** rows + **2** templates.
- [ ] Every Daily Plan row body has all its to-dos. Spot-check Day 3, Day 12 (contains a code block), Day 19, and Day 28.

**Formatting**
- [ ] Every code block from the source is a Notion **code block** with its spacing intact. Spot-check: Am diagram in `01` §9, the Song Guide §5 performance chart, the Spider tab in Routines, the folk pattern grid in `01` §11, and the bass walk tab in the Song Guide §7.
- [ ] No markdown syntax is left showing as literal text (`**`, `- [ ]`, `|---|`, `#`, `<a id=…>`).
- [ ] No link points to a `.md` file.

**Function**
- [ ] Ticking a to-do in a Daily Plan row works (to-do blocks, not text).
- [ ] Setting a Daily Plan row to Done removes it from the hub's "Today / Up next" view.
- [ ] Each Week page's Daily Plan view shows exactly its days (7 each; Week 1 excludes Day 0).
- [ ] Relations are two-way: opening the `Am` chord row shows its related days.
- [ ] Creating a new Practice Log entry applies the `Daily entry` template automatically.

**Rules**
- [ ] No lyrics were added anywhere.
- [ ] No content was summarized or rewritten.

---

## 10. If something doesn't fit

- **A limit on page or block size:** create the page, then append its content in several chunks, in order. Never cut content to fit.
- **A feature is unavailable** (e.g. chart views, toggle headings, link-to-block): use the nearest equivalent (a plain toggle with a heading inside, a page link), and mention the substitution in your final report.
- **Something in the source is ambiguous:** keep the source text as-is in the most natural place, and list it in your final report. Don't guess and don't drop it.
- **Duplicate content by design** (Day 0 checklist vs. `00` §7; chord diagrams in `01` vs. Chords rows vs. Song Guide §2; weekly goals vs. month milestones): **keep all copies.** The source intentionally shows the same info in the place it's needed.

---

## 11. What to tell the user when finished

Send a short summary:
1. Link to the hub page.
2. The verification checklist results (§9), with any substitutions or ambiguities.
3. **How to use it daily** (copy this text):
   > Open **🎸 Month 1** → the **Up next / Today** card is today's session. Open it, work through the to-dos top to bottom, then set Status → **Done**. Afterwards, click **New** in **📝 Practice Log** (the template loads automatically), link it to today's Day, and fill in your scores. On check-in days (6, 14, 21, 28), fill in the **📊 Benchmarks** table on the hub and tick your **🏁 Milestones**. Keep **🌞 Ain't No Sunshine** open while you play from Day 12 onward.
