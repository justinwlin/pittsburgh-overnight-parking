/* Factual source for the Pittsburgh overnight guide.
   Edit this file to change hotels, prices, parking, safety notes, or photos.
   To add a hotel, append an object to GUIDE.hotels. Give it a real lat/lon
   from one Nominatim or OpenStreetMap lookup (identify the request; do not
   invent a coordinate) and a real exterior photo. The map, cards, and points
   math all read this object. */
window.GUIDE = {
  checked: "2026-11-07",
  checkedLabel: "November 7, 2026",
  title: "Overnight parking on the way to Detroit",
  lede: "For a simple overnight on the way to Detroit: Pittsburgh Marriott North in Cranberry if an outdoor lot is acceptable. DoubleTree Downtown if a secured garage is nonnegotiable. Downtown is not labeled unsafe. No reservations on this page.",
  points: {
    base: 100,
    boost: 50,
  },
  /* hotels[].group is "downtown" or "highway".
     hotels[].parking.kind is "secured-garage" or "surface-lot".
     A surface-lot entry must include parking.tradeoff. The card shows that
     tradeoff and does not call the area safer. Append up to a few more
     objects; the map adds a pin whenever lat and lon are finite. */
  recommendation: {
    kicker: "The short version",
    heading: "Outdoor lot, or a secured garage",
    note: "People say downtown might not be safe. It would be misleading to call all of Pittsburgh, or all of Downtown, unsafe. A neighborhood count cannot tell you the risk at one hotel door. Marriott North avoids a downtown street walk by using the hotel’s own outdoor lot. That is a setting and parking tradeoff, not proof of lower theft risk. The Oaklander is the other non-downtown option: onsite valet in Oakland, with conflicting parking wording, so budget $50. Hilton Garden Inn Market Square stays as the secured self-park garage. No hotel-level comparison of crime was established.",
    choices: [
      {
        hotelId: "marriott-north",
        kicker: "If an outdoor lot is acceptable",
        title: "Pittsburgh Marriott North",
        text: "Cranberry Woods business park, near I-79, with onsite dining. Free uncovered self-parking on the hotel’s own lot. Not a secured garage.",
      },
      {
        hotelId: "doubletree",
        kicker: "If a secured garage is nonnegotiable",
        title: "DoubleTree Downtown",
        text: "Covered onsite garage, staffed 24 hours, valet, in-and-out included. Strongest verified garage. Not a verdict that downtown is unsafe.",
      },
    ],
  },
  priceNotes: [
    "DoubleTree, Hilton Garden Inn, and Oaklander room figures are Visit Pittsburgh’s “Average Room Rate.” Marriott North uses KAYAK’s average Sun–Thu and Fri–Sat prices over the last two weeks. None of these is a quote for particular dates or a check of availability. Taxes and fees are unspecified. KAYAK does not say whether tax is inside its average.",
    "Chase figures are arithmetic only: the dollar amount times 100 (base) and times 50 (Points Boost). They are not a guaranteed redemption. Parking may not be redeemable with points.",
    "A secured label is the source’s word. It is not a promise against theft. Bring valuables inside, including from an open lot.",
  ],
  safety: {
    heading: "Downtown is not a safety verdict",
    lede: "Hearing that downtown might not be safe is not a finding about these hotels. Downtown is not treated as inherently unsafe, and a suburban lot is not treated as safer. No hotel-level comparison of risk was established. Official counts below use different agencies and different rules, so they are not a ranking. Choose the arrival you want: an outdoor lot at the hotel, or a secured garage. Bring valuables inside either way.",
    practical: [
      "Arrive before late night when the drive allows.",
      "Unload at the hotel entrance, and at the DoubleTree use the valet point.",
      "Take luggage and anything you care about inside, including from a garage called secured.",
      "Lock the car and leave nothing visible.",
      "Use the direct hotel route. Skip shortcuts and quiet riverfront paths after dark.",
      "Ask the desk about events, closures, and how guests reach the garage that night.",
    ],
    assistance: {
      name: "Golden Triangle Ambassadors",
      hours: "Daily 7 a.m.–11 p.m. Eastern Time",
      phone: "412-855-6903",
      phoneHref: "tel:+14128556903",
      textHref: "sms:+14128556903",
      text: "Downtown Pittsburgh Partnership’s Golden Triangle Ambassadors advertise walking and biking patrols and public assistance during those hours. Dispatch is 412-855-6903, by call or text. This is assistance, not a guaranteed escort and not a 24-hour patrol. Coverage is the Downtown district. It is not a verified service for Station Square. For an emergency, call 911.",
      sources: [
        {
          label: "Downtown Pittsburgh Partnership, on-street services",
          href: "https://downtownpittsburgh.com/about-pdp/on-street-services/",
        },
        {
          label: "WPXI, independent coverage of the ambassador program",
          href: "https://www.wpxi.com/news/local/allegheny-county/new-ambassador-group-aims-make-downtown-pittsburgh-safer/SIOCACAVS5AHDOOYG4MSJRXUW4/",
        },
      ],
    },
    reports: {
      summary:
        "Official counts, with the limits attached. Do not compare Cranberry’s township cases with Pittsburgh’s neighborhood reports, and do not read either number as a hotel’s risk.",
      window:
        "Checked November 7, 2026. Cranberry’s report covers January 1–September 30, 2026. Pittsburgh’s city extract is reported-year 2026, with records through October 31, 2026. Reported dates are not necessarily the dates things happened. These are different police departments and different counting methods.",
      groups: [
        {
          title: "Cranberry Township police",
          text: "January 1–September 30, 2026: 454 total cases; 354 Group A offenses; 43 assault, 198 larceny, 5 motor-vehicle theft, 1 robbery, and 0 murder. The township’s own report says this should not be mistaken for a NIBRS submission. The figures are township-wide, not Cranberry Woods and not the Marriott. “Assault” here is not the city’s aggravated-assault category. A smaller raw total does not establish that the suburb is safer or crime-free.",
          sources: [
            {
              label: "Cranberry Township year-to-date report through September 30, 2026",
              href: "https://www.cranberrytownship.org/Archive.aspx?ADID=2548",
            },
            {
              label: "Cranberry Township September 2026 report",
              href: "https://www.cranberrytownship.org/Archive.aspx?ADID=2611",
            },
            {
              label: "Cranberry police report index",
              href: "https://www.cranberrytownship.org/Archive.aspx?AMID=68",
            },
          ],
        },
        {
          title: "Pittsburgh city incident reports",
          text: "In the city’s monthly dataset for reported year 2026, North Oakland has 376 distinct report numbers and the Central Business District has 2,531. Those are full-neighborhood raw totals. They are not incidents at these hotels, not a block or nighttime cut, and not a visitor rate. North Oakland is not all of Oakland. City data do not represent every campus-police-only incident. More foot traffic, jobs, students, nightlife, and police activity change the totals. Do not blend this file with Cranberry’s report.",
          sources: [
            {
              label: "Pittsburgh police data portal",
              href: "https://www.pittsburghpa.gov/Safety/Police/Police-Data-Portal",
            },
            {
              label: "Monthly criminal activity dataset",
              href: "https://data.wprdc.org/dataset/monthly-criminal-activity-dashboard",
            },
            {
              label: "Official methodological disclaimer (PDF)",
              href: "https://www.pittsburghpa.gov/files/assets/city/v/1/public-safety/documents/police/2025_pittsburgh_monthly_incident_dataset_disclaimer.pdf",
            },
            {
              label: "Archived blotter, not for current conditions (ends 2023)",
              href: "https://data.wprdc.org/dataset/uniform-crime-reporting-data",
            },
          ],
        },
      ],
      limits: [
        "No denominator-adjusted comparison was made. Do not treat fewer cases as a safer hotel.",
        "Nothing here isolates a hotel entrance, a lot, a garage, or nighttime hours.",
        "Reports are initial and can be revised. City locations are generalized to a block.",
        "Resource metadata on the city file said November 4, 2026, while an older coverage line still said April 30. The query results used for the city figures run through October 31, 2026.",
      ],
    },
  },
  notListed: {
    heading: "Checked, and not given a card",
    lede: "No well-substantiated suburban secured or underground hotel garage turned up in this search. That is not proof none exists. These stays were set aside because parking did not clearly meet a secured-garage test, or because another card already covers the choice. Leaving them off is not a finding that downtown is safer. Origin, dates, and detour time were not verified. Whites of Wexford’s underground garage is in Ireland, not Wexford, Pennsylvania.",
    places: [
      {
        name: "Hilton Garden Inn Pittsburgh/Cranberry",
        text: "The official location page places it near I-79 and the Pennsylvania Turnpike, and lists parking as not secured and not covered.",
        sources: [
          {
            label: "Hilton location and parking",
            href: "https://www.hilton.com/en/hotels/pitcrgi-hilton-garden-inn-pittsburgh-cranberry/hotel-location/",
          },
          {
            label: "Cranberry Township police statistics (a different jurisdiction)",
            href: "https://www.cranberrytownship.org/Archive.aspx?AMID=68",
          },
        ],
      },
      {
        name: "Hilton Garden Inn Pittsburgh Airport South–Robinson Mall",
        text: "The official location page lists parking as not secured and not covered.",
        sources: [
          {
            label: "Hilton location and parking",
            href: "https://www.hilton.com/en/hotels/pitrogi-hilton-garden-inn-pittsburgh-airport-south-robinson-mall/hotel-location/",
          },
        ],
      },
      {
        name: "DoubleTree Pittsburgh Cranberry",
        text: "Official page: parking is neither secured nor covered.",
        sources: [
          {
            label: "Hilton location and parking",
            href: "https://www.hilton.com/en/hotels/pitmadt-doubletree-pittsburgh-cranberry/hotel-location/",
          },
        ],
      },
      {
        name: "Hampton Pittsburgh Wexford-Sewickley",
        text: "Off I-79. Official page: parking is neither secured nor covered.",
        sources: [
          {
            label: "Hilton location and parking",
            href: "https://www.hilton.com/en/hotels/pitwshx-hampton-pittsburgh-wexford-sewickley/hotel-location/",
          },
        ],
      },
      {
        name: "Sheraton Pittsburgh Airport, TownePlace Cranberry, Wexford Inn",
        text: "Airport Sheraton and TownePlace list free onsite self-parking without a garage or security specification. Wexford Inn mentions private parking and cameras, not a confirmed garage.",
        sources: [
          {
            label: "Sheraton Airport overview",
            href: "https://www.marriott.com/en-us/hotels/pitsa-sheraton-pittsburgh-airport-hotel/overview/",
          },
          {
            label: "TownePlace Cranberry overview",
            href: "https://www.marriott.com/en-us/hotels/pitrr-towneplace-suites-pittsburgh-cranberry-township/overview/",
          },
          {
            label: "The Wexford Inn amenities",
            href: "https://www.thewexfordinn.com/hotel-rooms-in-wexford-pennsylvania/amenities",
          },
        ],
      },
      {
        name: "Sheraton at Station Square",
        text: "Researched earlier. Its covered garage is a public garage across the street. Set aside so the Cranberry driving stop stays in front. Not a crime judgment about Station Square.",
        sources: [
          {
            label: "Station Square parking",
            href: "https://www.stationsquare.com/parking/",
          },
        ],
      },
    ],
  },
  mapNote:
    "One pin per hotel, on the hotel itself. Marriott North is in Cranberry Woods, about 20 miles north of downtown on Marriott’s page, so the map zooms out to show it. Tiles and coordinates are © OpenStreetMap contributors.",
  hotels: [
    {
      id: "marriott-north",
      number: 1,
      name: "Pittsburgh Marriott North",
      shortName: "Marriott North",
      pick: "Driving stop if an outdoor lot is ok",
      group: "highway",
      neighborhood: "Cranberry Woods, near I-79",
      address: "100 Cranberry Woods Drive, Cranberry Township, PA 16066",
      lat: 40.6845623,
      lon: -80.08997,
      geo: {
        label: "OpenStreetMap way 369769149, via Nominatim",
        href: "https://www.openstreetmap.org/way/369769149",
        detail:
          "Nominatim on November 7, 2026 returned the building named Pittsburgh Marriott North, tagged 100 Cranberry Woods Drive, Cranberry Township, PA 16066. The pin is Nominatim’s center, 40.6845623, -80.0899700, inside that building outline.",
      },
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Pittsburgh+Marriott+North+100+Cranberry+Woods+Drive",
      room: {
        bands: [
          { label: "Sun–Thu", usd: 201 },
          { label: "Fri–Sat", usd: 226 },
        ],
        sourceLabel: "KAYAK, last-two-week averages",
        sourceHref: "https://www.kayak.com/Cranberry-Township-Hotels-Pittsburgh-Marriott-North.27011.ksp",
        note: "KAYAK’s average Sun–Thu and Fri–Sat prices over the last two weeks. Recent aggregates, not a rate for particular dates. Tax and fee inclusion is not stated. Not a quote and not availability.",
      },
      parking: {
        kind: "surface-lot",
        banner:
          "Surface-lot tradeoff: free, uncovered, and not a secured garage. This avoids a downtown garage walk. It does not establish a lower theft risk.",
        headline: "Free onsite self-parking, open lot",
        feeUsd: 0,
        feeLabel: "Free ($0) onsite self-parking",
        facts: [
          "Marriott’s overview lists onsite self-parking as free.",
          "A Hotels.com parking index describes it as uncovered. Treat it as an open surface lot.",
          "Cranberry Woods business park. Marriott says convenient I-79 access and about 20 miles from downtown.",
          "Restaurant and room service are on site, so dinner does not require a downtown trip.",
          "The walk is outdoors across the hotel’s own parking area. This arrangement does not require a public garage or a street crossing.",
        ],
        caveats: [
          "Security measures, a gate, valet, in-and-out rules, and vehicle clearance are not published in the official overview. None of those are claimed here.",
          "No audited lighting or camera map was found. Do not leave luggage in the car.",
          "Cranberry’s police statistics are township-wide, not this hotel’s record.",
        ],
      },
      safety:
        "Business-park alternative to Downtown, with free outdoor self-parking and onsite dining. This avoids a separate public garage walk but gives up covered and secured garage parking. It is not a crime-based safety winner.",
      photo: {
        src: "https://cache.marriott.com/content/dam/marriott-renditions/PITNO/pitno-entrance-1826-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
        alt: "Entrance of Pittsburgh Marriott North in Cranberry Township.",
        credit:
          "Official exterior from the Pittsburgh Marriott North overview. Hotel media; this guide does not assert a reuse license.",
        creditHref: "https://www.marriott.com/en-us/hotels/pitno-pittsburgh-marriott-north/overview/",
        missing: "The exterior photo did not load. The hotel’s own overview is linked below.",
      },
      sources: [
        {
          label: "Marriott overview",
          href: "https://www.marriott.com/en-us/hotels/pitno-pittsburgh-marriott-north/overview/",
        },
        {
          label: "KAYAK, recent average prices",
          href: "https://www.kayak.com/Cranberry-Township-Hotels-Pittsburgh-Marriott-North.27011.ksp",
        },
        {
          label: "Hotels.com, uncovered parking index",
          href: "https://www.hotels.com/ho207952/pittsburgh-marriott-north-cranberry-township-united-states-of-america/",
        },
        {
          label: "Experience Butler listing",
          href: "https://www.experiencebutler.com/directory/pittsburgh-marriott-north/",
        },
      ],
    },
    {
      id: "doubletree",
      number: 2,
      name: "DoubleTree by Hilton Hotel & Suites Pittsburgh Downtown",
      shortName: "DoubleTree Downtown",
      pick: "If a secured garage is nonnegotiable",
      group: "downtown",
      neighborhood: "Downtown",
      address: "One Bigelow Square, Pittsburgh, PA 15219",
      lat: 40.4404867,
      lon: -79.9940202,
      geo: {
        label: "OpenStreetMap way 289905598, via Nominatim",
        href: "https://www.openstreetmap.org/way/289905598",
        detail:
          "Nominatim search “DoubleTree Pittsburgh Downtown” on November 7, 2026 returned this hotel building, tagged 1 Bigelow Square, Pittsburgh, PA 15219. The pin is Nominatim’s center for that way, 40.4404867, -79.9940202, which sits inside the building outline.",
      },
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=DoubleTree+by+Hilton+Pittsburgh+Downtown+One+Bigelow+Square",
      room: {
        low: 159,
        high: 319,
        sourceLabel: "Visit Pittsburgh directory, Average Room Rate",
        sourceHref:
          "https://www.visitpittsburgh.com/directory/doubletree-by-hilton-hotel-suites-pittsburgh-downtown/",
        note: "Visit Pittsburgh “Average Room Rate.” No stay dates. Not a quote or availability. Taxes and fees unspecified.",
      },
      parking: {
        kind: "secured-garage",
        headline: "Onsite covered garage, valet only",
        feeUsd: 45,
        feeLabel: "$45 listed valet fee; confirm overnight billing",
        facts: [
          "On the hotel property, off I-579. Covered, and Hilton explicitly lists it as secured.",
          "24-hour staffed garage. Valet only: self-parking is not offered.",
          "In-and-out privileges are included.",
          "Use the hotel arrival and valet point for luggage, rather than walking over from an unrelated public garage.",
        ],
        caveats: [
          "The official parking page lists the valet fee as $45 and does not state the billing unit. Read it as “$45 listed valet fee; confirm overnight billing,” not as a confirmed per-night total.",
          "Underground, and a 6 ft 2 in clearance, come from a secondary ParkMe search description. The ParkMe page fetched for this guide did not expose those details, so both stay unverified. Label: underground reported by a secondary source; confirm. This is not a verified underground garage.",
          "A ParkMe / Metropolis figure of $39 is a public fee, not the hotel valet. Use the hotel’s $45 valet figure.",
          "Staffed and secured does not certify that the entire arrival route is indoors or monitored, and it is not a guarantee against theft.",
        ],
      },
      safety:
        "The practical advantage is the staffed onsite garage: you can hand the car to valet instead of walking from a separate garage. Downtown incident totals cover a much larger area than this hotel and cannot establish its individual risk. No audited entrance-lighting or camera-coverage study was found.",
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Doubletree_Hotel%2C_Pittsburgh%2C_2025-03-23.jpg/1280px-Doubletree_Hotel%2C_Pittsburgh%2C_2025-03-23.jpg",
        alt: "Red-brick DoubleTree hotel tower in downtown Pittsburgh, with the DoubleTree name running down the facade.",
        credit:
          "DoubleTree by Hilton at One Bigelow Square. Photo: Cbaile19, March 23, 2025. CC0.",
        creditHref:
          "https://commons.wikimedia.org/wiki/File:Doubletree_Hotel,_Pittsburgh,_2025-03-23.jpg",
        missing:
          "The exterior photo did not load. The hotel’s own site is linked below.",
      },
      sources: [
        {
          label: "Hilton hotel page",
          href: "https://www.hilton.com/en/hotels/pitdtdt-doubletree-hotel-and-suites-pittsburgh-downtown/",
        },
        {
          label: "Hilton parking and location",
          href: "https://www.hilton.com/en/hotels/pitdtdt-doubletree-hotel-and-suites-pittsburgh-downtown/hotel-location/",
        },
        {
          label: "Visit Pittsburgh, Average Room Rate",
          href: "https://www.visitpittsburgh.com/directory/doubletree-by-hilton-hotel-suites-pittsburgh-downtown/",
        },
        {
          label: "ParkMe, secondary parking description",
          href: "https://www.parkme.com/lot/19033/doubletree-by-hilton-hotel-pittsburgh-pa",
        },
      ],
    },
    {
      id: "hgi",
      number: 4,
      name: "Hilton Garden Inn Pittsburgh Downtown",
      shortName: "Hilton Garden Inn",
      pick: "Pick for secured self-parking",
      group: "downtown",
      neighborhood: "Market Square / Downtown",
      address: "250 Forbes Avenue, Pittsburgh, PA 15222",
      lat: 40.4402268,
      lon: -80.0016139,
      geo: {
        label: "OpenStreetMap node 7106287100, via Nominatim",
        href: "https://www.openstreetmap.org/node/7106287100",
        detail:
          "Nominatim on November 7, 2026 returned this hotel node at 40.4402268, -80.0016139, tagged Hilton Garden Inn, 250 Forbes Avenue, Pittsburgh, PA 15222.",
      },
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hilton+Garden+Inn+Pittsburgh+Downtown+250+Forbes+Avenue",
      room: {
        low: 159,
        high: 299,
        sourceLabel: "Visit Pittsburgh directory, Average Room Rate",
        sourceHref:
          "https://www.visitpittsburgh.com/directory/hilton-garden-inn-pittsburgh-downtown/",
        note: "Visit Pittsburgh “Average Room Rate.” No stay dates. Not a quote or availability. Taxes and fees unspecified.",
      },
      parking: {
        kind: "secured-garage",
        headline: "Secured self-parking in the same building",
        feeUsd: 50,
        feeLabel: "$50/day self-parking, in-and-out included",
        facts: [
          "Onsite garage inside Tower Two-Sixty, the building the hotel occupies. The building owner describes it as an integral public garage.",
          "Covered. Hilton explicitly lists it as secured. Self-parking only.",
          "In-and-out privileges are included.",
          "Structured, multilevel garage. Not described by Hilton as underground, and not verified as underground here.",
        ],
        caveats: [
          "Vehicle height limit is not established on the sources checked.",
          "The precise after-hours indoor route from the garage to the rooms, and the access controls along it, were not verified.",
          "Secured describes Hilton’s listing. It is not a guarantee against theft. Bring valuables inside.",
        ],
      },
      safety:
        "Hotel and parking are in the same building, which avoids a street crossing to a separate garage. Market Square is a restaurant and visitor hub, not an isolated suburban stop, and a busy afternoon does not mean the square stays equally busy late. When the ambassador program launched, coverage cited about 60,000 weekly Market Square visitors. That is a historical launch-era estimate, not a current count and not a nighttime count.",
      photo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pittsburgh-Downtown-2019-06-13-Tower-Two-Sixty-01.jpg/1280px-Pittsburgh-Downtown-2019-06-13-Tower-Two-Sixty-01.jpg",
        alt: "Tower Two-Sixty, the glass building on Market Square that houses Hilton Garden Inn Pittsburgh Downtown.",
        credit:
          "Tower Two-Sixty from Market Square. The hotel is in this building at 250 Forbes Avenue; the photo is the tower, not a separate hotel-only storefront. Photo: Cbaile19, June 13, 2019. CC0.",
        creditHref:
          "https://commons.wikimedia.org/wiki/File:Pittsburgh-Downtown-2019-06-13-Tower-Two-Sixty-01.jpg",
        missing:
          "The building photo did not load. The hotel’s own site is linked below.",
      },
      sources: [
        {
          label: "Hilton hotel page",
          href: "https://www.hilton.com/en/hotels/pitfagi-hilton-garden-inn-pittsburgh-downtown/",
        },
        {
          label: "Hilton parking and location",
          href: "https://www.hilton.com/en/hotels/pitfagi-hilton-garden-inn-pittsburgh-downtown/hotel-location/",
        },
        {
          label: "Visit Pittsburgh, Average Room Rate",
          href: "https://www.visitpittsburgh.com/directory/hilton-garden-inn-pittsburgh-downtown/",
        },
        {
          label: "Piatt, Tower Two-Sixty building owner",
          href: "https://piatt.com/tower-two-sixty/",
        },
        {
          label: "Ambassador launch note, historical Market Square visitor estimate",
          href: "https://www.blockbyblock.com/news/golden-triangle-ambassador-program-launches-providing-enhanced-hospitality-and-public-assistance-on-city-streets/",
        },
      ],
    },
    {
      id: "oaklander",
      number: 3,
      name: "The Oaklander Hotel, Autograph Collection",
      shortName: "The Oaklander",
      pick: "Oakland valet, not a suburb",
      group: "city",
      neighborhood: "Oakland",
      address: "5130 Bigelow Boulevard, Pittsburgh, PA 15213",
      lat: 40.44504293505284,
      lon: -79.95511697113568,
      geo: {
        label: "Coordinates published on The Oaklander’s own site",
        href: "https://theoaklanderhotel.com/",
        detail:
          "The hotel site’s structured data (JSON-LD) gives 40.44504293505284, -79.95511697113568. Checked November 7, 2026. This pin uses that official pair, not an estimated point.",
      },
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=The+Oaklander+Hotel+5130+Bigelow+Boulevard+Pittsburgh",
      room: {
        amount: 279,
        suffix: " published average",
        sourceLabel: "Visit Pittsburgh directory, Average Room Rate",
        sourceHref: "https://www.visitpittsburgh.com/directory/the-oaklander-hotel/",
        note: "Visit Pittsburgh “Average Room Rate.” No stay dates. Not a quote or availability. Taxes and fees unspecified.",
      },
      parking: {
        kind: "confirm-fee",
        banner:
          "Budget the official $50/day valet. The same Marriott page also shows older $35/night valet wording and mentions self-parking. Those conflict, so self-parking is unconfirmed.",
        headline: "Onsite valet, fee wording conflicts",
        feeUsd: 50,
        feeLabel: "$50/day onsite valet, the higher official figure. Confirm before you rely on it.",
        facts: [
          "Marriott lists onsite valet at $50/day.",
          "The same official page has promotional wording of valet-only $35/night with unlimited in-and-out, and an FAQ that also advertises self-parking.",
          "Valet at the hotel is the clear part. Hand luggage to the hotel rather than walking from a different garage.",
          "Oakland is a university, hospital, and museum district. It is an active city neighborhood, not a secluded suburb and not a claim of lower crime.",
        ],
        caveats: [
          "Do not label this garage explicitly secured. No detailed security or access-control specification was found. Underground versus aboveground is not established.",
          "Parkopedia, a secondary directory, says the garage is covered, with clearance about 2.03 m (6 ft 8 in), and lists $45 for 24 hours. Coverage and height are lower confidence than the official valet offer. Do not use $45 as the guest rate.",
          "The conflicting $35 wording would be 3,500 points at ×100 and 1,750 at ×50. Parkopedia’s $45 would be 4,500 and 2,250. Neither replaces the $50 budget (5,000 and 2,500).",
          "A secured label is not used here, and no parking label is a guarantee against theft.",
        ],
      },
      safety:
        "Oakland alternative to Downtown with onsite valet arrival. A parking directory identifies a covered garage, but security specifications and the hotel’s contradictory prices and self-park wording remain unverified. University, museum, and hospital streets are active city streets, not a suburban safety guarantee.",
      photo: {
        src: "https://marriott.cdn.tambourine.com/the-oaklander-hotel/media/theoaklander-07-gallery-25-62d82eb0dd1f5.jpg",
        alt: "The Oaklander Hotel exterior, from the hotel’s own gallery.",
        credit:
          "Official image from The Oaklander Hotel site. Hotel media; this guide does not assert a reuse license.",
        creditHref: "https://theoaklanderhotel.com/",
        fallback: {
          src: "https://marriott.cdn.tambourine.com/the-oaklander-hotel/media/intro-big-62be0cd7a193e.png",
          alt: "Alternate official image of The Oaklander Hotel.",
          credit:
            "Alternate official image from The Oaklander Hotel site. The first photo did not load. Hotel media; no reuse license is asserted.",
          creditHref: "https://theoaklanderhotel.com/",
        },
        missing: "The hotel photos did not load. The hotel’s own site is linked below.",
      },
      sources: [
        {
          label: "The Oaklander Hotel",
          href: "https://theoaklanderhotel.com/",
        },
        {
          label: "Marriott overview, parking wording",
          href: "https://www.marriott.com/en-us/hotels/pitak-the-oaklander-hotel-autograph-collection/overview/",
        },
        {
          label: "Visit Pittsburgh, Average Room Rate",
          href: "https://www.visitpittsburgh.com/directory/the-oaklander-hotel/",
        },
        {
          label: "Parkopedia, secondary garage note",
          href: "https://www.parkopedia.com/parking/garage/the_oaklander_hotel_autograph_collection/15213/pittsburgh/",
        },
      ],
    },
  ],
};
