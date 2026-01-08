/* eslint-disable @typescript-eslint/no-require-imports */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/services/i18n/request.ts");

module.exports = { withNextIntl };
