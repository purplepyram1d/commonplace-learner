# Commonplace Learner TODO

## Usability

- [ ] Persist learner state with `localStorage`: last deck, selected mode, reader position, weak cards, right and wrong piles, and recent session history.
- [ ] Add a curriculum dashboard showing subject coverage, weak concepts, due cards, and recent study volume.
- [ ] Add deck search, tags, and filters so large decks remain easy to navigate.
- [ ] Add custom deck import and export through JSON or CSV.

## Deployment

- [ ] Deploy to Netlify — push to GitHub, connect repo, auto-deploy on push. Free tier sufficient. Eliminates need for local server to load decks.
- [ ] Add Netlify Function for Claude proxy (`netlify/functions/extract.js`) — receives loaded text, calls Anthropic API, returns `{ cards: [{term, definition}] }`. Keeps API key off client.
- [ ] Set `ANTHROPIC_API_KEY` in Netlify environment variables.
- [ ] Wire Extract Terms button to `/api/extract` endpoint.
- [ ] Optional: custom subdomain (`learn.johnnymeintel.com`) via CNAME.

## Learning Depth

- [ ] Replace simple weak-card review with spaced repetition using due dates, ease ratings, lapse count, and review queues.
- [ ] Add reader-to-card capture so selected reader text can become a flashcard draft.
- [ ] Add exam mode for certification decks with timed prompts, mixed objectives, and post-session review.
