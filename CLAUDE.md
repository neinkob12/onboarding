# Claude Code Instructions

## Before doing anything

Read `TECH_STACK.md` first. It defines the tools, libraries, and conventions for this project. Follow it exactly.

## House rules

- If you need a tool not in TECH_STACK.md, add it and update TECH_STACK.md in the same commit. Flag major architectural changes before making them.
- Do not introduce TypeScript. This is plain JSX throughout.
- Do not create `/utils`, `/services`, or `/types` folders. Shared logic goes in `/lib`.
- Do not write business logic in `/pages`. Pages are thin: composition and data fetching only.
- Keep components small. If a file exceeds ~150 lines, split it.
- The Anthropic API key must never appear client-side. It only lives in `/api` serverless functions.
- All Supabase tables must have Row Level Security enabled.

## Design system

This project follows Apple-like design principles:

- Background: `#FFFFFF` page, `#F5F5F7` section cards
- Text: `#1D1D1F` primary, `#6E6E73` secondary
- Accent: `#0071E3` (Apple blue)
- Success: `#34C759`, Error: `#FF3B30`
- Font: `system-ui, -apple-system, 'Helvetica Neue', sans-serif`
- Border radius: `12px` cards, `8px` inputs, `20px` chips
- Shadows: `0 1px 3px rgba(0,0,0,0.08)` only, never heavy
- Transitions: `200ms ease` on all interactive elements
- No gradients. No decorative borders. Generous whitespace.

## Communication

- Be direct. Push back when something seems off.
- Do not use em dashes anywhere in code comments or generated copy.
- When uncertain, ask one focused question rather than guessing.
- When a phase is complete, summarise what was built in three bullet points max.
