/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "clr-black": "#1D2024",
        "clr-gray-7": "#343A40",
        "clr-gray-6": "#495057",
        "clr-gray-5": "#6C757D",
        "clr-gray-4": "#ADB5BD",
        "clr-gray-3": "#CED4DA",
        "clr-gray-2": "#DEE2E6",
        "clr-gray-1": "#E9ECEF",
        "clr-white": "#F8F9FA",
        "clr-error-1": "#d90429",
        "clr-error-2": "#ef233c",
      },
    },
  },
  plugins: [],
};
