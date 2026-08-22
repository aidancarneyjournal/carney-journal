---
layout: article.njk
title: "Test Paper"
date: 2026-08-21
category: Sports Analytics
status: Working Paper
summary: "Testing testing 1-2-3"
draft: false
---

Blah blah blah

## Paragraph I

bs bs bs

## Paragraph II

AI slop

<figure>
<div class="chart-container">
  <canvas id="ratingChart" height="260"></canvas>
</div>
<figcaption>This table is bullshit and AI slop</figcaption>
</figure>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script>
  (function () {
    var ctx = document.getElementById('ratingChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1–2', '2–3', '3–4', '4–5', '5–6', '6–7', '7–8', '8–9', '9–10'],
        datasets: [{
          label: 'Players',
          data: [3, 9, 22, 41, 58, 44, 24, 10, 3],
          backgroundColor: '#1D3557',
          borderRadius: 3,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: 'Rating band' } },
          y: { title: { display: true, text: 'Number of players' }, beginAtZero: true }
        }
      }
    });
  })();
</script>

## Paragraph 3

At least making tables is easy!

| Player | Raw metric (z-score) | Percentile | Rating |
|---|---|---|---|
| Player A | +1.8 | 96th | 8.7 |
| Player B | +0.2 | 58th | 5.4 |
| Player C | -1.1 | 14th | 3.1 |

## Paragraph 4

- This shows you how to use dots
- Pretty cool

And finally this shows how you link another page below.
See the [Contact page](/contact/).
