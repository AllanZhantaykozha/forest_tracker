export const getStreetName = async (
  lat: number,
  lng: number
): Promise<string> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  const data = await response.json();
  return data.address?.road || "Улица не найдена";
};
