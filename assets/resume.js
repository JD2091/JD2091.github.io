/* ============================================================
   resume.html renders entirely from assets/data.js.
   Nothing here holds content — correct data.js and the resume,
   the site and the cover letters all move together.
   ============================================================ */

(function () {
  "use strict";

  var P = window.PROFILE;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function head() {
    var I = P.identity;
    $("rName").textContent = I.name;
    $("rRole").textContent = I.role + " — Intelligent & Agentic Automation";

    var bits = [
      I.location,
      I.phone,
      I.email,
      I.links.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      I.links.hashnode.replace(/^https?:\/\//, "")
    ];
    $("rContact").textContent = bits.join("  ·  ");
  }

  function summary() {
    $("rSummary").textContent = (P.resume && P.resume.summary) || P.positioning[0];
  }

  function skills() {
    var dl = $("rSkills");
    P.skills.forEach(function (s) {
      dl.appendChild(el("dt", null, s.group));
      dl.appendChild(el("dd", null, s.items.join(", ")));
    });
  }

  function experience() {
    var wrap = $("rExperience");
    P.experience.forEach(function (job) {
      var d = el("article", "cv-job");

      var top = el("div", "cv-job__top");
      top.appendChild(el("h3", null, job.title));
      top.appendChild(el("span", "cv-job__when", job.start + " – " + job.end));
      d.appendChild(top);

      d.appendChild(el("div", "cv-job__org",
        job.org + (job.location ? " · " + job.location : "")));

      var ul = el("ul");
      job.bullets.concat(job.resumeExtra || []).forEach(function (b) {
        ul.appendChild(el("li", null, b));
      });
      d.appendChild(ul);
      wrap.appendChild(d);
    });
  }

  function pairs(listId, rows) {
    var ul = $(listId);
    rows.forEach(function (r) {
      var li = el("li");
      li.appendChild(el("span", "cv-list__t", r[0]));
      li.appendChild(el("span", "cv-list__y", r[1]));
      ul.appendChild(li);
    });
  }

  function credentials() {
    pairs("rCerts", P.certifications.map(function (c) {
      return [c.name + (c.issuer ? ", " + c.issuer : ""), c.year];
    }));
    pairs("rEdu", P.education.map(function (e) {
      return [e.qualification + ", " + e.institute, e.year];
    }));
    pairs("rAwards", P.awards.map(function (a) {
      return [a.name + (a.org ? " — " + a.org : ""), a.year];
    }));
  }

  function init() {
    head();
    summary();
    skills();
    experience();
    credentials();
    $("exportPdf").addEventListener("click", function () { window.print(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
