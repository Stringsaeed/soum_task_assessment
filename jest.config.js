const packagesToTransform = [
  "react-native",
  "react-native-(.*)",
  "@react-native/(.*)",
  "@react-native-community",
  "@react-navigation",
  "expo",
  "expo-(.*)",
  "@expo(nent)?",
  "@expo-google-fonts",
  "react-navigation",
  "@react-navigation/.*",
  "@unimodules",
  "unimodules",
];

/** @type {import("jest").Config} */
module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`,
  ],
};
