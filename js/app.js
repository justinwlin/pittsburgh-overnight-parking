(function () {
  "use strict";

  var guide = window.GUIDE;
  if (!guide || !Array.isArray(guide.hotels)) {
    return;
  }

  var markers = Object.create(null);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function safeUrl(url) {
    if (typeof url !== "string") return "";
    if (/^https:\/\//i.test(url)) return url;
    if (/^tel:\+?[0-9]+$/i.test(url)) return url;
    if (/^sms:\+?[0-9]+$/i.test(url)) return url;
    return "";
  }

  function link(href, label) {
    var url = safeUrl(href);
    if (!url) return escapeHtml(label);
    var external = url.indexOf("http") === 0;
    var attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<a href="' + escapeHtml(url) + '"' + attrs + ">" + escapeHtml(label) + "</a>";
  }

  function money(amount) {
    return "$" + Math.round(amount).toLocaleString("en-US");
  }

  function points(amount) {
    return Math.round(amount).toLocaleString("en-US");
  }

  function pointLine(low, high) {
    var base = guide.points.base;
    var boost = guide.points.boost;
    if (high == null) {
      return (
        points(low * base) +
        " pts at ×" +
        base +
        " base · " +
        points(low * boost) +
        " pts at ×" +
        boost +
        " Points Boost"
      );
    }
    return (
      points(low * base) +
      "–" +
      points(high * base) +
      " pts at ×" +
      base +
      " base · " +
      points(low * boost) +
      "–" +
      points(high * boost) +
      " pts at ×" +
      boost +
      " Points Boost"
    );
  }

  function list(items) {
    return (
      "<ul>" +
      items
        .map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function sourceList(sources) {
    return (
      '<ul class="sources">' +
      sources
        .map(function (source) {
          return "<li>" + link(source.href, source.label) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function renderLede() {
    var el = document.getElementById("lede");
    if (el && guide.lede) el.textContent = guide.lede;
  }

  function priceForRoom(room) {
    if (room.bands) {
      return room.bands
        .map(function (band) {
          return band.label + " " + money(band.usd);
        })
        .join(" · ");
    }
    if (room.amount != null) return money(room.amount) + (room.suffix || "");
    return money(room.low) + "–" + money(room.high) + " / night";
  }

  function pointsForRoom(room) {
    if (room.bands) {
      return room.bands
        .map(function (band) {
          return band.label + ": " + pointLine(band.usd);
        })
        .join(" ");
    }
    if (room.amount != null) return pointLine(room.amount);
    return pointLine(room.low, room.high);
  }

  function renderShort() {
    var rec = guide.recommendation;
    var choices = rec.choices
      .map(function (choice) {
        return (
          '<a class="choice" href="#hotel-' +
          escapeHtml(choice.hotelId) +
          '">' +
          '<p class="kicker">' +
          escapeHtml(choice.kicker) +
          "</p>" +
          "<h3>" +
          escapeHtml(choice.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(choice.text) +
          "</p>" +
          "</a>"
        );
      })
      .join("");

    document.getElementById("short").innerHTML =
      '<p class="kicker">' +
      escapeHtml(rec.kicker) +
      "</p>" +
      '<h2 id="short-title">' +
      escapeHtml(rec.heading) +
      "</h2>" +
      '<div class="choices">' +
      choices +
      "</div>" +
      '<p class="note">' +
      escapeHtml(rec.note) +
      "</p>" +
      '<div class="read-numbers"><h3>How to read the numbers</h3>' +
      list(guide.priceNotes) +
      '<p class="checked">Sources checked ' +
      escapeHtml(guide.checkedLabel) +
      ".</p></div>";
  }

  function renderMapSection() {
    var count = guide.hotels.length;
    document.getElementById("map-section").innerHTML =
      '<div class="section-head"><p class="kicker">Map</p><h2>' +
      count +
      " hotels, one pin each</h2></div>" +
      '<div id="map" role="region" aria-label="Map of the hotels"></div>' +
      '<p class="map-note">' +
      escapeHtml(guide.mapNote) +
      "</p>" +
      '<div class="map-keys" id="map-keys"></div>';
  }

  function safeSrc(url) {
    if (typeof url !== "string") return "";
    if (/^https:\/\//i.test(url)) return url;
    if (/^assets\/[a-z0-9][a-z0-9._/-]*$/i.test(url)) return url;
    return "";
  }

  function carouselHtml(hotel) {
    var slides = hotel.gallery || [];
    if (!slides.length && hotel.photo) {
      slides = [
        {
          src: hotel.photo.src,
          alt: hotel.photo.alt,
          category: "Exterior",
          credit: hotel.photo.credit,
          creditHref: hotel.photo.creditHref,
        },
      ];
    }
    var figures = slides
      .map(function (slide, index) {
        return (
          '<figure class="slide">' +
          '<img src="' +
          escapeHtml(safeSrc(slide.src)) +
          '" alt="' +
          escapeHtml(slide.alt) +
          '" ' +
          (index === 0 ? "" : 'loading="lazy" ') +
          'decoding="async">' +
          "<figcaption><span class=\"cat\">" +
          escapeHtml(slide.category) +
          "</span> " +
          link(slide.creditHref, slide.credit) +
          "</figcaption></figure>"
        );
      })
      .join("");
    var dots = slides
      .map(function (slide, index) {
        return (
          '<button type="button" class="dot" data-go="' +
          index +
          '" aria-label="Show photo ' +
          (index + 1) +
          " of " +
          slides.length +
          ", " +
          escapeHtml(slide.category) +
          '"></button>'
        );
      })
      .join("");
    var street = "";
    if (hotel.streetView) {
      street =
        '<p class="streetview">' +
        link(hotel.streetView.href, hotel.streetView.label) +
        ". " +
        escapeHtml(hotel.streetView.note) +
        "</p>";
    }
    return (
      '<div class="carousel" data-carousel tabindex="0" role="region" aria-roledescription="carousel" aria-label="' +
      escapeHtml(hotel.shortName) +
      ' photos">' +
      '<div class="carousel-viewport"><div class="carousel-track">' +
      figures +
      "</div></div>" +
      '<button type="button" class="car-btn car-prev" aria-label="Previous photo">‹</button>' +
      '<button type="button" class="car-btn car-next" aria-label="Next photo">›</button>' +
      '<div class="car-dots" role="group" aria-label="Photo choices">' +
      dots +
      "</div>" +
      street +
      "</div>"
    );
  }

  function ratingBlock(hotel) {
    var r = hotel.reviews;
    if (!r) return "";
    var themes = (r.themes || [])
      .map(function (theme) {
        return "<li>" + escapeHtml(theme) + "</li>";
      })
      .join("");
    var google = hotel.google || {};
    var googleBlock = google.verified
      ? '<p class="score">' +
        escapeHtml(Number(google.score).toFixed(1)) +
        '<span>/5</span></p><p>Google · ' +
        Number(google.count).toLocaleString("en-US") +
        " ratings</p><p>" +
        link(google.href, "Google Maps") +
        "</p>"
      : '<p class="score score-missing">Not verified</p><p>Google · ' +
        link(google.href || hotel.mapsUrl, google.label || "Not verified—open Maps") +
        "</p>";
    return (
      '<section class="scorecard"><h3>Guest ratings</h3>' +
      '<div class="score-pair">' +
      '<div><p class="score">' +
      escapeHtml(String(r.score)) +
      '<span>/5</span></p><p>TripAdvisor · ' +
      Number(r.count).toLocaleString("en-US") +
      " reviews</p><p>" +
      link(r.href, "TripAdvisor page") +
      "</p><p class=\"checked\">Checked " +
      escapeHtml(r.checked) +
      ".</p></div>" +
      "<div>" +
      googleBlock +
      '<p class="checked">Checked ' +
      escapeHtml(google.checked || "") +
      ".</p></div></div>" +
      "<ul>" +
      themes +
      "</ul><p class=\"checked\">" +
      escapeHtml(r.limit) +
      "</p></section>"
    );
  }

  function renderRatings() {
    var table = guide.ratingTable;
    var root = document.getElementById("ratings");
    if (!table || !root) return;
    var byId = {};
    guide.hotels.forEach(function (hotel) {
      byId[hotel.id] = hotel;
    });
    var rows = table.rows
      .map(function (row) {
        var hotel = byId[row.hotelId];
        var google = (hotel && hotel.google) || {};
        var googleCell = google.verified
          ? escapeHtml(Number(google.score).toFixed(1)) +
            "/5 · " +
            Number(google.count).toLocaleString("en-US") +
            "<br>" +
            link(google.href, "Google Maps")
          : link(google.href, google.label || "Not verified—open Maps");
        return (
          "<tr><td>" +
          escapeHtml(row.place) +
          "</td><td><a href=\"#hotel-" +
          escapeHtml(row.hotelId) +
          "\">" +
          escapeHtml(hotel ? hotel.shortName : row.hotelId) +
          "</a></td><td>" +
          escapeHtml(row.score) +
          "</td><td>" +
          Number(row.count).toLocaleString("en-US") +
          "</td><td>" +
          escapeHtml(row.googlePlace || "") +
          "</td><td>" +
          googleCell +
          "</td></tr>"
        );
      })
      .join("");
    root.innerHTML =
      '<div class="section-head"><p class="kicker">' +
      escapeHtml(table.kicker) +
      "</p><h2>" +
      escapeHtml(table.heading) +
      "</h2></div><p>" +
      escapeHtml(table.note) +
      '</p><div class="table-wrap"><table class="rank"><thead><tr><th>TripAdvisor place</th><th>Hotel</th><th>TripAdvisor</th><th>TA reviews</th><th>Google place</th><th>Google</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div><p class=\"checked\">TripAdvisor checked " +
      escapeHtml(table.checked) +
      ". Google checked " +
      escapeHtml(table.googleChecked) +
      ".</p>";
  }

  function orderedHotels() {
    return guide.hotels.slice().sort(function (a, b) {
      return a.number - b.number;
    });
  }

  function renderHotels() {
    var html = orderedHotels()
      .map(function (hotel) {
        var banner = hotel.parking.banner
          ? '<aside class="tradeoff"><p>' + escapeHtml(hotel.parking.banner) + "</p></aside>"
          : "";
        var feePoints =
          hotel.parking.feeUsd == null
            ? ""
            : '<p class="points">' +
              escapeHtml(pointLine(hotel.parking.feeUsd)) +
              ". Math only. Parking may not be redeemable.</p>";
        return (
          '<article class="hotel" id="hotel-' +
          escapeHtml(hotel.id) +
          '" data-hotel="' +
          escapeHtml(hotel.id) +
          '">' +
          '<div class="hotel-top"><p class="kicker">Pin ' +
          hotel.number +
          " · " +
          escapeHtml(hotel.neighborhood) +
          "</p>" +
          '<p class="pick">' +
          escapeHtml(hotel.pick) +
          "</p></div>" +
          "<h2>" +
          escapeHtml(hotel.name) +
          "</h2>" +
          '<p class="address">' +
          escapeHtml(hotel.address) +
          "</p>" +
          carouselHtml(hotel) +
          ratingBlock(hotel) +
          '<div class="split">' +
          "<section><h3>Room range</h3>" +
          '<p class="price">' +
          escapeHtml(priceForRoom(hotel.room)) +
          "</p>" +
          '<p class="points">' +
          escapeHtml(pointsForRoom(hotel.room)) +
          "</p>" +
          "<p>" +
          link(hotel.room.sourceHref, hotel.room.sourceLabel) +
          ". " +
          escapeHtml(hotel.room.note) +
          "</p></section>" +
          "<section><h3>Parking</h3>" +
          banner +
          "<p><strong>" +
          escapeHtml(hotel.parking.headline) +
          "</strong></p>" +
          "<p>" +
          escapeHtml(hotel.parking.feeLabel) +
          "</p>" +
          feePoints +
          list(hotel.parking.facts) +
          '<h4>Before you rely on it</h4>' +
          list(hotel.parking.caveats) +
          "</section></div>" +
          '<section class="walk"><h3>Hotel-to-car note</h3><p>' +
          escapeHtml(hotel.safety) +
          "</p></section>" +
          "<section><h3>Sources</h3>" +
          sourceList(hotel.sources) +
          "<p>" +
          link(hotel.geo.href, hotel.geo.label) +
          ". " +
          escapeHtml(hotel.geo.detail) +
          "</p>" +
          '<p class="checked">Checked ' +
          escapeHtml(guide.checkedLabel) +
          ".</p></section>" +
          '<div class="actions">' +
          '<button type="button" class="show-map" data-hotel="' +
          escapeHtml(hotel.id) +
          '">Show pin ' +
          hotel.number +
          "</button>" +
          link(hotel.mapsUrl, "Open in Google Maps") +
          "</div></article>"
        );
      })
      .join("");

    document.getElementById("hotels").innerHTML =
      '<div class="section-head"><p class="kicker">Hotels</p><h2>What you are actually parking in</h2></div>' +
      html;
  }

  function renderSafety() {
    var safety = guide.safety;
    var help = safety.assistance;
    var groups = (safety.reports.groups || [])
      .map(function (group) {
        return (
          "<h3>" +
          escapeHtml(group.title) +
          "</h3><p>" +
          escapeHtml(group.text) +
          "</p>" +
          sourceList(group.sources || [])
        );
      })
      .join("");

    document.getElementById("safety").innerHTML =
      '<div class="section-head"><p class="kicker">Safety</p><h2>' +
      escapeHtml(safety.heading) +
      "</h2></div>" +
      "<p>" +
      escapeHtml(safety.lede) +
      "</p>" +
      "<h3>Practical steps</h3>" +
      list(safety.practical) +
      "<h3>" +
      escapeHtml(help.name) +
      "</h3>" +
      "<p><strong>" +
      escapeHtml(help.hours) +
      ".</strong> " +
      escapeHtml(help.text) +
      " " +
      link(help.phoneHref, "Call " + help.phone) +
      " · " +
      link(help.textHref, "Text " + help.phone) +
      " · " +
      link("tel:911", "Call 911") +
      "</p>" +
      sourceList(help.sources) +
      '<details class="reports"><summary>' +
      escapeHtml(safety.reports.summary) +
      "</summary>" +
      "<p>" +
      escapeHtml(safety.reports.window) +
      "</p>" +
      groups +
      list(safety.reports.limits) +
      sourceList(safety.reports.sources || []) +
      "</details>";
  }

  function renderNotListed() {
    var block = guide.notListed;
    var places = block.places
      .map(function (place) {
        return (
          "<li><strong>" +
          escapeHtml(place.name) +
          ".</strong> " +
          escapeHtml(place.text) +
          sourceList(place.sources) +
          "</li>"
        );
      })
      .join("");
    document.getElementById("not-listed").innerHTML =
      '<div class="section-head"><p class="kicker">Not listed</p><h2>' +
      escapeHtml(block.heading) +
      "</h2></div>" +
      "<p>" +
      escapeHtml(block.lede) +
      "</p><ul class=\"places\">" +
      places +
      "</ul>";
  }

  function renderFooter() {
    var year = guide.checked.slice(0, 4);
    document.getElementById("checked-line").textContent =
      "Checked " + guide.checkedLabel + ".";
    document.getElementById("footer-note").innerHTML =
      "Public planning notes for one night in Pittsburgh. No booking, no account, no tracking. Map data © " +
      link("https://www.openstreetmap.org/copyright", "OpenStreetMap") +
      " contributors. " +
      year +
      ".";
  }

  function bindCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
      var track = root.querySelector(".carousel-track");
      var slides = root.querySelectorAll(".slide");
      var dots = root.querySelectorAll(".dot");
      var index = 0;
      if (!slides.length) return;
      function show(next) {
        index = (next + slides.length) % slides.length;
        track.style.transform = "translateX(" + -index * 100 + "%)";
        dots.forEach(function (dot, i) {
          var on = i === index;
          dot.classList.toggle("is-active", on);
          dot.setAttribute("aria-current", on ? "true" : "false");
        });
      }
      root.querySelector(".car-prev").addEventListener("click", function () {
        show(index - 1);
      });
      root.querySelector(".car-next").addEventListener("click", function () {
        show(index + 1);
      });
      dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          show(Number(dot.getAttribute("data-go")));
        });
      });
      root.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          show(index - 1);
          event.preventDefault();
        } else if (event.key === "ArrowRight") {
          show(index + 1);
          event.preventDefault();
        }
      });
      var startX = null;
      root.querySelector(".carousel-viewport").addEventListener("pointerdown", function (event) {
        startX = event.clientX;
      });
      root.querySelector(".carousel-viewport").addEventListener("pointerup", function (event) {
        if (startX == null) return;
        var delta = event.clientX - startX;
        if (Math.abs(delta) > 40) show(delta < 0 ? index + 1 : index - 1);
        startX = null;
      });
      slides.forEach(function (slide) {
        var img = slide.querySelector("img");
        img.addEventListener("error", function () {
          img.replaceWith(document.createTextNode("This photo did not load."));
        });
      });
      show(0);
    });
  }

  function renderCrimeMaps() {
    var block = guide.crimeMaps;
    var root = document.getElementById("crime-maps");
    if (!block || !root) return;
    root.innerHTML =
      '<div class="section-head"><p class="kicker">Not the hotel map</p><h2>' +
      escapeHtml(block.heading) +
      "</h2></div><p>" +
      escapeHtml(block.lede) +
      "</p>" +
      sourceList(block.links) +
      list(block.notes);
  }

  function popupHtml(hotel) {
    return (
      '<div class="popup"><p class="popup-kicker">Pin ' +
      hotel.number +
      " · " +
      escapeHtml(hotel.neighborhood) +
      "</p><p class=\"popup-title\">" +
      escapeHtml(hotel.shortName) +
      "</p><p>" +
      escapeHtml(hotel.address) +
      "</p><p>" +
      escapeHtml(hotel.parking.headline) +
      '</p><p class="popup-actions">' +
      link(hotel.mapsUrl, "Open in Google Maps") +
      "</p></div>"
    );
  }

  function initMap() {
    var map = L.map("map", {
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var bounds = [];
    var keys = [];
    orderedHotels().forEach(function (hotel) {
      if (!Number.isFinite(hotel.lat) || !Number.isFinite(hotel.lon)) return;
      var icon = L.divIcon({
        className: "pin",
        html: "<span>" + hotel.number + "</span>",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -14],
      });
      var marker = L.marker([hotel.lat, hotel.lon], {
        icon: icon,
        title: hotel.shortName,
        alt: "Pin " + hotel.number + ", " + hotel.shortName,
      })
        .addTo(map)
        .bindPopup(popupHtml(hotel), { maxWidth: 260, minWidth: 180 });
      markers[hotel.id] = marker;
      bounds.push([hotel.lat, hotel.lon]);
      keys.push(
        '<a href="#hotel-' +
          escapeHtml(hotel.id) +
          '"><span>' +
          hotel.number +
          "</span>" +
          escapeHtml(hotel.shortName) +
          "</a>"
      );
    });
    document.getElementById("map-keys").innerHTML = keys.join("");

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 15 });
    }

    document.querySelectorAll(".show-map").forEach(function (button) {
      button.addEventListener("click", function () {
        var hotelId = button.getAttribute("data-hotel");
        var marker = markers[hotelId];
        document.getElementById("map-section").scrollIntoView({ behavior: "smooth", block: "start" });
        if (!marker) return;
        map.setView(marker.getLatLng(), 15, { animate: false });
        marker.openPopup();
      });
    });

    map.on("popupopen", function (event) {
      var linkEl = event.popup.getElement().querySelector("a");
      if (linkEl) linkEl.focus();
    });
  }

  renderLede();
  renderShort();
  renderRatings();
  renderMapSection();
  renderHotels();
  renderSafety();
  renderCrimeMaps();
  renderNotListed();
  renderFooter();
  bindCarousels();
  initMap();
})();
