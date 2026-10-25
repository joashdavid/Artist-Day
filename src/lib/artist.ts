// ─────────────────────────────────────────────────────────────
//  ✏️  TRIBUTE CONTENT — everything you might want to personalise
//  lives in this one file. The most important field is `name`:
//  put your artist's name there (e.g. name: "Meera") and the
//  whole site will address them personally. Leave it as "" and
//  the site gracefully falls back to "the artist".
// ─────────────────────────────────────────────────────────────

import artwork from "./artwork-images.json";

export const artist = {
  /** ✏️ CHANGE THIS: your artist's name — e.g. "Meera" */
  name: "Leann Isac",
  role: "Painter · Event Stylist",
  siteTitle: "The Atelier",
};

export const displayName = artist.name.trim();
export const toName = displayName || "dear artist";

export interface Artwork {
  src: string;
  title: string;
  medium: string;
  blurb: string;
  w: number;
  h: number;
}

export const paintings: Artwork[] = [
  {
    ...artwork["painting-1"],
    title: "The Patient Hour",
    medium: "Oil on canvas",
    blurb:
      "Rain drew long blue lines down the afternoon, and the gold flowers kept him company anyway.",
  },
  {
    ...artwork["painting-2"],
    title: "The Long Afternoon",
    medium: "Oil on canvas",
    blurb:
      "He lay with his memories spread out like laundry in the sun — each one aired, folded, and put gently back.",
  },
  {
    ...artwork["painting-3"],
    title: "The Garden Keeps Its Word",
    medium: "Oil on canvas",
    blurb:
      "Every clay pot on the step was a small green promise, watered each morning by unhurried hands.",
  },
  {
    ...artwork["painting-4"],
    title: "Where the River Learns to Run",
    medium: "Oil on canvas",
    blurb:
      "The water was in a hurry to reach the sea, but every stone it met insisted on becoming a story first.",
  },
  {
    ...artwork["painting-5"],
    title: "Green Rooms, Open Doors",
    medium: "Oil on canvas",
    blurb:
      "Past the hedges a cream house waited behind its arches, the way Sunday waits at the end of a long week.",
  },
  {
    ...artwork["painting-6"],
    title: "The Dream Answers on the Third Ring",
    medium: "Oil on canvas",
    blurb:
      "Losing your past self is a kind of death, but the dream is a kind of resurrection.)",
  },
  {
    ...artwork["painting-7"],
    title: "Candlelight for Ordinary Things",
    medium: "Oil on canvas",
    blurb:
      "One small flame made treasure of the clutter — blocks, borrowed flowers, a helmet home from work.",
  },
];

export interface EventShowcase {
  src: string;
  title: string;
  blurb: string;
  w: number;
  h: number;
}

export const events: EventShowcase[] = [
  {
    ...artwork["event-1"],
    title: "The Golden Hour Soirée",
    blurb:
      "Candlelight, cascading blooms and drapery that moved across the room like brushstrokes.",
  },
  {
    ...artwork["event-2"],
    title: "A Table Worth Painting",
    blurb:
      "Deep blues, violets and golds — a banquet table composed like a still life come to life.",
  },
  {
    ...artwork["event-3"],
    title: "Twilight in the Garden",
    blurb:
      "String lights, wildflowers and a night that felt less like décor and more like a painting you could walk into.",
  },
];

export const skills = [
  "Oil & Impasto",
  "Watercolour",
  "Floral Design",
  "Event Styling",
  "Palette Knife",
  "Light & Ambience",
  "Tablescapes",
  "Colour Alchemy",
];

export const stats = [
  { value: 100, suffix: "+", label: "Canvases painted" },
  { value: 50, suffix: "+", label: "Events styled" },
  { value: 0, suffix: "∞", label: "Dreams imagined", infinity: true },
];

export const marqueeWords = [
  "Painter",
  "Event Stylist",
  "Dreamer",
  "Colour Alchemist",
  "Storyteller",
  "Light Chaser",
];

export const navLinks = [
  { href: "#gallery", label: "The Gallery" },
  { href: "#artist", label: "The Artist" },
  { href: "#events", label: "Events" },
  { href: "#letter", label: "A Letter" },
];
