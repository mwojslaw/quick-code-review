module.exports = {
  moduleFileExtensions: ["ts", "js"],
  rootDir: "src",
  testRegex: ".spec.ts$",
  moduleNameMapper: {
    "@qcr/(.*)": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
