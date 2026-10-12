# Contributing to Branchline

Thanks for helping. This project is meant to be friendly to people making their first pull request, so questions are welcome.

## Ways to help

- **Report a bug**, especially where a command behaves differently from real Git.
- **Suggest a lesson** that would have helped you when you were learning.
- **Add a command** the simulator doesn't support yet (see the roadmap in the issues).
- **Improve the wording** of an error message or mission.

## Your first pull request

1. Fork the repository and clone your fork.
2. Create a branch: `git switch -c fix-typo-in-mission-3`
3. Make your change. Everything lives in `index.html`.
4. Run the tests: `npm install && npm test`
5. Commit with a clear message: `git commit -am "Fix typo in mission 3"`
6. Push and open a pull request. Fill in the template.

## Commit messages

Write in the imperative and say what the commit does: `Add git restore support`, not `added stuff`. Keep the first line under about 70 characters.

## Code style

- Plain JavaScript, no dependencies, no build step.
- Keep the simulator's behavior and messages close to real Git. When they differ on purpose, add a line to `docs/known-differences.md`.
- Error messages should say what went wrong and how to fix it.
- Keep the page keyboard-accessible and readable on a phone.

## Adding a mission

Missions are the `MISSIONS` array in `index.html`. Each has an `id`, `title`, `body`, a list of `cmds`, a `hint`, and a `check()` function that returns true when the learner has finished it. Add a test to `tests/smoke.test.js` that proves the mission can be completed.

## Be kind

Assume good intent, explain your reasoning, and thank reviewers. Everyone here is learning.
