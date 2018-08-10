// @ts-check
const axios = require("axios").default;
const { Timings } = require("./timings");

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

/**
 * @typedef {import('./timings-provider').TimingsProvider} TimingsProvider
 * @typedef {import('./geo-location').GeoLocation} GeoLocation
 * @typedef {import('axios').AxiosPromise} AxiosPromise
 */

exports.AladhanService = class AladhanService {
  constructor(method = 2) {
    this.http = axios.create({ baseURL: API_URL });
    this.method = method;

    /** @type {TimingsProvider} */
    const inst = this;
  }

  /**
   * @param {number} method
   */
  setMethod(method) {
    this.method = method;
  }

  /**
   * @param {GeoLocation} location
   * @returns {Promise<Timings>}
   */
  timingsByLocation({ latitude, longitude }) {
    return this.http
      .get(`v1/timings`, {
        params: {
          latitude,
          longitude,
          method: this.method
        }
      })
      .then(x => aladhanResponseToTimings(x.data));
  }

  /**
   * @param {string} city
   * @returns {Promise<Timings>}
   */
  timingsByCity(city) {
    return this.http
      .get(`v1/timingsByCity`, {
        params: {
          city,
          country: "Russia",
          method: this.method
        }
      })
      .then(x => aladhanResponseToTimings(x.data));
  }
};

/**
 * @param {AladhanResponse<AladhanTiming>} response
 */
function aladhanResponseToTimings(response) {
  const timings = response.data.timings;
  return new Timings(
    timings.Fajr,
    timings.Dhuhr,
    timings.Asr,
    timings.Maghrib,
    timings.Isha,
    timings.Imsak
  );
}
