// @ts-check

exports.Timings = class Timings {
  /**
   * @param {string} fajr
   * @param {string} dhuhr
   * @param {string} asr
   * @param {string} maghrib
   * @param {string} isha
   * @param {string} imsak
   */
  constructor(fajr, dhuhr, asr, maghrib, isha, imsak) {
    this._fahr = fajr;
    this._dhuhr = dhuhr;
    this._asr = asr;
    this._maghrib = maghrib;
    this._isha = isha;
    this._imsak = imsak;
  }

  toMarkdownString() {
    return [
      `*Fajr*: ${this._fahr}`,
      `*Dhuhr*: ${this._dhuhr}`,
      `*Asr*: ${this._asr}`,
      `*Maghrib*: ${this._maghrib}`,
      `*Isha*: ${this._isha}`
    ].join("\n");
  }
};
