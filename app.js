async function getInfo() {
  const stopNameElement = document.getElementById("stopName");
  const timeTableElement = document.getElementById("buses");
  const stopID = document.getElementById("stopId").value;
  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

  try {
    stopNameElement.textContent = "Loading";
    timeTableElement.replaceChildren();
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("Stop ID not found!");
    }
    const data = await response.json();

    stopNameElement.textContent = data.name;
    Object.entries(data.buses).forEach((bus) => {
      const liElement = document.createElement("li");
      liElement.textContent = `Bus ${bus[0]} arrives in ${bus[1]}`;
      timeTableElement.appendChild(liElement);
    });
  } catch (error) {
    stopNameElement.textContent = "Error";
  }
}
