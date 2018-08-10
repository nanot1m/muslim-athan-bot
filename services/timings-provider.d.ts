import { Timings } from "./timings";
import { GeoLocation } from "./geo-location";

export interface TimingsProvider {
  timingsByLocation(location: GeoLocation): Promise<Timings>;
  timingsByCity(city: string): Promise<Timings>;
}
