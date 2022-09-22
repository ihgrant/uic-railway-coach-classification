const decoderForm = document.getElementById("decoder");

decoderForm.addEventListener("submit", event => {
  event.preventDefault();
  const formValues = new FormData(event.target);
  const code = formValues.get("code");
  const locale = formValues.get("locale");
  const classification = getClassification(code, locale)
  console.log(classification);

  const outputList = document.getElementById('output')
  classification.forEach(entry => {
    let li  = document.createElement('li')
    li.textContent = entry
    outputList.appendChild(li)
  })
});

function sortByLongestCode(a, b) {
  return b.code.length - a.code.length;
}

function getClassification(
  code = "",
  locale = "",
  classification = [],
  trailingDash = false
) {
  if (code.length === 0) {
    return classification;
  }

  const lookup = getLookup(code, locale);
  const classificationEntry = lookup.find(entry => code.startsWith(entry.code));

  if (!classificationEntry) {
    return classification;
  }

  return getClassification(
    code.slice(classificationEntry.code.length),
    locale,
    classification.concat(classificationEntry.classification)
  );
}

function getLookup(code, locale) {
  const isMainClassificationCode =
    code.slice(0, 1) === code.slice(0, 1).toUpperCase();
  return isMainClassificationCode ? mainLookup : getSecondaryLookup(locale);
}

function getSecondaryLookup(locale) {
  return secondaryLookup[locale];
}

const mainLookup = [
  {
    code: "A",
    classification: "Passenger coach with 1st class seating",
    continueMain: false
  },
  {
    code: "B",
    classification: "Passenger coach with 2nd class seating",
    continueMain: false
  },
  {
    code: "AB",
    classification: "Composite coach with 1st and 2nd class seating",
    continueMain: false
  },
  {
    code: "AR",
    classification: "Coach with 1st class seating, kitchen and dining area",
    continueMain: false
  },
  {
    code: "BC",
    classification: "Coach with 2nd class seating and place for disabled, and could also include playroom for children 	(Norway only)",
    continueMain: false,
    locale: "Norway"
  },
  {
    code: "BF",
    classification: "Coach with place for small children, place for disabled, staff room and bicycle room 	(Norway only)",
    continueMain: false,
    locale: "Norway"
  },
  {
    code: "BR",
    classification: "Coach with 2nd class seating, kitchen and dining area",
    continueMain: false
  },
  {
    code: "AD",
    classification: "Composite coach with 1st class seating and a luggage compartment",
    continueMain: false
  },
  {
    code: "BD",
    classification: "  Composite coach with 2nd class seating and a luggage compartment",
    continueMain: false
  },
  { code: "D", classification: "Luggage van", continueMain: false },
  {
    code: "DA",
    classification: "  Double-decker coach with 1st and 2nd class 	(Germany only)",
    continueMain: false,
    locale: "Germany"
  },
  {
    code: "DB",
    classification: "Double-decker coach with 1st and 2nd class 	(Germany only)",
    continueMain: false,
    locale: "Germany"
  },
  {
    code: "DD",
    classification: "Double-decker luggage van 	(DR only)",
    continueMain: false,
    locale: "Nazi Germany"
  },
  {
    code: "DD",
    classification: "Double-decker car transporter of the passenger coach type 	(used in motorail trains)",
    continueMain: false
  },
  {
    code: "Post",
    classification: "Mail van 	(Germany only)",
    continueMain: false,
    locale: "Germany"
  },
  {
    code: "F",
    classification: "Luggage van 	(Norway and Sweden only)",
    continueMain: false,
    locale: ["Norway", "Sweden"]
  },
  {
    code: "F",
    classification: "Mail van 	(Austria only)",
    continueMain: false,
    locale: "Austria"
  },
  {
    code: "FR",
    classification: "Coach with restaurant / bistro and staff room / luggage room 	(Norway only)",
    continueMain: false,
    locale: "Norway"
  },
  {
    code: "BPost",
    classification: "Composite coach with 2nd class and a mail section",
    continueMain: false
  },
  {
    code: "DPost",
    classification: "Luggage van with a mail section",
    continueMain: false
  },
  {
    code: "WG",
    classification: "Club car 	(Germany only)",
    continueMain: false,
    locale: "Germany"
  },
  {
    code: "WGS",
    classification: "Special club car (Saloon car) 	(Germany only)",
    continueMain: false,
    locale: "Germany"
  },
  { code: "SR", classification: "Club car", continueMain: false },
  { code: "Salon", classification: "Saloon coach", continueMain: false },
  { code: "WR", classification: "Restaurant car", continueMain: false },
  {
    code: "WL",
    classification: "Sleeper 	(in most countries in combination with A or B)",
    continueMain: true
  },
  {
    code: "K",
    classification: "Narrow gauge coach 	(only in combination with A, B or D)",
    continueMain: true
  },
  {
    code: "Z",
    classification: "Mail van 	(Switzerland only)",
    continueMain: false,
    locale: "Switzerland"
  },
  {
    code: "Z",
    classification: "Prisoner transporter 	(DR only) ",
    locale: "Nazi Germany"
  }
].sort(sortByLongestCode);

const secondaryLookup = {
  AT: [
    { code: "c", classification: "Four-axled couchette coach" },
    { code: "m", classification: "Four-axled coach longer than 24 m" },
    { code: "p", classification: "Four-axled open coach with centre doors" },
    { code: "s", classification: "on four-axled luggage van with corridor" },
    {
      code: "x",
      classification: "on four-axled luggage van for express goods"
    },
    {
      code: "z",
      classification: "Four-axled coach with power supply from a bus-bar"
    },
    { code: "h", classification: "Twin-axled coach with electric heating" },
    {
      code: "i",
      classification: "Twin-axled coach with open platforms and centre doors"
    },
    {
      code: "ip",
      classification: "Twin-axled coach with enclosed platforms and centre doors"
    },
    { code: "o", classification: "Twin-axled coach without steam heating" },
    { code: "ü", classification: "Twin-axled coach with gangway bellows" },
    {
      code: "w",
      classification: "Twin-axled coach with Webasto heating (driving trailer)"
    },
    { code: "-d", classification: "Double-decker coach" },
    { code: "-k", classification: "Coach with driving cab" },
    {
      code: "-l",
      classification: "Coach with control cables for push-pull operation"
    },
    { code: "-s", classification: "Driving trailer for push-pull operation " }
  ].sort(sortByLongestCode),
  DE: [
    {
      code: "m",
      classification: "Passenger coach with a length of more than 24.5 metres, rubber, gangway connectors (except on DDm)"
    },
    {
      code: "l",
      classification: "Passenger coach with a length of more than 24.5 metres, rubber, gangway connectors (except on DDm), but without a corridor (currently not in use)"
    },
    {
      code: "n",
      classification: "Local train passenger coach with a length of more than 24.5 metres, open coach with centre aisle in 2nd class (12 notional compartments), centre aisle or side corridor in 1st class, two centre doors, suitable for push-pull operations (36-pole control cable)"
    },
    {
      code: "y",
      classification: "Local train passenger coach with a length of more than 24.5 m, open coach with centre aisle in 2nd class (11 notional compartments), two centre doors, suitable for push-pull operations (34-pole control cable)"
    },
    {
      code: "x",
      classification: "S-Bahn open coach with centre doors, bus bar for current collection, centre doors and high performance brake see also: x coach)"
    },
    {
      code: "p",
      classification: "Open coach with centre doors (pullman type), air-conditioned"
    },
    {
      code: "v",
      classification: "Long-distance coach with fewer (verringerter) compartments (11 instead of 12 on Bm and 9 instead of 10 on Am coaches,6/4 instead of 6/5 on ABm coaches)"
    },
    {
      code: "o",
      classification: "in addition to m: fewer compartments and without (ohne) air-conditioning"
    },
    { code: "i", classification: "in addition to m: former InterRegio coach" },
    {
      code: "c",
      classification: "Coach with compartments, in which the seats can be converted to couchettes ('couchette coach')"
    },
    {
      code: "d",
      classification: "Coach with multi-purpose or bicycle section"
    },
    {
      code: "k",
      classification: "Coach with bistro/kiosk or kitchen section or snack machines"
    },
    {
      code: "a",
      classification: "Coach equipped with automatic door operation (TAV)."
    },
    {
      code: "r",
      classification: "Coach with high-performance brake (Rapid-Bremse) KE-GPR. Only used in combination with n or on mail vans."
    },
    { code: "s", classification: "on luggage vans: corridor (Seitengang)" },
    // on sleepers: Special type (small single- or twin-bed compartments)
    {
      code: "b",
      classification: "Coach with equipment for the disabled (behindertengerechte)"
    },
    // formerly: coach mit command-control cabling (Befehls-Leitung)
    {
      code: "h",
      classification: "Coach which has both a bus-bar and can supply current from its own axle generators"
    },
    // also: non-converted local passenger train coaches of Reichsbahn origin
    {
      code: "z",
      classification: "Coach with power supply from the bus-bar (no axle generators)"
    },
    {
      code: "u",
      classification: "Coach with 34-pole push-pull control cabling (DR type)"
    },
    {
      code: "uu",
      classification: "Coach with 36-pole push-pull control cabling (DB type) (n includes this feature)"
    },
    {
      code: "q",
      classification: "Driving trailer with 34-pole control cabling (only non-modernised vehicles that don't have a n or y)"
    },
    {
      code: "f",
      classification: "Driving trailer with 36-pole control cabling or time-division multiplexed push-pull control"
    }
    // in addition to u: driving car with 34-pole cabling or time-division multiplexed push-pull control
  ].sort(sortByLongestCode),
};

console.log(mainLookup);
