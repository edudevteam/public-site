# Next Steps

## Tasks

1.[] Add screenshots for each project
2.[] Store in either R2 or public directory

3.[] Add projects developed for FundedYouth

4.[] Add Courses
5.[] Add GitHub Profile and LinkedIn - This is a portfolio site.

6.[x] Add to cloudflare.

7.[x] Add Favicon - Create Mixture of Shapes Logo

# Prompt for Projects

Read this project and write the copy for its page on our project site, plus its GitHub "About" text and topics. This is read-only: don't change any files, run a build, install anything or bump a version.

## Who the copy is for

People browsing our project site who have never seen this project or its code, including teachers and hobbyists. Write in plain words. Name features by what the user sees and does, not by function, file or component names. Keep sentences short and concrete. Don't use marketing words ("powerful", "seamless", "blazing", "robust").

## What to read first

1. The package or build manifest (package.json, pyproject.toml, Cargo.toml, go.mod, etc.) for the language, frameworks and main libraries.
2. The README, CHANGELOG, any CLAUDE.md and any docs/ folder, for what the project does and what has shipped.
3. The source folders, enough to confirm each feature you plan to describe and to find shipped features the docs leave out.

## Rules

- Only describe features that exist in the code. Leave out anything planned, half-built or guessed.
- If the README, CHANGELOG and code disagree (defaults, limits, names), trust the code and note the mismatch at the end.
- A feature that only appears on screen, and isn't saved or exported, has to be described that way or left out. Don't suggest it ends up in the output.
- Only mention testing or verification if tests or checks exist in the repo. Say what they check.
- Leave out version numbers, and counts or measurements that are likely to change. Small, stable numbers are fine when they help a user (for example "one to four lanes").
- Leave out onboarding extras (welcome popups, tours, help videos) unless they're the point of the project.

## Output: in this order, one section per page area

### Category

One short label in capitals for the kind of project, e.g. `3D DESIGN & FABRICATION`.

### Title and tagline

- **Title:** the project's name as users see it (check the app's title, not only the repo name).
- **Tagline:** one sentence, around 25 words or fewer, saying what someone can make or do with it.

### Info strip

Four short label/value cells as a table. Default labels are Runs in / Install / Account / Exports (e.g. "Your browser" / "Nothing" / "Not needed" / "3MF · STL"). If a label doesn't fit the project, swap it for one that does (e.g. Platform, Works offline, Data, Input formats) and say that you swapped it.

### 01 — Overview

Two or three sentences: what it is, how it runs, and anything notable about setup or privacy (no install, no account, no server, works offline, data stays on your device).

### Built with

Up to 10 chips: the language, frameworks and major libraries a developer would recognise. Skip small utilities (zip, icons, lint, type packages).

### 02 — What you can do with it

Exactly 6 numbered items. Each has:

- a bold title in sentence case that names the task the user gets done, ending in a full stop (e.g. "Lay out a track by snapping pieces together.")
- one or two sentences of detail, around 40 words at most.

Group related settings into one item instead of listing each one. Order them from first use to finished result, and give the most distinctive or fun capability its own item.

### Tags

About 10–12 lowercase, hyphenated topics (50 characters max each) about the domain, purpose and file formats, not the stack. Show them as inline code chips, then again as one comma-separated line ready to paste into GitHub topics.

### 03 — Who it's for

Exactly 3 bullets, each naming a real kind of user and what they want, in one line. Don't add audiences the docs and code don't support.

### 04 — Under the hood

One paragraph of 4–6 sentences for a curious non-developer. Cover the approach that makes the project interesting and any testing or verification it does (only if it exists). End with one sentence: "Built with …" naming the main stack.

### GitHub About

One or two sentences, 350 characters max, saying what the project is and what someone can do with it.

### Notes

List anything you couldn't confirm, any mismatch between the docs and code, and any feature you left out and why. If there's nothing to report, write "None."
