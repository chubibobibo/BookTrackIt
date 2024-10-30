export const cardHeader = {
  defaultProps: {
    variant: "filled",
    color: "indigo",
    shadow: true,
    floated: false,
    className: "",
  },
  valid: {
    variants: ["filled", "gradient"],
    colors: [
      "transparent",
      "white",
      "blue-gray",
      "gray",
      "brown",
      "deep-orange",
      "orange",
      "amber",
      "yellow",
      "lime",
      "light-green",
      "green",
      "teal",
      "cyan",
      "light-blue",
      "blue",
      "indigo",
      "deep-purple",
      "purple",
      "pink",
      "red",
      "customBlue",
    ],
  },
  styles: {
    base: {
      initial: {
        position: "relative",
        backgroundClip: "bg-clip-border",
        mt: "mt-4",
        mx: "mx-4",
        borderRadius: "rounded-xl",
        overflow: "overflow-hidden",
      },
      shadow: {
        boxShadow: "shadow-lg",
      },
      floated: {
        mt: "-mt-6",
      },
    },

    variants: {
      filled: {
        customBlue: {
          background: "bg-customBlue",
          color: "customBlue",
          shadow: "shadow-none",
        },
        transparent: {
          background: "bg-transparent",
          color: "text-gray-700",
          shadow: "shadow-none",
        },
        white: {
          background: "customBlue",
          color: "customBlue",
        },
        "blue-gray": {
          background: "bg-blue-gray-500",
          color: "text-white",
          shadow: "shadow-blue-gray-500/40",
        },
        gray: {
          background: "bg-gray-500",
          color: "text-white",
          shadow: "shadow-gray-500/40",
        },
        brown: {
          background: "bg-brown-500",
          color: "text-white",
          shadow: "shadow-brown-500/40",
        },
        "deep-orange": {
          background: "bg-deep-orange-500",
          color: "text-white",
          shadow: "shadow-deep-orange-500/40",
        },
        orange: {
          background: "bg-orange-500",
          color: "text-white",
          shadow: "shadow-orange-500/40",
        },
        amber: {
          backgroud: "bg-amber-500",
          color: "text-gray-700",
          shadow: "shadow-amber-500/40",
        },
        yellow: {
          background: "bg-yellow-500",
          color: "text-gray-700",
          shadow: "shadow-yellow-500/40",
        },
        lime: {
          background: "bg-lime-500",
          color: "text-gray-700",
          shadow: "shadow-lime-500/40",
        },
        "light-green": {
          background: "bg-light-green-500",
          color: "text-white",
          shadow: "shadow-light-green-500/40",
        },
        green: {
          background: "bg-green-500",
          color: "text-white",
          shadow: "shadow-green-500/40",
        },
        teal: {
          background: "bg-teal-500",
          color: "text-white",
          shadow: "shadow-teal-500/40",
        },
        cyan: {
          background: "bg-cyan-500",
          color: "text-white",
          shadow: "shadow-cyan-500/40",
        },
        "light-blue": {
          background: "bg-light-blue-500",
          color: "text-white",
          shadow: "shadow-light-blue-500/40",
        },
        blue: {
          background: "bg-blue-500",
          color: "text-white",
          shadow: "shadow-blue-500/40",
        },
        indigo: {
          background: "bg-indigo-500",
          color: "text-gray-700",
          shadow: "shadow-indigo-500/40",
        },
        "deep-purple": {
          background: "bg-deep-purple-500",
          color: "text-white",
          shadow: "shadow-deep-purple-500/40",
        },
        purple: {
          background: "bg-purple-500",
          color: "text-white",
          shadow: "shadow-purple-500/40",
        },
        pink: {
          background: "bg-pink-500",
          color: "text-white",
          shadow: "shadow-pink-500/40",
        },
        red: {
          background: "bg-red-500",
          color: "text-white",
          shadow: "shadow-red-500/40",
        },
      },
    },
  },
};
