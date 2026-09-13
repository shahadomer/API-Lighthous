# Third-Party Licences and Font Attributions

This file documents third-party assets integrated into API Lighthouse (`apilh.com`), specifically typography and binary fonts, satisfying the acceptance criteria of DEV-04 and Section 3.3 of `Shahad-web-dev-plan.md`.

---

## 1. Inter (Variable Font)

- **Role:** Display, headings, body, and general UI typography
- **Source File:** `app/fonts/Inter-Variable.woff2` (Latin subset, variable weight axis 100–900)
- **Upstream Repository:** [https://github.com/rsms/inter](https://github.com/rsms/inter)
- **Distribution:** Google Fonts ([https://fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter))
- **Author:** Rasmus Andersson and the Inter Project Authors
- **Licence:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Licence Text / Rights:**
  Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the conditions of the SIL Open Font License, Version 1.1. The font software is provided "as is", without warranty of any kind.

---

## 2. JetBrains Mono (Variable Font)

- **Role:** Code blocks, API values, endpoints, HTTP methods, and monospace tokens
- **Source File:** `app/fonts/JetBrainsMono-Variable.woff2` (Latin subset, variable weight axis 100–800)
- **Upstream Repository:** [https://github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
- **Distribution:** Google Fonts ([https://fonts.google.com/specimen/JetBrains+Mono](https://fonts.google.com/specimen/JetBrains+Mono))
- **Author:** Philipp Nurullin, Konstantin Bulenkov, and the JetBrains Team
- **Licence:** SIL Open Font License, Version 1.1 (OFL-1.1)
- **Licence Text / Rights:**
  Copyright (c) 2020 JetBrains s.r.o.
  Licensed under the SIL Open Font License, Version 1.1. Allows free commercial and non-commercial bundling, embedding, web self-hosting, and redistribution.

---

## Summary of Critical Path Fonts

Per Section 3.3 and Section 15 of `Shahad-web-dev-plan.md`:

1. Only **two font files** are served in the critical rendering path: `Inter-Variable.woff2` and `JetBrainsMono-Variable.woff2`.
2. Both files are self-hosted locally under `app/fonts/` and configured via `next/font/local`.
3. Preloading and size-adjusted zero-layout-shift fallback stacks (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` for Inter; `ui-monospace, SFMono-Regular, Menlo, monospace` for JetBrains Mono) are enforced by the Next.js font pipeline.
