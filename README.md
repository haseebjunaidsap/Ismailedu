# Pip's Learning Park

A learning site for kids in grades 1–4: Reading & English, Math, Science, Social Studies, Logical Thinking, and Manners & Behavior. It has lessons, quizzes, stories, stickers and pets, plus a parent dashboard.

It is a plain static website with no build step. Upload this folder to GitHub (GitHub Pages works as is) and open `index.html`.

## What's where

```
index.html            the page itself: header, menus, and the list of CSS and JS files
manifest.webmanifest  app name and icons for "Add to Home Screen"
icon-*.png            app icons
css/                  styles, numbered in the order they load
js/                   all the code and content (see below)
tools/bundle.py       makes a one-file copy of the whole site (optional)
```

### css/

| File | What it styles |
|---|---|
| `00-explainer.css` | The "why is that wrong?" pop-up |
| `01-base.css` | Colors, fonts, page background |
| `02-top-bar-buttons-pip.css` | Top bar, chunky buttons, Pip the owl |
| `03-pages.css` | Home, grade page, lesson page |
| `04-lesson-visuals.css` | Pictures used in lessons and questions |
| `05-quiz-results-settings.css` | Quiz screen, results, settings |
| `06-engagement.css` | Stickers, streaks, the quiz HUD |
| `07-topics-and-tools.css` | Logic visuals, Ask Pip, pause, Explain more, manners |
| `08-profiles-dashboard-stories.css` | Kids, question kinds (type, order, sort), daily challenge, stories, dashboard, accessibility |
| `09-pause-save-touch.css` | Pause button, GitHub save, iPad and touch screens |
| `10-explanations-pace.css` | Explanations, learning pace, confetti |
| `11-focus-and-new-subjects.css` | Stop/Listen/Think, pets and animations, name sounds, focus topics, Help, Science & Social Studies, name prompt |

### js/

The folders hold related files. **The order of the `<script>` tags in `index.html` is the order the files run**, and it matters: later files add questions to topics made in earlier files.

| Folder | What's inside |
|---|---|
| `core/helpers.js` | Shared helpers: random picks, shuffling, picture makers, and `clean()` (how Pip reads text aloud) |
| `curriculum/` | The original topics for every subject, plus the Logic and Manners subjects |
| `banks/`, `banks-v22/`, `banks-v24/`, `banks-v25/` | More questions (and some new topics) for each subject and grade, added in rounds. File names say the subject and grade, e.g. `banks-v25/math-grade3.js` |
| `topics/` | Stop/Listen/Think and focus topics, and the Science and Social Studies subjects |
| `app/` | The app itself: `main.js` (screens, quiz, voice), `profiles.js`, `github-save.js`, `cloud-sync.js`, `ask-pip.js`, `pause.js`, `learning-pace.js`, `question-types.js`, `story-time.js`, `parents-dashboard.js`, `explainer.js` |
| `why-wrong/` | The reasons shown when a child picks a wrong answer, by subject and grade |
| `app/start.js` | Starts the app. It must stay the **last** script. |

Grades and ages: inside the code, topics are stored by age (6, 7, 8, 9 = grades 1, 2, 3, 4), so routes look like `#age-7-math`. The screens show grades.

## Common changes

- **Add questions to a topic:** find the topic's subject and grade in `js/banks-v25/` (or an older bank) and add to it, or make a new file and add its `<script>` tag after the topic's file.
- **Add a new topic:** add it to the right file in `js/curriculum/` or `js/topics/`. A new file is fine too; put its `<script>` tag before `js/app/`.
- **Change how something looks:** find the screen in the CSS table above.
- **Change the version shown in Settings:** search `index.html` for `app-ver`.

## One-file copy (optional)

`python3 tools/bundle.py` writes `pips-learning-park-single.html`, the whole site in a single file that works without the folders.

## Saving progress to GitHub

In Settings you can save each child's progress to a private GitHub repository. The access token is kept only in the browser that entered it. It is never put in these files, so don't add one here.
