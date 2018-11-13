import { handleResponse } from '../utils/responseHandler';

export function getVehicles(queryString='') {
  return fetch(
      `http://localhost:3004/vehicles/${queryString}`,
      {
        method: "GET",
      }
    )
    .then(handleResponse);
}