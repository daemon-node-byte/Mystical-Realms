import {
  SkullCardsIcon,
  CardSpreadIcon,
  DrawCardIcon,
  ClosedBookIcon,
  ZodiacStarIcon,
  TreeIcon,
} from "@/components/icons";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mystical Realms",
  description: "Explore the mystical realms with in you.",
  navItems: [],
  navMenuItems: [],
  links: {},
  services: [
    {
      title: "Tarot Reading",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: DrawCardIcon,
      disabled: false,
      slug: "/reading",
    },
    {
      title: "Tarot Spreads",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: CardSpreadIcon,
      disabled: false,
      slug: "/spreads",
    },
    {
      title: "Tarot Explorer",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: SkullCardsIcon,
      disabled: false,
      slug: "/explorer",
    },
    {
      title: "Tarot Journal",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: ClosedBookIcon,
      disabled: false,
      slug: "/journal",
    },
    {
      title: "Horoscopes",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: ZodiacStarIcon,
      disabled: true,
      slug: "/horoscopes",
    },
    {
      title: "Natal Charts",
      description:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      icon: TreeIcon,
      disabled: true,
      slug: "/charts",
    },
  ],
};

export const testimonials = [
  {
    name: "John Doe",
    username: "johnnyTarot",
    comment:
      "The tarot reading was surprisingly accurate! Really helped me gain clarity.",
    dateOfComment: "2025-01-01",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150",
  },
  {
    name: "Michael Chen",
    username: "astroMike",
    comment:
      "Easy to use website with loads of useful astrology info. Learned a lot!",
    dateOfComment: "2025-01-04",
    rating: 4,
    avatar_url: "https://i.pravatar.cc/150",
  },
  {
    name: "Carlos Mendoza",
    username: "c_mendoza",
    comment:
      "Loved the weekly horoscopes and the live tarot sessions. Totally worth it!",
    dateOfComment: "2025-01-06",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150",
  },
  {
    name: "Samantha Lee",
    username: "samLee88",
    comment:
      "Accurate cosmic insights, but the site layout could be more user-friendly.",
    dateOfComment: "2025-01-07",
    rating: 4,
    avatar_url: "https://i.pravatar.cc/150",
  },
  {
    name: "Olivia Park",
    username: "astrolivi",
    comment: "Totally spot-on reading. Will be back for more guidance!",
    dateOfComment: "2024-12-09",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150",
  },
  {
    name: "Melanie Brooks",
    username: "tarot_mel",
    comment:
      "Incredibly insightful astrologer. The daily readings have become my ritual!",
    dateOfComment: "2024-12-11",
    rating: 5,
    avatar_url: "https://i.pravatar.cc/150",
  },
];
