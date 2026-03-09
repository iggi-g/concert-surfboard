

## Problem

The `react-window` `List` component creates a fixed-height scrollable container (`height: calc(100vh - 200px)`) which produces a "box within a box" effect — users see a nested scrollbar inside the page instead of natural page scrolling. Additionally, the artist name area at the bottom of each card has excess padding.

## Plan

### 1. Replace `react-window` virtualized list with a native CSS grid in `EventsList.tsx`

- Remove the `react-window` `List` component and all related imports (`List`, `useDynamicRowHeight`, `CSSProperties`, `ReactElement`)
- Remove `RowComponent`, `RowProps` interface, `DESKTOP_ROW_HEIGHT`, `getColumnCount`, and `columnCount` state
- Replace with a simple CSS grid layout (same breakpoints as the loading skeleton already uses: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`)
- This restores natural page scrolling — no nested scroll container

### 2. Minimize the artist name area in `ConcertCard.tsx`

- Reduce bottom padding from `px-4 py-3` to `px-3 py-2`
- This makes cards more compact while keeping the artist name readable

### 3. Remove the card border/shadow "box" feel in `ConcertCard.tsx`

- Remove the Card wrapper's explicit background/border styling or simplify to a borderless, transparent card
- Change the Card class to remove `bg-ui-surface`, `border-ui-border`, and `shadow-card` so cards blend seamlessly into the page background
- Keep the hover scale effect for interactivity

These changes will give users seamless full-page scrolling with more compact, borderless concert cards.

