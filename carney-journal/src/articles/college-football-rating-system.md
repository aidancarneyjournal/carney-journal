---
layout: article.njk
title: "A 1–10 Rating System for College Football Players"
date: 2026-08-21
category: Sports Analytics
status: Working Paper
summary: "A first pass at a statistical distribution for scoring college football players on a simple 1–10 scale, and what it does and doesn't capture."
draft: false
---

This is the first working paper on this site, so a quick note before the analysis: I'm a
first-year college student, and this is an early, evolving model — not a finished or
peer-reviewed result. Treat the numbers below as illustrative rather than definitive. I'll
revise this page as the method improves.

## The problem

Player ratings in college football are usually either a single opaque number (recruiting
services) or a sprawling spreadsheet of per-play grades (coaching staffs). I wanted
something in between: a rating that's simple to read — one number, 1 to 10 — but built on
a transparent statistical distribution rather than a subjective grade.

## The approach

The starting point is a beta distribution fit to a player's per-snap performance metric
within their position group, then mapped onto a 1–10 scale so that a 5 represents a
league-average performance at that position and the tails compress toward the extremes.

<figure>
<div class="chart-container">
  <canvas id="ratingChart" height="260"></canvas>
</div>
<figcaption>Example: a simulated distribution of ratings for a single position group under the current model.</figcaption>
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

## A worked example

The table below shows how three hypothetical players at the same position would map from
raw per-snap metric to final 1–10 rating.

| Player | Raw metric (z-score) | Percentile | Rating |
|---|---|---|---|
| Player A | +1.8 | 96th | 8.7 |
| Player B | +0.2 | 58th | 5.4 |
| Player C | -1.1 | 14th | 3.1 |

## What this version does not do

- It does not yet adjust for strength of schedule.
- It treats each position group independently, so cross-position comparisons ("is this
  linebacker better than that receiver?") aren't meaningful yet.
- Snap counts below a minimum threshold are excluded, which likely underrates efficient
  backups.

These are the next things I plan to work on. If you have thoughts on any of this — especially
on the choice of the beta distribution or the percentile mapping — I'd like to hear them.
See the [Contact page](/contact/).
