# CAIE 9618 Computer Science Revision Agent

A clickable Next.js MVP prototype for CAIE 9618 A-Level Computer Science revision.

The app uses mock JSON data only. It does not connect to OpenAI or a database yet.

## Pages

- `/` - home page with the start revision CTA
- `/topics` - topic list with available and coming soon topics
- `/revision/processor-fundamentals` - bilingual revision page, flowchart, quiz, and mock marking

## Key Files

- `data/caie9618.json` - mock course, topic, quiz, and marking data
- `components/TopicCard.tsx` - topic list card
- `components/KeyTermCard.tsx` - bilingual key term card
- `components/Flowchart.tsx` - fetch-execute cycle visual
- `components/QuizCard.tsx` - quick quiz interaction
- `components/PracticeSection.tsx` - student answer submission area
- `components/MarkingPanel.tsx` - mock mark scheme-style feedback

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
