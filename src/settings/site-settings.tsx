export const siteSettings = {
  name: "Geenia",
  description:
    "Geenia International is here to serve you better products for you we are in this Industry from many years and continuosly  upgrading products as per the environment",
  author: {
    name: "Geenia International Private Limited",
    websiteUrl: "https://geenia.in",
    address: "",
  },
  logo: {
    url: "/images/logo.svg",
    alt: "geenia",
    href: "/",
    width: 104,
    height: 40,
  },
  defaultLanguage: "en",
  currencyCode: "INR",
  site_header: {
    menu: [
      {
        id: 1,
        path: "/products/skincare",
        label: "skincare",
        subMenu: true,
        megaMenu: true,
        subMenuGroup1: [
          {
            id: 1,
            path: "/skincare?categorgy=face-wash",
            label: "Face Wash",
          },
          {
            id: 2,
            path: "/skincare?categorgy=face-scrub",
            label: "Face Scrub",
          },
          {
            id: 3,
            path: "/skincare?categorgy=face-mask",
            label: "Face Mask",
          },
          {
            id: 4,
            path: "/skincare?categorgy=face-moisturizer",
            label: "Face Moisturizer",
          },
        ],
        subMenuGroup2: [
          {
            id: 1,
            path: "/skincare?categorgy=serum-face-oil",
            label: "Serum Face Oil",
          },
          {
            id: 2,
            path: "/skincare?categorgy=lip-care",
            label: "Lip Care",
          },
          {
            id: 3,
            path: "/skincare?categorgy=sunscreen",
            label: "Sunscreen",
          },
        ],
      },
      {
        id: 2,
        path: "/products/bodycare",
        label: "bodycare",
        subMenu: true,
        megaMenu: true,
        subMenuGroup1: [
          {
            id: 1,
            path: "/bodycare?categorgy=body-cleaners",
            label: "Body Cleaners",
          },
          {
            id: 2,
            path: "/bodycare?categorgy=body-mist",
            label: "Body Mist",
          },
          {
            id: 3,
            path: "/bodycare?categorgy=eau-de-perfumes",
            label: "Eau De Perfumes",
          },
          {
            id: 4,
            path: "/bodycare?categorgy=face-body-lotion",
            label: "Body Lotion",
          },
          {
            id: 5,
            path: "/bodycare?categorgy=hand-cream",
            label: "Hand Cream",
          },
        ],
        subMenuGroup2: [
          {
            id: 1,
            path: "/bodycare?categorgy=body-yogurts",
            label: "Body Yogurts",
          },
          {
            id: 2,
            path: "/bodycare?categorgy=body-oils",
            label: "Body Oils",
          },
          {
            id: 3,
            path: "/bodycare?categorgy=body-butter",
            label: "Body Butter",
          },
          {
            id: 4,
            path: "/bodycare?categorgy=deo-pi-cream",
            label: "Deo Pi Cream",
          },
        ],
        subMenuGroup3: [
          {
            id: 1,
            path: "/bodycare?categorgy=foot-cream",
            label: "Foot Cream",
          },
          {
            id: 2,
            path: "/bodycare?categorgy=body-care-combos",
            label: "Body care Combos",
          },
          {
            id: 3,
            path: "/bodycare?categorgy=gift-sets",
            label: "Gift Sets",
          },
          {
            id: 4,
            path: "/bodycare?categorgy=body-scrubs",
            label: "Body Scrubs",
          },
        ],
      },

      {
        id: 3,
        path: "/products/haircare",
        label: "haircare",
        subMenu: true,
        megaMenu: true,
        subMenuGroup1: [
          {
            id: 1,
            path: "/haircare?categorgy=shampoo",
            label: "Shampoo",
          },
          {
            id: 2,
            path: "/haircare?categorgy=conditioners",
            label: "Conditioners",
          },
          {
            id: 3,
            path: "/haircare?categorgy=hair-mask",
            label: "Hair Mask",
          },
          {
            id: 4,
            path: "/haircare?categorgy=hair-serum",
            label: "Hair Serum",
          },
        ],
        subMenuGroup2: [
          {
            id: 1,
            path: "/haircare?categorgy=damaged-hair",
            label: "Damaged Hair",
          },
          {
            id: 2,
            path: "/haircare?categorgy=frizz",
            label: "Frizz",
          },
          {
            id: 3,
            path: "/haircare?categorgy=dandruff",
            label: "Dandruff",
          },
          {
            id: 4,
            path: "/haircare?categorgy=hair-fall",
            label: "Hair fall",
          },
        ],
        subMenuGroup3: [
          {
            id: 1,
            path: "/haircare?categorgy=scalp-serum",
            label: "Scalp Serum",
          },
        ],
      },
      {
        id: 4,
        path: "/products/fragrance",
        label: "fragrance",
        subMenu: true,
        megaMenu: false,
        subMenuGroup1: [
          {
            id: 1,
            path: "/fragrance?categorgy=body-fragrance",
            label: "Body Fragrance",
          },
        ],
      },
      {
        id: 5,
        path: "/products/makeup",
        label: "makeup",
        subMenu: true,
        megaMenu: true,
        subMenuGroup1: [
          {
            id: 1,
            path: "/makeup?categorgy=kajals",
            label: "Kajals",
          },
          {
            id: 2,
            path: "/makeup?categorgy=eyeliner",
            label: "Eyeliner",
          },
          {
            id: 3,
            path: "/makeup?categorgy=eyebrow-definer",
            label: "Eyebrow Definer",
          },
          {
            id: 4,
            path: "/makeup?categorgy=mascara",
            label: "Mascara",
          },
        ],
        subMenuGroup2: [
          {
            id: 1,
            path: "/makeup?categorgy=lip-cheek-tint",
            label: "Lip & Cheek Tint",
          },
          {
            id: 2,
            path: "/makeup?categorgy=lip-scrub",
            label: "Lip Scrub",
          },
          {
            id: 3,
            path: "/makeup?categorgy=lip-balm",
            label: "Lip Balm",
          },
          {
            id: 4,
            path: "/makeup?categorgy=nail-polish",
            label: "Nail Polish",
          },
        ],
        subMenuGroup3: [
          {
            id: 1,
            path: "/makeup?categorgy=lipstick",
            label: "Lipstick",
          },
        ],
      },
      {
        id: 6,
        path: "/products/phy",
        label: "phy",
        subMenu: false,
        megaMenu: false,
      },

      {
        id: 7,
        path: "/",
        label: "treatment",
        subMenu: true,
        megaMenu: false,
        subMenuGroup1: [
          {
            id: 1,
            path: "/treatment/bodycare",
            label: "Body Care Treatment",
          },
          {
            id: 2,
            path: "/treatment/hairfall",
            label: "Hair Fall Treatment",
          },
          {
            id: 3,
            path: "/treatment/skincare",
            label: "Skin care Treatment",
          },
          {
            id: 4,
            path: "/treatment/facecare",
            label: "Face Care Treatment",
          },
          {
            id: 5,
            path: "/treatment/consultation",
            label: "Healthcare Consultation",
          },
        ],
      },
    ],
  },

  site_header_mobile: {
    menu: [
      {
        id: 1,
        path: "/products/skincare",
        label: "skincare",
        subMenu: true,
        subMenuGroup: [
          {
            id: 1,
            path: "/skincare?categorgy=face-wash",
            label: "Face Wash",
          },
          {
            id: 2,
            path: "/skincare?categorgy=face-scrub",
            label: "Face Scrub",
          },
          {
            id: 3,
            path: "/skincare?categorgy=face-mask",
            label: "Face Mask",
          },
          {
            id: 4,
            path: "/skincare?categorgy=face-moisturizer",
            label: "Face Moisturizer",
          },

          {
            id: 5,
            path: "/skincare?categorgy=serum-face-oil",
            label: "Serum Face Oil",
          },
          {
            id: 6,
            path: "/skincare?categorgy=lip-care",
            label: "Lip Care",
          },
          {
            id: 7,
            path: "/skincare?categorgy=sunscreen",
            label: "Sunscreen",
          },
        ],
      },
      {
        id: 2,
        path: "/products/bodycare",
        label: "bodycare",
        subMenu: true,
        subMenuGroup: [
          {
            id: 1,
            path: "/bodycare?categorgy=body-cleaners",
            label: "Body Cleaners",
          },
          {
            id: 2,
            path: "/bodycare?categorgy=body-mist",
            label: "Body Mist",
          },
          {
            id: 3,
            path: "/bodycare?categorgy=eau-de-perfumes",
            label: "Eau De Perfumes",
          },
          {
            id: 4,
            path: "/bodycare?categorgy=face-body-lotion",
            label: "Body Lotion",
          },
          {
            id: 5,
            path: "/bodycare?categorgy=hand-cream",
            label: "Hand Cream",
          },

          {
            id: 6,
            path: "/bodycare?categorgy=body-yogurts",
            label: "Body Yogurts",
          },
          {
            id: 7,
            path: "/bodycare?categorgy=body-oils",
            label: "Body Oils",
          },
          {
            id: 8,
            path: "/bodycare?categorgy=body-butter",
            label: "Body Butter",
          },
          {
            id: 9,
            path: "/bodycare?categorgy=deo-pi-cream",
            label: "Deo Pi Cream",
          },

          {
            id: 10,
            path: "/bodycare?categorgy=foot-cream",
            label: "Foot Cream",
          },
          {
            id: 11,
            path: "/bodycare?categorgy=body-care-combos",
            label: "Body care Combos",
          },
          {
            id: 12,
            path: "/bodycare?categorgy=gift-sets",
            label: "Gift Sets",
          },
          {
            id: 13,
            path: "/bodycare?categorgy=body-scrubs",
            label: "Body Scrubs",
          },
        ],
      },

      {
        id: 3,
        path: "/products/haircare",
        label: "haircare",
        subMenu: true,

        subMenuGroup: [
          {
            id: 1,
            path: "/haircare?categorgy=shampoo",
            label: "Shampoo",
          },
          {
            id: 2,
            path: "/haircare?categorgy=conditioners",
            label: "Conditioners",
          },
          {
            id: 3,
            path: "/haircare?categorgy=hair-mask",
            label: "Hair Mask",
          },
          {
            id: 4,
            path: "/haircare?categorgy=hair-serum",
            label: "Hair Serum",
          },

          {
            id: 5,
            path: "/haircare?categorgy=damaged-hair",
            label: "Damaged Hair",
          },
          {
            id: 6,
            path: "/haircare?categorgy=frizz",
            label: "Frizz",
          },
          {
            id: 7,
            path: "/haircare?categorgy=dandruff",
            label: "Dandruff",
          },
          {
            id: 8,
            path: "/haircare?categorgy=hair-fall",
            label: "Hair fall",
          },

          {
            id: 9,
            path: "/haircare?categorgy=scalp-serum",
            label: "Scalp Serum",
          },
        ],
      },
      {
        id: 4,
        path: "/products/fragrance",
        label: "fragrance",
        subMenu: true,

        subMenuGroup: [
          {
            id: 1,
            path: "/fragrance?categorgy=body-fragrance",
            label: "Body Fragrance",
          },
        ],
      },
      {
        id: 5,
        path: "/products/makeup",
        label: "makeup",
        subMenu: true,

        subMenuGroup: [
          {
            id: 1,
            path: "/makeup?categorgy=kajals",
            label: "Kajals",
          },
          {
            id: 2,
            path: "/makeup?categorgy=eyeliner",
            label: "Eyeliner",
          },
          {
            id: 3,
            path: "/makeup?categorgy=eyebrow-definer",
            label: "Eyebrow Definer",
          },
          {
            id: 4,
            path: "/makeup?categorgy=mascara",
            label: "Mascara",
          },

          {
            id: 5,
            path: "/makeup?categorgy=lip-cheek-tint",
            label: "Lip & Cheek Tint",
          },
          {
            id: 6,
            path: "/makeup?categorgy=lip-scrub",
            label: "Lip Scrub",
          },
          {
            id: 7,
            path: "/makeup?categorgy=lip-balm",
            label: "Lip Balm",
          },
          {
            id: 8,
            path: "/makeup?categorgy=nail-polish",
            label: "Nail Polish",
          },

          {
            id: 9,
            path: "/makeup?categorgy=lipstick",
            label: "Lipstick",
          },
        ],
      },
      {
        id: 6,
        path: "/products/phy",
        label: "phy",
        subMenu: false,
      },

      {
        id: 7,
        path: "/",
        label: "treatment",
        subMenu: true,

        subMenuGroup: [
          {
            id: 1,
            path: "/treatment/bodycare",
            label: "Body Care Treatment",
          },
          {
            id: 2,
            path: "/treatment/hairfall",
            label: "Hair Fall Treatment",
          },
          {
            id: 3,
            path: "/treatment/skincare",
            label: "Skin care Treatment",
          },
          {
            id: 4,
            path: "/treatment/facecare",
            label: "Face Care Treatment",
          },
          {
            id: 5,
            path: "/treatment/consultation",
            label: "Healthcare Consultation",
          },
        ],
      },
    ],
  },

  social_links: [
    {
      id: 1,
      path: "https://www.facebook.com/profile.php?id=100095389503139&mibextid=LQQJ4d",
      image: "/images/social/facebook.svg",
      name: "facebook",
      width: 20,
      height: 20,
    },
    {
      id: 2,
      path: "https://twitter.com/",
      image: "/images/social/twitter.svg",
      name: "twitter",
      width: 20,
      height: 20,
    },
    {
      id: 3,
      path: "https://instagram.com/geenia_international?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr",
      image: "/images/social/instagram.svg",
      name: "instagram",
      width: 20,
      height: 20,
    },
    {
      id: 4,
      path: "https://youtube.com/@GeeniaInternational?si=SeS8SeJmL2zwRJoY",
      image: "/images/social/youtube.svg",
      name: "youtube",
      width: 24,
      height: 24,
    },
  ],
  footer_links: [
    {
      id: 1,
      title: "Privacy Policy",
      path: "/privacy",
    },
    {
      id: 2,
      title: "Terms & Services",
      path: "/terms",
    },
    {
      id: 3,
      title: "Return & Refund Policy",
      path: "/return-policy",
    },
    {
      id: 4,
      title: "Contact Us",
      path: "/contact",
    },
    {
      id: 5,
      title: "FAQ",
      path: "/faq",
    },
  ],
  payments_links: [
    {
      id: 1,
      path: "/",
      image: "/images/payment/mastercard.svg",
      name: "payment-master-card",
      width: 34,
      height: 20,
    },
    {
      id: 2,
      path: "/",
      image: "/images/payment/visa.svg",
      name: "payment-visa",
      width: 50,
      height: 20,
    },
    {
      id: 3,
      path: "/",
      image: "/images/payment/paytm.svg",
      name: "payment-paytm",
      width: 50,
      height: 20,
    },
    {
      id: 4,
      path: "/",
      image: "/images/payment/upi.svg",
      name: "payment-upi",
      width: 50,
      height: 20,
    },
  ],
};
