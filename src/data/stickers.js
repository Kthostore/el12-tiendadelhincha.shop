// stickers.js – ahora trae productos reales desde Google Sheets

export async function getStickers() {
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyRxxSX0NqJtF49LUBmbJkcB3wz8E5QcoALXwPgFBUK7InTFdjOUnN7zooEXLYfIfyQ/exec";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    }));
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}
