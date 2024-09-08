const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN, // Tambahkan DSN dari akun Sentry Anda
});

module.exports = Sentry;
