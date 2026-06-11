# Commonplace Learner

A browser-based study app combining speed reading and flashcard drilling, built for certification prep and security study.

## Features

- **Reader mode** — RSVP-style speed reading over loaded text
- **Flashcard mode** — term/definition drilling with right/wrong piles and weak-card review
- **16 built-in decks** — SOC, blue team, red team, bug bounty, Active Directory, Azure, AWS, AI-102, COAE, PowerShell, Linux, Python, and more

## Running locally

Static site — no build step. Serve the folder with any local server so the deck files load:

```
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Roadmap

See [TODO.md](TODO.md) — localStorage persistence, spaced repetition, Netlify deployment with a Claude-powered term extraction function.
