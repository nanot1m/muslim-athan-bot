// @ts-check

const axios = require("axios").default;

const API_URL = "http://api.aladhan.com/";

/**
 * @typedef {object} AladhanResponse
 * @property {number} code
 * @property {string} status
 * @property {T} data
 * @template T
 */

/**
 * @typedef {object} AladhanTiming
 * @property {Object.<string, string>} timings
 */

// http://api.aladhan.com/v1/timings/1398332113?latitude=51.508515&longitude=-0.1254872&method=2
exports.AladhanService = class AladhanService {
  constructor(method = 2) {
    this.http = axios.create({ baseURL: API_URL });
    this.method = method;
  }

  /**
   * @param {number} method
   */
  setMethod(method) {
    this.method = method;
  }

  /**
   * @param {{latitude: number, longitude: number}} location
   * @returns {import('axios').AxiosPromise<AladhanResponse<AladhanTiming>>}
   */
  timings({ latitude, longitude }) {
    return this.http.get(`v1/timings`, {
      params: {
        latitude,
        longitude,
        method: this.method
      }
    });
  }
};
