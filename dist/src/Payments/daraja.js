// src/payments/daraja.ts
import axios from 'axios';
const config = {
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    shortCode: process.env.MPESA_SHORTCODE,
    passkey: process.env.MPESA_PASSKEY,
    callbackUrl: process.env.MPESA_CALLBACK_URL,
    baseUrl: 'https://sandbox.safaricom.co.ke', // Use production when live
};
export async function getAccessToken() {
    const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');
    const res = await axios.get(`${config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: { Authorization: `Basic ${auth}` },
    });
    return res.data.access_token;
}
export async function stkPush(phone, amount, accountRef = 'CHUKUARIDE') {
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(config.shortCode + config.passkey + timestamp).toString('base64');
    const payload = {
        BusinessShortCode: config.shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: config.shortCode,
        PhoneNumber: phone,
        CallBackURL: config.callbackUrl,
        AccountReference: accountRef,
        TransactionDesc: 'Payment for car rental',
    };
    const res = await axios.post(`${config.baseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
}
