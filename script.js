// DOM references

const sourceText = document.getElementById("source-text");
const readerWorkspaceBtn = document.getElementById("reader-workspace-btn");
const flashcardsWorkspaceBtn = document.getElementById("flashcards-workspace-btn");
const readerWorkspace = document.getElementById("reader-workspace");
const flashcardsWorkspace = document.getElementById("flashcards-workspace");
const cleanBtn = document.getElementById("clean-btn");
const loadBtn = document.getElementById("load-btn");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const readerFullscreenBtn = document.getElementById("reader-fullscreen-btn");
const readerToggleBtn = document.getElementById("reader-toggle-btn");
const readingModeInput = document.getElementById("reading-mode");
const chunkSizeInput = document.getElementById("chunk-size");
const wpmInput = document.getElementById("wpm");
const readingModeValue = document.getElementById("reading-mode-value");
const chunkSizeLabel = document.getElementById("chunk-size-label");
const chunkSizeValue = document.getElementById("chunk-size-value");
const wpmValue = document.getElementById("wpm-value");
const cleanStatus = document.getElementById("clean-status");
const readerDisplay = document.getElementById("reader-display");
const wordCount = document.getElementById("word-count");
const progressText = document.getElementById("progress-text");
const durationText = document.getElementById("duration-text");
const progressBar = document.getElementById("progress-bar");
const readerPanel = document.querySelector(".reader-panel");
const flashcardProgress = document.getElementById("flashcard-progress");
const flashcardFaceLabel = document.getElementById("flashcard-face-label");
const flashcardTerm = document.getElementById("flashcard-term");
const flashcardDefinition = document.getElementById("flashcard-definition");
const flashcardStatus = document.getElementById("flashcard-status");
const flashcardStartBtn = document.getElementById("flashcard-start-btn");
const flashcardRestartBtn = document.getElementById("flashcard-restart-btn");
const flashcardPauseBtn = document.getElementById("flashcard-pause-btn");
const flashcardRevealBtn = document.getElementById("flashcard-reveal-btn");
const flashcardsFullscreenBtn = document.getElementById("flashcards-fullscreen-btn");
const flashcardPrevBtn = document.getElementById("flashcard-prev-btn");
const flashcardNextBtn = document.getElementById("flashcard-next-btn");
const flashcardShuffleBtn = document.getElementById("flashcard-shuffle-btn");
const flashcardRightBtn = document.getElementById("flashcard-right-btn");
const flashcardWrongBtn = document.getElementById("flashcard-wrong-btn");
const flashcardCount = document.getElementById("flashcard-count");
const flashcardCurrentLabel = document.getElementById("flashcard-current-label");
const flashcardDeckTitle = document.getElementById("flashcard-deck-title");
const flashcardDeckDescription = document.getElementById("flashcard-deck-description");
const flashcardDeckLabel = document.getElementById("flashcard-deck-label");
const flashcardDeckInput = document.getElementById("flashcard-deck");
const randomMixSourceInput = document.getElementById("random-mix-source");
const flashcardModeInput = document.getElementById("flashcard-mode");
const brainwashOrderInput = document.getElementById("brainwash-order");
const brainwashDisplayModeInput = document.getElementById("brainwash-display-mode");
const brainwashTermSpeedInput = document.getElementById("brainwash-term-speed");
const brainwashTermSpeedValue = document.getElementById("brainwash-term-speed-value");
const brainwashDefinitionSpeedInput = document.getElementById("brainwash-definition-speed");
const brainwashDefinitionSpeedValue = document.getElementById("brainwash-definition-speed-value");
const brainwashTypewriterSpeedInput = document.getElementById("brainwash-typewriter-speed");
const brainwashTypewriterSpeedValue = document.getElementById("brainwash-typewriter-speed-value");
const quizPromptSideInput = document.getElementById("quiz-prompt-side");
const quizGuessSecondsInput = document.getElementById("quiz-guess-seconds");
const quizGuessSecondsValue = document.getElementById("quiz-guess-seconds-value");
const flashcardRightCount = document.getElementById("flashcard-right-count");
const flashcardWrongCount = document.getElementById("flashcard-wrong-count");
const flashcardList = document.getElementById("flashcard-list");
const flashcardCard = document.getElementById("flashcard-card");
const flashcardQuizActions = document.getElementById("flashcard-quiz-actions");
const fullscreenHint = document.getElementById("fullscreen-hint");
const flashcardRandomControls = document.querySelectorAll(".flashcard-random-control");
const flashcardBrainwashControls = document.querySelectorAll(".flashcard-brainwash-control");
const flashcardQuizControls = document.querySelectorAll(".flashcard-quiz-control");
const flashcardBrainwashTypewriterControls = document.querySelectorAll(".flashcard-brainwash-typewriter-control");

const flashcardDecks = window.COMMONPLACE_DECKS;

if (!flashcardDecks || !flashcardDecks.cybersecurity) {
  throw new Error("Deck catalog failed to load.");
}

// App state

const state = {
  words: [],
  pointer: 0,
  timerId: null,
  activeWorkspace: "reader",
  activeDeckKey: "cybersecurity",
  flashcards: flashcardDecks.cybersecurity.cards.slice(),
  flashcardIndex: 0,
  flashcardRevealed: false,
  flashcardTimerId: null,
  flashcardRunning: false,
  flashcardRightPile: [],
  flashcardWrongPile: [],
  flashcardWeakMap: {},
  flashcardQuizPromptSide: "term",
  flashcardBrainwashPhase: "front",
  flashcardTypewriterTimerId: null,
  fullscreenHintTimerId: null,
};

// Shared helpers

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[character]));
}

function shuffleArray(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  return items;
}

// Deck selection

function cloneDeckCards(deckKey, cards) {
  return cards.map((card) => ({ ...card, sourceDeckKey: deckKey }));
}

function getCardId(card) {
  return `${card.sourceDeckKey || state.activeDeckKey}::${card.term}`;
}

function getMixedDeckConfig(sourceMode = "all") {
  const weakCards = Object.values(state.flashcardWeakMap).map((entry) => ({ ...entry.card }));
  const cards = sourceMode === "weak"
    ? weakCards
    : Object.entries(flashcardDecks)
      .filter(([key]) => key !== "random")
      .flatMap(([key, deck]) => cloneDeckCards(key, deck.cards));

  return {
    title: sourceMode === "weak" ? "Weak Card Mix" : "Random Mix Deck",
    description: sourceMode === "weak"
      ? "A shuffled recovery set built from cards you have missed in quiz mode, so you can revisit weaker concepts across every deck."
      : "A shuffled cross-deck session that pulls cards from across the full catalog for mixed review and recall practice.",
    label: sourceMode === "weak" ? "Weak Review" : "Mixed Review",
    shortLabel: sourceMode === "weak" ? "Weak Mix" : "Random Mix",
    cards: shuffleArray(cards),
  };
}

function getActiveDeckConfig() {
  if (state.activeDeckKey === "random") {
    const randomMixConfig = getMixedDeckConfig(randomMixSourceInput.value);
    return {
      ...randomMixConfig,
      cards: state.flashcards,
    };
  }

  return flashcardDecks[state.activeDeckKey] || flashcardDecks.cybersecurity;
}

const junkLinePatterns = [
  /^share\b/i,
  /^advertisement$/i,
  /^related articles?$/i,
  /^read more$/i,
  /^continue reading$/i,
  /^sign up\b/i,
  /^newsletter$/i,
  /^follow us\b/i,
  /^copyright\b/i,
  /^all rights reserved\b/i,
  /^photo:|^image:|^credit:/i,
  /^\d+\s+min read$/i,
  /^updated[:\s]/i,
  /^published[:\s]/i,
];

const connectiveWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "because",
  "before",
  "but",
  "by",
  "for",
  "from",
  "if",
  "in",
  "into",
  "nor",
  "of",
  "on",
  "or",
  "since",
  "so",
  "than",
  "that",
  "the",
  "though",
  "through",
  "to",
  "under",
  "until",
  "via",
  "when",
  "while",
  "with",
  "yet",
]);

function normalizeWordForStyling(word) {
  return word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
}

// Workspace and fullscreen

function setWorkspace(workspaceName) {
  state.activeWorkspace = workspaceName;
  const readerActive = workspaceName === "reader";

  readerWorkspace.classList.toggle("workspace-panel-active", readerActive);
  flashcardsWorkspace.classList.toggle("workspace-panel-active", !readerActive);
  readerWorkspaceBtn.classList.toggle("workspace-tab-active", readerActive);
  flashcardsWorkspaceBtn.classList.toggle("workspace-tab-active", !readerActive);
  readerWorkspaceBtn.setAttribute("aria-selected", String(readerActive));
  flashcardsWorkspaceBtn.setAttribute("aria-selected", String(!readerActive));
  document.body.classList.toggle("flashcards-active", !readerActive);
}

function setFlashcardDeck(deckKey) {
  const catalogDeck = flashcardDecks[deckKey];
  const deck = deckKey === "random"
    ? getMixedDeckConfig(randomMixSourceInput.value)
    : catalogDeck
      ? {
        ...catalogDeck,
        cards: cloneDeckCards(deckKey, catalogDeck.cards),
      }
      : null;

  if (!deck) {
    return;
  }

  stopFlashcardPlayback();
  state.activeDeckKey = deckKey;
  state.flashcards = deck.cards.slice();
  state.flashcardIndex = 0;
  state.flashcardRevealed = false;
  state.flashcardRightPile = [];
  state.flashcardWrongPile = [];
  flashcardDeckInput.value = deckKey;
  renderFlashcard();
}

function showFullscreenHint() {
  fullscreenHint.classList.add("fullscreen-hint-visible");

  if (state.fullscreenHintTimerId) {
    window.clearTimeout(state.fullscreenHintTimerId);
  }

  state.fullscreenHintTimerId = window.setTimeout(() => {
    fullscreenHint.classList.remove("fullscreen-hint-visible");
    state.fullscreenHintTimerId = null;
  }, 2600);
}

async function enterFullscreenFor(element) {
  if (!element || !document.fullscreenEnabled) {
    return;
  }

  try {
    if (document.fullscreenElement && document.fullscreenElement !== element) {
      await document.exitFullscreen();
    }

    if (document.fullscreenElement !== element) {
      await element.requestFullscreen();
      showFullscreenHint();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen request failed", error);
  }
}

function updateFullscreenButtons() {
  const inReaderFullscreen = document.fullscreenElement === readerPanel;
  const inFlashcardsFullscreen = document.fullscreenElement === flashcardsWorkspace;
  readerFullscreenBtn.textContent = inReaderFullscreen ? "Exit Fullscreen" : "Fullscreen";
  flashcardsFullscreenBtn.textContent = inFlashcardsFullscreen ? "Exit Fullscreen" : "Fullscreen";
}

// Flashcard rendering and playback

function stopFlashcardPlayback() {
  if (state.flashcardTimerId) {
    window.clearTimeout(state.flashcardTimerId);
    state.flashcardTimerId = null;
  }

  if (state.flashcardTypewriterTimerId) {
    window.clearTimeout(state.flashcardTypewriterTimerId);
    state.flashcardTypewriterTimerId = null;
  }

  state.flashcardRunning = false;
}

function getFlashcardPromptSide() {
  if (quizPromptSideInput.value === "random") {
    return Math.random() > 0.5 ? "term" : "definition";
  }

  return quizPromptSideInput.value;
}

function renderFlashcardTypewriter(text, callback) {
  if (state.flashcardTypewriterTimerId) {
    window.clearTimeout(state.flashcardTypewriterTimerId);
    state.flashcardTypewriterTimerId = null;
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wpm = Number(brainwashTypewriterSpeedInput.value);
  const interval = Math.max(40, Math.round((1 / wpm) * 60000));
  let index = 0;

  flashcardTerm.textContent = "";

  const tick = () => {
    flashcardTerm.textContent = words.slice(0, index + 1).join(" ");
    index += 1;

    if (index < words.length) {
      state.flashcardTypewriterTimerId = window.setTimeout(tick, interval);
      return;
    }

    state.flashcardTypewriterTimerId = null;
    if (callback) {
      // Wait until the final typed frame has painted before starting side timing.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          callback();
        });
      });
    }
  };

  if (!words.length) {
    if (callback) {
      callback();
    }
    return;
  }

  tick();
}

function updateFlashcardControls() {
  const brainwashMode = flashcardModeInput.value === "brainwash";
  const brainwashTypewriterMode = brainwashDisplayModeInput.value === "typewriter";
  const randomMixActive = state.activeDeckKey === "random";
  flashcardRandomControls.forEach((element) => {
    element.classList.toggle("flashcard-control-hidden", !randomMixActive);
  });
  flashcardBrainwashControls.forEach((element) => {
    element.classList.toggle("flashcard-control-hidden", !brainwashMode);
  });
  flashcardQuizControls.forEach((element) => {
    element.classList.toggle("flashcard-control-hidden", brainwashMode);
  });
  flashcardBrainwashTypewriterControls.forEach((element) => {
    element.classList.toggle("flashcard-control-hidden", !brainwashMode || !brainwashTypewriterMode);
  });
  flashcardQuizActions.classList.toggle("flashcard-control-hidden", brainwashMode);
  brainwashTermSpeedValue.textContent = `${Number(brainwashTermSpeedInput.value).toFixed(1)}s`;
  brainwashDefinitionSpeedValue.textContent = `${Number(brainwashDefinitionSpeedInput.value).toFixed(1)}s`;
  brainwashTypewriterSpeedValue.textContent = brainwashTypewriterSpeedInput.value;
  quizGuessSecondsValue.textContent = `${quizGuessSecondsInput.value}s`;

  flashcardRevealBtn.disabled = state.flashcardRunning;
  flashcardRightBtn.disabled = brainwashMode || !state.flashcardRevealed;
  flashcardWrongBtn.disabled = brainwashMode || !state.flashcardRevealed;
  flashcardPauseBtn.disabled = !state.flashcardRunning;

  const noCards = state.flashcards.length === 0;
  flashcardStartBtn.disabled = noCards;
  flashcardRestartBtn.disabled = noCards;
  flashcardPauseBtn.disabled = noCards || !state.flashcardRunning;
  flashcardRevealBtn.disabled = noCards || state.flashcardRunning;
  flashcardPrevBtn.disabled = noCards;
  flashcardNextBtn.disabled = noCards;
  flashcardShuffleBtn.disabled = noCards;
  flashcardRightBtn.disabled = noCards || brainwashMode || !state.flashcardRevealed;
  flashcardWrongBtn.disabled = noCards || brainwashMode || !state.flashcardRevealed;
}

function renderFlashcardList() {
  const items = state.flashcards.map((card, index) => {
    const activeClass = index === state.flashcardIndex ? " flashcard-list-item-active" : "";
    return [
      `<li><button class="flashcard-list-item${activeClass}"`,
      `type="button" data-flashcard-index="${index}">`,
      `${escapeHtml(card.term)}</button></li>`,
    ].join(" ");
  }).join("");

  flashcardList.innerHTML = items;
}

function renderFlashcard() {
  const card = state.flashcards[state.flashcardIndex];
  const activeDeck = getActiveDeckConfig();

  flashcardDeckTitle.textContent = activeDeck.title;
  flashcardDeckDescription.textContent = activeDeck.description;
  flashcardDeckLabel.textContent = activeDeck.label;
  flashcardProgress.textContent = state.flashcards.length
    ? `${state.flashcardIndex + 1} / ${state.flashcards.length}`
    : "0 / 0";
  flashcardCount.textContent = String(state.flashcards.length);
  flashcardRightCount.textContent = String(state.flashcardRightPile.length);
  flashcardWrongCount.textContent = String(state.flashcardWrongPile.length);
  flashcardCard.classList.remove("flashcard-card-quiz");
  flashcardCard.classList.remove("flashcard-card-definition");

  if (!card) {
    flashcardFaceLabel.textContent = "Ready";
    flashcardTerm.textContent = state.activeDeckKey === "random" && randomMixSourceInput.value === "weak"
      ? "No weak cards yet"
      : "No cards available";
    flashcardCurrentLabel.textContent = "None";
    flashcardDefinition.textContent = state.activeDeckKey === "random" && randomMixSourceInput.value === "weak"
      ? "Miss cards in Quiz mode to build a mixed weak-card session."
      : "Add or select a deck to begin studying.";
    state.flashcardRevealed = true;
    flashcardDefinition.classList.remove("flashcard-definition-hidden");
    flashcardRevealBtn.textContent = "Reveal";
    flashcardStatus.textContent = state.activeDeckKey === "random" && randomMixSourceInput.value === "weak"
      ? "Weak mix is waiting for missed quiz cards."
      : "Flashcards are ready.";
    renderFlashcardList();
    updateFlashcardControls();
    fitFlashcardText();
    return;
  }

  flashcardTerm.textContent = card.term;
  flashcardCurrentLabel.textContent = card.term;
  flashcardDefinition.textContent = card.definition;
  flashcardDefinition.classList.toggle("flashcard-definition-hidden", !state.flashcardRevealed);
  flashcardFaceLabel.textContent = "Term";
  flashcardRevealBtn.textContent = state.flashcardRevealed ? "Hide" : "Reveal";
  flashcardStatus.textContent = flashcardModeInput.value === "brainwash"
    ? "Brainwash mode is ready."
    : "Quiz mode is ready.";
  renderFlashcardList();
  updateFlashcardControls();
  fitFlashcardText();
}

function showFlashcard(index) {
  if (!state.flashcards.length) {
    renderFlashcard();
    return;
  }

  stopFlashcardPlayback();
  state.flashcardIndex = (index + state.flashcards.length) % state.flashcards.length;
  state.flashcardRevealed = false;
  renderFlashcard();
}

function shuffleFlashcards() {
  if (!state.flashcards.length) {
    renderFlashcard();
    return;
  }

  stopFlashcardPlayback();
  shuffleArray(state.flashcards);

  state.flashcardIndex = 0;
  state.flashcardRevealed = false;
  renderFlashcard();
}

function showBrainwashSide(card, side, afterRender) {
  const showingTerm = side === "term";
  const displayMode = brainwashDisplayModeInput.value;
  const text = showingTerm ? card.term : card.definition;
  flashcardFaceLabel.textContent = showingTerm ? "Term" : "Definition";
  flashcardDefinition.classList.add("flashcard-definition-hidden");
  flashcardCard.classList.remove("flashcard-card-quiz");
  flashcardCard.classList.toggle("flashcard-card-definition", !showingTerm);

  if (displayMode === "typewriter") {
    renderFlashcardTypewriter(text, () => {
      fitFlashcardText();
      if (afterRender) {
        afterRender();
      }
    });
    return;
  }

  flashcardTerm.textContent = text;
  fitFlashcardText();
  if (afterRender) {
    afterRender();
  }
}

function runBrainwashCycle() {
  const card = state.flashcards[state.flashcardIndex];
  if (!card || flashcardModeInput.value !== "brainwash") {
    stopFlashcardPlayback();
    updateFlashcardControls();
    return;
  }

  const firstSide = brainwashOrderInput.value === "term-first" ? "term" : "definition";
  const secondSide = firstSide === "term" ? "definition" : "term";
  const firstDelay = (firstSide === "term" ? Number(brainwashTermSpeedInput.value) : Number(brainwashDefinitionSpeedInput.value)) * 1000;
  const secondDelay = (secondSide === "term" ? Number(brainwashTermSpeedInput.value) : Number(brainwashDefinitionSpeedInput.value)) * 1000;

  state.flashcardRunning = true;
  updateFlashcardControls();

  if (state.flashcardBrainwashPhase === "front") {
    showBrainwashSide(card, firstSide, () => {
      flashcardStatus.textContent = `Brainwash: showing ${firstSide === "term" ? "term" : "definition"} first.`;
      state.flashcardTimerId = window.setTimeout(() => {
        state.flashcardBrainwashPhase = "back";
        runBrainwashCycle();
      }, firstDelay);
    });
    return;
  }

  showBrainwashSide(card, secondSide, () => {
    flashcardStatus.textContent = `Brainwash: now showing the ${secondSide === "term" ? "term" : "definition"}.`;
    state.flashcardTimerId = window.setTimeout(() => {
      state.flashcardIndex = (state.flashcardIndex + 1) % state.flashcards.length;
      state.flashcardBrainwashPhase = "front";
      renderFlashcard();
      runBrainwashCycle();
    }, secondDelay);
  });
}

function runQuizPrompt() {
  const card = state.flashcards[state.flashcardIndex];
  if (!card || flashcardModeInput.value !== "quiz") {
    stopFlashcardPlayback();
    updateFlashcardControls();
    return;
  }

  const promptSide = getFlashcardPromptSide();
  const answerSide = promptSide === "term" ? "definition" : "term";
  const seconds = Number(quizGuessSecondsInput.value) * 1000;

  state.flashcardQuizPromptSide = promptSide;
  state.flashcardRunning = true;
  state.flashcardRevealed = false;
  flashcardCard.classList.add("flashcard-card-quiz");
  flashcardCard.classList.remove("flashcard-card-definition");
  flashcardFaceLabel.textContent = promptSide === "term" ? "Term" : "Definition";
  flashcardTerm.textContent = promptSide === "term" ? card.term : card.definition;
  flashcardDefinition.textContent = answerSide === "definition" ? card.definition : card.term;
  flashcardDefinition.classList.add("flashcard-definition-hidden");
  flashcardStatus.textContent = `Quiz: ${seconds / 1000}s to guess before reveal.`;
  updateFlashcardControls();
  fitFlashcardText();

  state.flashcardTimerId = window.setTimeout(() => {
    state.flashcardRevealed = true;
    flashcardDefinition.classList.remove("flashcard-definition-hidden");
    flashcardStatus.textContent = "Mark the card right or wrong, then continue.";
    state.flashcardRunning = false;
    state.flashcardTimerId = null;
    updateFlashcardControls();
  }, seconds);
}

function fitFlashcardText() {
  const minimumTermSize = 28;
  const minimumDefinitionSize = 16;
  const defaultTermSize = flashcardCard.classList.contains("flashcard-card-definition") ? 27 : 52;
  const defaultDefinitionSize = 16;

  flashcardTerm.style.fontSize = `${defaultTermSize}px`;
  flashcardDefinition.style.fontSize = `${defaultDefinitionSize}px`;

  const shrinkToFit = (element, minimumSize) => {
    let currentSize = parseFloat(window.getComputedStyle(element).fontSize);

    while (
      element.scrollHeight > element.clientHeight + 1 &&
      currentSize > minimumSize
    ) {
      currentSize -= 1;
      element.style.fontSize = `${currentSize}px`;
    }
  };

  shrinkToFit(flashcardTerm, minimumTermSize);
  if (!flashcardDefinition.classList.contains("flashcard-definition-hidden")) {
    shrinkToFit(flashcardDefinition, minimumDefinitionSize);
  }
}

function startFlashcardSession() {
  if (!state.flashcards.length) {
    renderFlashcard();
    return;
  }

  stopFlashcardPlayback();

  if (flashcardModeInput.value === "brainwash") {
    state.flashcardBrainwashPhase = "front";
    runBrainwashCycle();
    return;
  }

  runQuizPrompt();
}

function restartFlashcardSession() {
  stopFlashcardPlayback();
  if (state.activeDeckKey === "random") {
    setFlashcardDeck("random");
  }
  state.flashcardIndex = 0;
  state.flashcardRevealed = false;
  state.flashcardRightPile = [];
  state.flashcardWrongPile = [];
  state.flashcardBrainwashPhase = "front";
  renderFlashcard();
  startFlashcardSession();
}

function scoreFlashcard(bucket) {
  const card = state.flashcards[state.flashcardIndex];
  if (!card || flashcardModeInput.value !== "quiz" || !state.flashcardRevealed) {
    return;
  }

  const cardId = getCardId(card);

  if (bucket === "right") {
    state.flashcardRightPile.push(card.term);
    if (state.flashcardWeakMap[cardId]) {
      state.flashcardWeakMap[cardId].misses -= 1;
      if (state.flashcardWeakMap[cardId].misses <= 0) {
        delete state.flashcardWeakMap[cardId];
      }
    }
  } else {
    state.flashcardWrongPile.push(card.term);
    const existing = state.flashcardWeakMap[cardId];
    state.flashcardWeakMap[cardId] = {
      card: { ...card },
      misses: (existing?.misses || 0) + 1,
    };
  }

  state.flashcardIndex = (state.flashcardIndex + 1) % state.flashcards.length;
  renderFlashcard();
  runQuizPrompt();
}

// Reader rendering and playback

function renderChunk(words) {
  if (!words.length) {
    readerDisplay.classList.remove("reader-display-typewriter");
    readerDisplay.textContent = "Awaiting text";
    return;
  }

  const markup = words.map((word) => {
    const normalized = normalizeWordForStyling(word);
    const className = connectiveWords.has(normalized) ? "reader-word reader-word-soft" : "reader-word";
    return `<span class="${className}">${escapeHtml(word)}</span>`;
  }).join(" ");

  readerDisplay.innerHTML = markup;
}

function renderTypewriter(displayPointer) {
  readerDisplay.classList.add("reader-display-typewriter");

  if (!displayPointer) {
    readerDisplay.innerHTML = '<div class="reader-typewriter-text"><span class="reader-caret"></span></div>';
    readerDisplay.scrollTop = 0;
    return;
  }

  const words = state.words.slice(0, displayPointer);
  const markup = words.map((word) => {
    const normalized = normalizeWordForStyling(word);
    const className = connectiveWords.has(normalized) ? "reader-word reader-word-soft" : "reader-word";
    return `<span class="${className}">${escapeHtml(word)}</span>`;
  }).join(" ");

  readerDisplay.innerHTML = `<div class="reader-typewriter-text">${markup} <span class="reader-caret"></span></div>`;
  scrollTypewriterIntoView();
}

function scrollTypewriterIntoView() {
  if (readingModeInput.value !== "typewriter") {
    return;
  }

  const caret = readerDisplay.querySelector(".reader-caret");
  if (!caret) {
    return;
  }

  const caretOffsetTop = caret.offsetTop;
  const targetTop = Math.max(0, caretOffsetTop - (readerDisplay.clientHeight * 0.55));

  readerDisplay.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

function sanitizeText(rawText) {
  const normalized = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[\u201c\u201d]/g, "\"")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, "-")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s{0,3}[-*+]\s+/gm, "")
    .replace(/^\s{0,3}\d+\.\s+/gm, "")
    .replace(/^\s{0,3}(-{3,}|\*{3,}|_{3,})\s*$/gm, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/(?<!\*)\*(?!\*)(.*?)\*(?<!\*)/g, "$1")
    .replace(/(?<!_)_(?!_)(.*?)_(?<!_)/g, "$1")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/^\s{0,3}\|/gm, "")
    .replace(/\|/g, " ")
    .replace(/\t+/g, " ")
    .replace(/[ ]{2,}/g, " ");

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !junkLinePatterns.some((pattern) => pattern.test(line)))
    .filter((line, index, linesArray) => {
      if (index === 0 && /^[A-Z0-9 ,:'"-]{6,}$/.test(line)) {
        return false;
      }

      if (index < 3 && /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}$/.test(line) && linesArray[index + 1]?.length < 80) {
        return false;
      }

      if (/^(home|news|world|opinion|culture|science)\b/i.test(line) && line.length < 24) {
        return false;
      }

      return true;
    });

  const merged = lines
    .join(" ")
    .replace(/-\s+/g, "")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s{2,}/g, " ")
    .trim();

  return merged;
}

function tokenize(cleanedText) {
  return cleanedText
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);
}

function formatDuration(totalWords, wpm) {
  if (!totalWords || !wpm) {
    return "0s";
  }

  const totalSeconds = Math.ceil((totalWords / wpm) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (!minutes) {
    return `${seconds}s`;
  }

  if (!seconds) {
    return `${minutes}m`;
  }

  return `${minutes}m ${seconds}s`;
}

function updateControlLabels() {
  const isTypewriterMode = readingModeInput.value === "typewriter";
  readingModeValue.textContent = isTypewriterMode ? "Typewriter Mode" : "Chunk Reader";
  chunkSizeLabel.textContent = isTypewriterMode ? "Words Per Step" : "Base Words at a Time";
  chunkSizeValue.textContent = chunkSizeInput.value;
  wpmValue.textContent = wpmInput.value;
  durationText.textContent = formatDuration(state.words.length, Number(wpmInput.value));
}

function updatePlaybackButtons() {
  const playing = Boolean(state.timerId);
  readerToggleBtn.textContent = playing ? "Pause" : "Play";
}

function updateReader(displayPointer = state.pointer, chunkLength = Number(chunkSizeInput.value)) {
  const isTypewriterMode = readingModeInput.value === "typewriter";
  const nextWords = state.words.slice(displayPointer, displayPointer + chunkLength);

  if (isTypewriterMode) {
    renderTypewriter(displayPointer);
  } else {
    readerDisplay.classList.remove("reader-display-typewriter");
    renderChunk(nextWords);
  }

  const shownWords = isTypewriterMode
    ? Math.min(displayPointer, state.words.length)
    : Math.min(displayPointer + nextWords.length, state.words.length);
  progressText.textContent = `${shownWords} / ${state.words.length}`;
  const percent = state.words.length ? (shownWords / state.words.length) * 100 : 0;
  progressBar.style.width = `${Math.min(percent, 100)}%`;
}

function getAdaptiveChunkLength(pointer, baseChunkSize) {
  const remaining = state.words.length - pointer;
  if (remaining <= 0) {
    return 0;
  }

  const maxChunk = Math.min(baseChunkSize, remaining);
  let chosenLength = maxChunk;

  for (let index = 0; index < maxChunk; index += 1) {
    const word = state.words[pointer + index];

    if (/[.!?]["')\]]*$/.test(word)) {
      chosenLength = index + 1;
      break;
    }

    if (/[;:]["')\]]*$/.test(word) && index >= 1) {
      chosenLength = index + 1;
      break;
    }

    if (/[,]["')\]]*$/.test(word) && index >= 2) {
      chosenLength = index + 1;
      break;
    }
  }

  return Math.max(1, chosenLength);
}

function stopPlayback() {
  if (state.timerId) {
    window.clearTimeout(state.timerId);
    state.timerId = null;
  }

  updatePlaybackButtons();
}

function stepReader() {
  const baseChunkSize = Number(chunkSizeInput.value);
  const isTypewriterMode = readingModeInput.value === "typewriter";

  if (state.pointer >= state.words.length) {
    stopPlayback();
    readerDisplay.textContent = "Finished";
    readerDisplay.classList.remove("reader-display-typewriter");
    progressBar.style.width = "100%";
    return;
  }

  const chunkLength = isTypewriterMode ? 1 : getAdaptiveChunkLength(state.pointer, baseChunkSize);
  const wpm = Number(wpmInput.value);
  const interval = Math.max(60, Math.round((chunkLength / wpm) * 60000));

  if (isTypewriterMode) {
    state.pointer += chunkLength;
    updateReader(state.pointer, chunkLength);
  } else {
    updateReader(state.pointer, chunkLength);
    state.pointer += chunkLength;
  }
  state.timerId = window.setTimeout(stepReader, interval);
  updatePlaybackButtons();
}

function startPlayback() {
  if (!state.words.length || state.timerId) {
    return;
  }

  readerPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  stepReader();
}

function loadCleanedText() {
  stopPlayback();
  const cleaned = sanitizeText(sourceText.value);
  sourceText.value = cleaned;
  state.words = tokenize(cleaned);
  state.pointer = 0;

  cleanStatus.textContent = state.words.length
    ? `Prepared ${state.words.length} words for reading.`
    : "No readable text found yet.";

  wordCount.textContent = String(state.words.length);
  durationText.textContent = formatDuration(state.words.length, Number(wpmInput.value));
  updateReader();
}

// Event bindings

cleanBtn.addEventListener("click", () => {
  const cleaned = sanitizeText(sourceText.value);
  sourceText.value = cleaned;
  const preparedWords = tokenize(cleaned).length;
  cleanStatus.textContent = preparedWords
    ? `Formatting cleaned. ${preparedWords} words remain.`
    : "Text was cleaned, but no readable words remain.";
  wordCount.textContent = String(preparedWords);
  durationText.textContent = formatDuration(preparedWords, Number(wpmInput.value));
});

readerWorkspaceBtn.addEventListener("click", () => {
  setWorkspace("reader");
});

flashcardsWorkspaceBtn.addEventListener("click", () => {
  setWorkspace("flashcards");
});

loadBtn.addEventListener("click", loadCleanedText);
startBtn.addEventListener("click", startPlayback);
pauseBtn.addEventListener("click", stopPlayback);
readerFullscreenBtn.addEventListener("click", () => {
  enterFullscreenFor(readerPanel);
});
readerToggleBtn.addEventListener("click", () => {
  if (state.timerId) {
    stopPlayback();
    return;
  }

  startPlayback();
});
resetBtn.addEventListener("click", () => {
  stopPlayback();
  state.pointer = 0;
  updateReader(0, Number(chunkSizeInput.value));
});

chunkSizeInput.addEventListener("input", () => {
  updateControlLabels();
  updateReader();
});

wpmInput.addEventListener("input", updateControlLabels);
readingModeInput.addEventListener("change", () => {
  stopPlayback();
  state.pointer = 0;
  updateControlLabels();
  updateReader(0, Number(chunkSizeInput.value));
});

sourceText.addEventListener("paste", () => {
  window.setTimeout(() => {
    cleanStatus.textContent = "Pasted text detected. Clean it when you're ready.";
  }, 0);
});

flashcardRevealBtn.addEventListener("click", () => {
  if (flashcardModeInput.value === "brainwash" && state.flashcardRunning) {
    return;
  }

  state.flashcardRevealed = !state.flashcardRevealed;
  flashcardDefinition.classList.toggle("flashcard-definition-hidden", !state.flashcardRevealed);
  flashcardRevealBtn.textContent = state.flashcardRevealed ? "Hide" : "Reveal";
  fitFlashcardText();
});

flashcardPrevBtn.addEventListener("click", () => {
  showFlashcard(state.flashcardIndex - 1);
});

flashcardNextBtn.addEventListener("click", () => {
  showFlashcard(state.flashcardIndex + 1);
});

flashcardShuffleBtn.addEventListener("click", shuffleFlashcards);
flashcardsFullscreenBtn.addEventListener("click", () => {
  enterFullscreenFor(flashcardsWorkspace);
});
flashcardStartBtn.addEventListener("click", startFlashcardSession);
flashcardRestartBtn.addEventListener("click", restartFlashcardSession);
flashcardPauseBtn.addEventListener("click", () => {
  stopFlashcardPlayback();
  flashcardStatus.textContent = flashcardModeInput.value === "brainwash"
    ? "Brainwash paused."
    : "Quiz paused.";
  updateFlashcardControls();
});
flashcardRightBtn.addEventListener("click", () => {
  scoreFlashcard("right");
});
flashcardWrongBtn.addEventListener("click", () => {
  scoreFlashcard("wrong");
});

flashcardModeInput.addEventListener("change", () => {
  stopFlashcardPlayback();
  state.flashcardRevealed = false;
  renderFlashcard();
});

flashcardDeckInput.addEventListener("change", () => {
  setFlashcardDeck(flashcardDeckInput.value);
});

randomMixSourceInput.addEventListener("change", () => {
  if (state.activeDeckKey === "random") {
    setFlashcardDeck("random");
  }

  updateFlashcardControls();
});

brainwashOrderInput.addEventListener("change", updateFlashcardControls);
brainwashDisplayModeInput.addEventListener("change", updateFlashcardControls);
brainwashTermSpeedInput.addEventListener("input", updateFlashcardControls);
brainwashDefinitionSpeedInput.addEventListener("input", updateFlashcardControls);
brainwashTypewriterSpeedInput.addEventListener("input", updateFlashcardControls);
quizPromptSideInput.addEventListener("change", updateFlashcardControls);
quizGuessSecondsInput.addEventListener("input", updateFlashcardControls);

flashcardList.addEventListener("click", (event) => {
  const target = event.target.closest("[data-flashcard-index]");
  if (!target) {
    return;
  }

  showFlashcard(Number(target.dataset.flashcardIndex));
});

document.addEventListener("fullscreenchange", () => {
  updateFullscreenButtons();

  if (!document.fullscreenElement) {
    fullscreenHint.classList.remove("fullscreen-hint-visible");
    if (state.fullscreenHintTimerId) {
      window.clearTimeout(state.fullscreenHintTimerId);
      state.fullscreenHintTimerId = null;
    }
  }
});

window.addEventListener("resize", fitFlashcardText);

// Startup

updateControlLabels();
updateReader(0, Number(chunkSizeInput.value));
updatePlaybackButtons();
updateFlashcardControls();
updateFullscreenButtons();
setFlashcardDeck("cybersecurity");
setWorkspace("reader");

