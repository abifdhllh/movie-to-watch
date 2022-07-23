import axios from 'axios';
import {ToastAndroid} from 'react-native';

// Initiate Base URL
const api = axios.create({
  baseURL: 'https://recruitment-test.flip.id',
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 1000,
});

// API Request List
export const apiGetTransactionList = (params: any) =>
  api.get('/frontend-test', {params}).catch(error => {
    if (!error.status) {
      ToastAndroid.show(
        'Koneksi Error. Mohon cek kembali koneksimu.',
        ToastAndroid.SHORT,
      );
    }
    return {status: 400};
  });
