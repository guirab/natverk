export async function listProvedores() {
  try {
    const response = await fetch("http://localhost:3001/api/provedores");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
