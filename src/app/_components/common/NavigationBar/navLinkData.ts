export const navLinkData = [
  {
    label: "Home",
    href: "/",
    sub: null,
    isAvailable: true
  },
  {
    label: "Tarot",
    href: "/tarot",
    isAvailable: true,
    sub: [
      {
        label: "The Cards and the Deck",
        href: "/tarot/cards",
        decs: "",
        isAvailable: true
      },
      {
        label: "Tarot & Oracle Spreads",
        href: "/tarot/spreads",
        decs: "",
        isAvailable: true,
      },
      {
        label: "Online Tarot Readings",
        href: "/tarot/reading",
        decs: "",
        isAvailable: false,
      },
      {
        label: "A Readings Journal",
        href: "/tarot/journal",
        decs: "",
        isAvailable: false,
      },
      {
        label: "Tarot History",
        href: "/tarot/history",
        decs: "",
        isAvailable: false,
      },
      {
        label: "A Fool's Journey",
        href: "/tarot/journey",
        decs: "",
        isAvailable: false,
      }
    ]
  },
  {
    label: 'Astrology',
    href: "/astrology",
    isAvailable: false,
    sub: [ {
      label: 'Horoscopes',
      href: "/astrology/horoscopes",
      decs: "",
      isAvailable: false,
    },
      {
        label: 'Natal Charts',
        href: "/astrology/natal",
        decs: "",
        isAvailable: false,
      },
      {
        label: 'Synastry Chart',
        href: "/astrology/synastry",
        decs: "",
        isAvailable: false,
      },
      {
        label: 'Zodiac Signs',
        href: "/astrology/zodiac",
        decs: "",
        isAvailable: false,
      }
    ]
  
  }
]