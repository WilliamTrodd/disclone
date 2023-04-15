module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '1ch': '0 1px 0 0 rgba(2,2,2,0.2), 0 1.5px 0 0 rgba(6, 6, 7, 0.05), 0 2px 0 0 rgba(2, 2, 2, 0.05)',
      },
      colors: {
        "dc-grey-800": "#1e1f22",
        "dc-grey-700": "#232428",
        "dc-grey-500": "#2b2d31",
        "dc-grey-300": "#313338",
        "dc-grey-200": "#35373c",
        "dc-grey-100": "#424549",
        "dc-grey-text": "#989AA1",
        "dc-blue-800": "#7289da",
        "dc-grey-text-200": "#949ba4",
        "dc-blue-100": '#5865f2'
      }
    },
  },
  plugins: [],
};
