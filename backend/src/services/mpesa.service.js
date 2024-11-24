const axios = require('axios');
const moment = require('moment');
const mpesaConfig = require('../configs/mpesa.config');

class MpesaService {
  async getAccessToken() {
    try {
      const auth = Buffer.from(
        `${mpesaConfig.MPESA_CONSUMER_KEY}:${mpesaConfig.MPESA_CONSUMER_SECRET}`
      ).toString('base64');

      console.log('Getting access token with auth:', {
        consumerKey: mpesaConfig.MPESA_CONSUMER_KEY,
        consumerSecret: mpesaConfig.MPESA_CONSUMER_SECRET,
        url: `${mpesaConfig.MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`
      });

      const response = await axios.get(
        `${mpesaConfig.MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      console.log('Access token response:', response.data);
      return response.data.access_token;
    } catch (error) {
      console.error('Access token error details:', {
        error: error.message,
        response: error.response?.data,
        config: error.config
      });
      throw new Error('Failed to get access token');
    }
  }

  async initiateSTKPush(phoneNumber, amount, orderId) {
    try {
      console.log('Starting STK push with:', { phoneNumber, amount, orderId });
      
      const accessToken = await this.getAccessToken();
      console.log('Got access token:', accessToken);

      const timestamp = moment().format('YYYYMMDDHHmmss');
      const password = Buffer.from(
        `${mpesaConfig.MPESA_SHORTCODE}${mpesaConfig.MPESA_PASSKEY}${timestamp}`
      ).toString('base64');

      const requestBody = {
        BusinessShortCode: mpesaConfig.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amount),
        PartyA: phoneNumber,
        PartyB: mpesaConfig.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: mpesaConfig.CALLBACK_URL,
        AccountReference: `ORDER${orderId}`,
        TransactionDesc: "Payment for pastry order"
      };

      console.log('STK Push Request:', {
        url: `${mpesaConfig.MPESA_API_URL}/mpesa/stkpush/v1/processrequest`,
        body: requestBody,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const response = await axios.post(
        `${mpesaConfig.MPESA_API_URL}/mpesa/stkpush/v1/processrequest`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('STK Push Response:', response.data);
      
      return {
        status: 'success',
        data: {
          CheckoutRequestID: response.data.CheckoutRequestID,
          CustomerMessage: response.data.CustomerMessage,
          ResponseDescription: response.data.ResponseDescription,
          MerchantRequestID: response.data.MerchantRequestID,
          ResponseCode: response.data.ResponseCode,
          orderId
        }
      };

    } catch (error) {
      console.error('STK Push error details:', {
        error: error.message,
        response: error.response?.data,
        config: error.config,
        stack: error.stack
      });
      throw new Error('Failed to initiate M-Pesa payment');
    }
  }
}

module.exports = new MpesaService();
