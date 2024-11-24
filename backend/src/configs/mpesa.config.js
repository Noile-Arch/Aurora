module.exports = {
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
  MPESA_PASSKEY: process.env.MPESA_PASSKEY,
  MPESA_SHORTCODE: process.env.MPESA_SHORTCODE || '174379',
  MPESA_ENVIRONMENT: process.env.MPESA_ENVIRONMENT || 'sandbox',
  MPESA_API_URL: 'https://sandbox.safaricom.co.ke',
  CALLBACK_URL: process.env.BACKEND_URL + '/api/payments/mpesa-callback',
  TIMEOUT_URL: process.env.BACKEND_URL + '/api/payments/timeout',
  RESULT_URL: process.env.BACKEND_URL + '/api/payments/result'
};
