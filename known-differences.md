# Known differences from real Git

Branchline teaches the ideas. It does not reproduce every detail.

- **Files are flat.** No folders and no `cd`.
- **Merges** compare files line by line only when the base, ours, and theirs have compatible shapes. Otherwise a whole-file conflict is reported. Real Git is smarter about inserted and moved lines.
- **Commit ids** are short, made-up identifiers. They are not real hashes.
- **`git push`** only records what a pretend remote has. It never contacts GitHub.
- **No** `stash`, `rebase`, `reset`, `tag`, `clone`, or `.gitignore` yet. These are good first issues.
- **Switching branches** refuses when local changes would be overwritten, but does not handle every edge case real Git does.
- **Author and dates** are placeholders.
