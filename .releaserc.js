/** @type {import("semantic-release").Options} */
const config = {
    extends: "@socialgouv/releaserc",
    plugins: [
        "@semantic-release/changelog",
        "@semantic-release/git"
    ]
};

module.exports = config;
