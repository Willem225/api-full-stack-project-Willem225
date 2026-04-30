# CZN Deck Builder

A deck builder for **Chaos Zero Nightmare** with a live **Faint Memory** calculator that mirrors the in-game rules, local "accounts" for saving decks, **and a JSON REST API** for programmatic access.

- **Live site:** https://bt-wd.github.io/api-full-stack-project-Willem225/
- **API base:** https://&lt;your-cloudflare-pages-deployment&gt;.pages.dev/api/ (see *Deploying the API* below)

## Faint Memory rules

Encoded in `js/faintMemory.js` (shared with `POST /api/calculate`).

| Element                                     | Cost                                              |
|---------------------------------------------|---------------------------------------------------|
| Unique / Character card                     | 0 pts                                             |
| Neutral card                                | 20 pts                                            |
| Forbidden card                              | 20 pts                                            |
| Monster Common                              | 20 pts                                            |
| Monster Rare                                | 50 pts                                            |
| Monster Legendary                           | 80 pts                                            |
| Epiphany (unique card)                      | 0 pts (free)                                      |
| Divine Epiphany (unique card)               | +20 pts                                           |
| Epiphany (neutral/forbidden/monster)        | +10 pts                                           |
| Divine Epiphany (neutral/forbidden/monster) | +30 pts                                           |
| Epiphany on a starter card                  | not allowed                                       |
| Duplicates (copy 1→4)                       | 0 / 0 / 40 / 40, max 4 copies                     |
| Starter card removal                        | 20 FM (flat, per starter)                         |
| Non-starter card removal                    | 0 FM (free)                                       |
| Tier cap                                    | 30 + 10 × (tier − 1), tiers 1..15; Nightmare +10  |
