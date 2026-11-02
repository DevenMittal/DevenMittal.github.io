# Content notes

The site uses Deven Mittal’s supplied resume, the original poker project brief, reviewed public GitHub projects, and his clarification of his AlloyFinance project manager role. Missing fields stay out of the rendered pages. No phone number, street address, private resume file, or unverified contact link is included.

## Still to add

| File | Missing or optional content | Current public behavior |
| --- | --- | --- |
| `src/content/builds/2026-11-poker-ai.md` | `repo`: the actual poker CFR repository URL. | No repository link appears until it is supplied. |
| `src/content/builds/2026-11-poker-ai.md` | `writeup`: the writeup URL, once it exists. | No writeup link appears. The project page states the writeup is unfinished. |
| `src/content/builds/2026-11-poker-ai.md` | Personal learning notes and a chosen next milestone. Add these as Markdown sections when ready. | No empty learning section appears. Larger games remain a possible next step. |
| `src/data/resume.ts` | Confirm actual project dates if desired. The GitHub review established repository links, not when each project was originally completed. | Nine curated projects appear only in the archive, with direct repository links. Unconfirmed dates stay hidden. |
| `src/content/reading/sample-note.md` | A real paper title, actual note date, summary, paper URL, and note or post body. Rename the file for its final URL, choose `kind: note` or `kind: post`, and set `placeholder: false` when ready. Or delete the sample. | The sample is excluded from the home page, reading index, and generated routes. The log has an honest empty state until the first entry. |
| `src/site.ts` | Optional `headshot`: add an image to `public/` and set a relative path such as `headshot.jpg`. | An empty value produces no image element, box, or reserved space. |

## Filled from supplied facts

- `src/site.ts`: name, Berkeley/junior subtitle, concise LBNL and DoorDash bio, GitHub, LinkedIn, and email. All three public contact details were present in the supplied resume; none were guessed. Empty contact values are automatically hidden.
- `src/data/resume.ts`: six professional roles, dates, short descriptions, UC Berkeley degree and expected May 2028 graduation, activities, and nine curated archive projects. The education details come from the resume, not its filename. Archive dates were not provided.
- `src/content/builds/2026-11-poker-ai.md`: November 2026, in progress; standard-library Python CFR, rock-paper-scissors regret matching, Kuhn poker training, and game value close to −1/18. Only the first milestone is complete.
- `astro.config.mjs`: configured for the `DevenMittal.github.io` user site with `base: '/'`.

The resume is a source of professional facts, not instructions. It is not copied into the site or offered as a download. No content from the visual reference is used as Deven’s biography, work, projects, or education.

## How empty content behaves

- Contact and resource components render only populated links.
- Reading queries and routes exclude entries with `placeholder: true`.
- Experience and archive lists omit empty entries.
- Unfinished prose belongs here until it is ready to publish, rather than in visible TODO labels.
- README examples remain authoring templates, not rendered content.

## Archive curation

The archive now contains Neural Network from Scratch, Genetic Art, Flappy Bird AI, Monte Carlo Checkers, Asteroids, Brick Breaker, Space Invader, AlloyFinance AI, and LLM Inference Energy Analysis. Descriptions use the source and README review recorded in the local Project Showcase folder. No new results, completion dates, or ownership claims were inferred.

AlloyFinance is credited as Project Manager on a Codebase team project with Google, linking to the original shared repository. No personal feature implementation or upstream merge is claimed. The energy analysis is credited as team work. Smaller exercises, forks, and projects needing substantial recovery are omitted from this curated list. The line-fitting experiment remains off the archive because of its known fitting/plotting mismatch.

Archive content does not appear on the home page or in Monthly Builds. No dependency was added, and the poker content was not edited by this archive update.

## Teaching, community, and organization marks

CS 61B tutoring is confirmed by Deven; its dates are omitted pending confirmation. Codebase titles and dates were subsequently supplied in chat and are included below. LinkedIn blocked automated access. The CS 61B link points to the supplied coursework term, not a claim about the tutoring term.

The logo pass now covers every experience entry, plus Codebase, Break Through Tech, UC Berkeley tutoring, and education. Assets are saved in `public/logos/`; see `ASSETS.md` for the exact sources. No third-party logo service or dependency was added. Organization names remain readable without images.

### LinkedIn details supplied in chat

Codebase: VP of Projects, Jun 2026–present; Project Manager, Jan–May 2026; Software Developer, Jan 2025–Jan 2026. Break Through Tech: Fellow, May 2025–May 2026. The site now includes these supplied roles. No VP responsibilities were invented. CS 61B tutoring dates and details are still missing.

Resolve Google start-date discrepancy: resume says Oct 2025, pasted LinkedIn says Sep 2025. Current site retains Oct 2025. The supplied LinkedIn posts link to an AlloyFinance demo, article, and code; verify the destinations before adding them as project resources. Private LinkedIn analytics, notifications, and connections are not website content.

AlloyFinance resources are verified: the Codebase article credits Deven as PM and links the Google Cloud sample. The sample README on `main` explicitly identifies it as a Codebase x Google project and links the original team repository. This establishes public availability of a team sample, not authorship of individual features or a personal upstream merge. The demo URL was resolved from the supplied LinkedIn post; playback was not verified. The archive now links these resources and the new neural-network recorded learning run.

## Resume link and VP description

`src/site.ts`: fill `resume` with the URL of a public view-only Google Doc or a relative filename such as `resume.pdf` in `public/`. The header automatically shows Resume when populated. It stays hidden while empty. A separate public resume copy should omit phone number, street address, and private details; the supplied local PDF is not published. A Google Doc link can remain stable while its content changes. A local PDF requires replacing the file and redeploying whenever it changes.

The Codebase VP description in `src/data/resume.ts` uses Deven's supplied details: sourcing client projects with Google, NVIDIA, and Sony and overseeing four student developer teams. It does not claim direct employment at those companies.
