# P1 — Restore mobile dashboard vertical scrolling

## Status

Backlog / future fix. Reported during Organization switcher verification on
2026-08-25. This is intentionally separated from Authorization V1 work.

## Problem

At a mobile viewport, the dashboard cannot scroll vertically. The application
shell uses nested fixed-height and `overflow-hidden` containers, so dashboard
content extending below the viewport is unreachable on touch devices.

## Scope

- Diagnose the interaction between `DashboardClientShell`, the main content
  container, and dashboard-page overflow rules at mobile breakpoints.
- Restore normal vertical touch/wheel scrolling on mobile without introducing
  double scrollbars on desktop.
- Preserve fixed desktop sidebar/header behavior and print layouts.
- Check other long main routes so the fix is shell-wide rather than a
  dashboard-only workaround.

## Acceptance criteria

- The dashboard scrolls from top to bottom at common phone widths.
- Touch scrolling works in both portrait and landscape orientations.
- Mobile navigation drawer scrolling remains independent and functional.
- Desktop shell retains its intended fixed navigation and content behavior.
- No content is hidden behind the mobile header or viewport safe areas.
- Add a regression test or source-boundary assertion appropriate to the final
  implementation.

## Next Codex task

Implement this in a dedicated UI-fix branch after the current Authorization V1
membership milestone reaches its next checkpoint.
