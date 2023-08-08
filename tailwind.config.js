function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          red: withOpacity("--color-red"),
          tangerine: withOpacity("--color-tangerine"),
          cerulean: withOpacity("--color-cerulean"),
          salmon: withOpacity("--color-salmon"),
          tree: withOpacity("--color-tree"),
          yellow: withOpacity("--color-yellow"),
          "yellow-two": withOpacity("--color-yellow-two"),
          "yellow-three": withOpacity("--color-yellow-three"),
          carnation: withOpacity("--color-carnation"),
          base: withOpacity("--color-text-base"),
          inverted: withOpacity("--color-text-inverted"),
          muted: withOpacity("--color-text-muted"),
          secondary: withOpacity("--color-text-secondary"),
          countdown: withOpacity("--color-text-countdown"),
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          red: withOpacity("--color-red"),
          "red-secondary": withOpacity("--color-red-secondary"),
          tangerine: withOpacity("--color-tangerine"),
          cerulean: withOpacity("--color-cerulean"),
          salmon: withOpacity("--color-salmon"),
          tree: withOpacity("--color-tree"),
          yellow: withOpacity("--color-yellow"),
          "yellow-two": withOpacity("--color-yellow-two"),
          "yellow-three": withOpacity("--color-yellow-three"),
          base: withOpacity("--color-text-base"),
          carnation: withOpacity("--color-carnation"),
          fill: withOpacity("--color-fill"),
          thumbnail: withOpacity("--color-fill-thumbnail"),
          inverted: withOpacity("--color-text-inverted"),
          one: withOpacity("--color-fill-one"),
          two: withOpacity("--color-fill-two"),
          three: withOpacity("--color-fill-three"),
          four: withOpacity("--color-fill-four"),
          secondary: withOpacity("--color-fill-secondary"),
          purple: withOpacity("--color-purple"),
          "purple-dark": withOpacity("--color-purple-dark"),
          highlighted: withOpacity("--color-highlighted"),
          "dropdown-hover": withOpacity("--color-fill-dropdown-hover"),
          "button-secondary": withOpacity("--color-button-secondary"),
          "button-disable": withOpacity("--color-button-disable"),
          "button-hover": withOpacity("--color-button-hover"),
        },
      },
      // backgroundImage: {
      //   signinImage: "url('../public/images/hero/banner-1.png')",
      // },

      screens: {
        "3xl": "1780px",
        "4xl": "1921px",
      },

      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
        nunito: ["'Nunito', sans-serif"],
        poppins: ["'Poppins', sans-serif"],
      },

      fontSize: {
        "10px": ".625rem",
        "13px": "13px",
        "15px": "15px",
      },

      boxShadow: {
        card: "0px 0px 6px rgba(79, 95, 120, 0.1)",
        cardHover: "0px 0px 8px rgba(79, 95, 120, 0.18)",
        category: "0px 1px 6px rgba(79, 95, 120, 0.12)",
        navigation: "0 3px 6px rgba(115, 125, 144, 0.25)",
        counter: "0px 4px 10px rgba(79, 95, 120, 0.15)",
        featured: "0px 4px 8px rgba(70, 84, 111, 0.06)",
        cart: "0 3px 6px rgba(0,0,0,0.12)",
        switch: "0 2px 5px rgba(21,35,49,0.4)",
        dropDown: "0px 10px 40px rgba(41, 50, 68, 0.15)",
        carouselButton: "0px 2px 15px rgba(115, 125, 144, 0.25)",
        listProduct: "0 2px 4px rgba(0,0,0,.08)",
        navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
        header: "0 2px 3px rgba(0, 0, 0, 0.08)",
        subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
        bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
        cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
        contact: "0 1px 10px rgba(75, 90, 130, 0.1)",
        vendorCard: "0px 2px 3px rgba(0, 0, 0, 0.06)",
        vendorCardHover: "0px 1px 15px rgba(0, 0, 0, 0.06)",
        vendorSidebar:
          "0px 1px 2px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
