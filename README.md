# Branchline

A free, in-browser practice space for learning Git. You type real Git commands, and every commit becomes a station on a transit-style map of your history.

**Try it:** `https://YOUR-USERNAME.github.io/branchline/` (turn on GitHub Pages first, see below)

## Why I built it

I earned my GitHub Foundations certification and noticed that the hardest part for beginners isn't memorizing commands. It's picturing what Git is doing: where a file lives before and after `git add`, what a branch actually is, and why a merge conflict happens. Branchline shows all of that while you type.

<!-- Replace the paragraph above with your own words. Keep it true and specific to you. -->

## What it does

- Ten guided missions: init, stage, commit, branch, merge, fix a conflict, connect to GitHub, push
- A live commit map that grows with every commit, branch, and merge
- A three-part view of your files: working folder, staging area, and saved snapshot
- Plain-language error messages that say how to fix the problem
- Runs entirely in the browser. Nothing touches your computer.

## Commands it supports

| Area | Commands |
|---|---|
| Shell | `ls`, `cat`, `echo "text" > file`, `echo "text" >> file`, `touch`, `rm`, `clear`, `help` |
| Basics | `git init`, `status`, `add`, `commit` (`-m`, `-a`, `-am`), `log` (`--oneline`), `diff` (`--staged`) |
| Undo | `git restore`, `git restore --staged`, `git rm` |
| Branches | `git branch`, `branch -d`, `switch` (`-c`), `checkout` (`-b`), `merge`, `merge --abort` |
| GitHub | `git remote add`, `remote -v`, `push` (`-u`) |

It is a simulator, not a full Git. Merges work file by file with simple line-level conflict detection. Details that differ from real Git are listed in [`docs/known-differences.md`](docs/known-differences.md).

## Run it locally

No build step. Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Run the tests

```bash
npm install
npm test
```

The tests drive the page in a simulated browser and play through every mission.

## Publish it with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The `Deploy to GitHub Pages` workflow publishes the site on every push to `main`.

## Contributing

New lessons, bug reports, and command support are welcome. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md) and look for issues labeled `good first issue`.

## Teaching with it

Running a workshop? [`docs/workshop-plan.md`](docs/workshop-plan.md) is a 60-minute lesson plan that uses Branchline.

## License

MIT. See [`LICENSE`](LICENSE).
