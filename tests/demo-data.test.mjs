import { test } from "node:test";
import assert from "node:assert/strict";
import {
  cases,
  evidenceCount,
  fullTime,
  initialReview,
  makePacket,
  packetHtml,
  DEMO_LABEL,
} from "../src/data/demo.js";
import { products, allRoutes } from "../src/data/content.js";
test("five distinct quote scopes keep their amount and billing unit", () => {
  assert.equal(products.length, 5);
  assert.deepEqual(
    products.map((p) => [p.price, p.unit]),
    [
      ["$2,500", "/ case"],
      ["$700", "/ month / line"],
      ["$1,200", "/ month / line"],
      ["$1,000", "/ case"],
      ["$800", "/ month / site"],
    ],
  );
  assert.equal(new Set(products.map((p) => p.id)).size, 5);
  for (const p of products) assert.ok(allRoutes.includes("/products/" + p.id));
});
test("three cases retain fourteen timestamped observations and counterevidence", () => {
  assert.equal(cases.length, 3);
  assert.equal(evidenceCount, 14);
  const ids = [];
  for (const c of cases) {
    assert.ok(c.sources.some((s) => s.type === "inspection"));
    assert.ok(c.sources.some((s) => s.type === "counterexample"));
    let last = 0;
    for (const s of c.sources) {
      ids.push(s.id);
      const event = Date.parse(fullTime(c, s));
      assert.ok(event >= last);
      assert.ok(event < Date.parse(c.reviewAt));
      assert.ok(event < Date.parse(fullTime(c, s, 5)));
      assert.ok(Date.parse(fullTime(c, s, 5)) < Date.parse(fullTime(c, s, 6)));
      assert.ok(s.ref.startsWith("DEMO-"));
      assert.ok(s.locator);
      last = event;
    }
  }
  assert.equal(new Set(ids).size, 14);
});
test("missing supplier genealogy never becomes a selectable lot", () => {
  const c = cases[1];
  assert.equal(c.lot, "Unknown supplier lot");
  assert.deepEqual(c.sources.map((s) => s.lot).filter(Boolean), []);
  assert.match(c.gap, /absent/);
});
test("packet preserves review, source timestamps, contradictions and labels", () => {
  const c = cases[2],
    review = {
      ...initialReview(c),
      rationale: "Retain both counterexamples.",
      suspectLots: ["L88"],
      savedAt: "2026-10-24T00:00:00Z",
    };
  const p = makePacket(c, review);
  assert.equal(p.environment, DEMO_LABEL);
  assert.equal(p.observations.length, 6);
  assert.equal(p.review.reviewer, "Mara Vale — DEMO");
  assert.deepEqual(p.review.suspectLots, ["L88"]);
  assert.equal(p.version, "v2 — local review");
  assert.match(p.containment, /Not executed/);
  assert.ok(p.alternatives.every((x) => x.status !== "Confirmed"));
  const html = packetHtml(p);
  for (const s of p.observations) {
    assert.ok(html.includes(s.ref));
    assert.ok(html.includes(s.eventAt));
    assert.ok(html.includes(s.importedAt));
  }
  assert.ok(html.includes(DEMO_LABEL));
  assert.match(html, /not an authenticated signature/);
});
test("reviewer annotation cannot insert script into a portable HTML packet", () => {
  const p = makePacket(cases[0], {
    ...initialReview(cases[0]),
    rationale: '<script>alert("test")</script>',
  });
  const html = packetHtml(p);
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});
test("reset returns independent seed selections", () => {
  const c = cases[2],
    a = initialReview(c);
  a.suspectLots.push("L88");
  assert.deepEqual(initialReview(c).suspectLots, []);
  assert.equal(initialReview(c).savedAt, null);
});
