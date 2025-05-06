/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a risk level.
 */
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

/**
 * Represents a alert information.
 */
export interface Alert {
  /**
   * The risk level.
   */
  riskLevel: RiskLevel;
  /**
   * A description of the alert.
   */
  description: string;
}

/**
 * Asynchronously retrieves alert information for a given location.
 *
 * @param location The location for which to retrieve alert data.
 * @returns A promise that resolves to a Alert object containing risk level and a description.
 */
export async function getAlert(location: Location): Promise<Alert> {
  // TODO: Implement this by calling an API.

  return {
    riskLevel: 'LOW',
    description: 'No current alerts for this location.',
  };
}
