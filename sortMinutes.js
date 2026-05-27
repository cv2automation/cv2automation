(async () => {

  const jsonURL =
    "https://cdn.jsdelivr.net/gh/cv2automation/cv2automation@main/archive.json";

  const monthOrder = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };

  // Create container
  const container = document.createElement("div");

  // Header
  const header = document.createElement("h2");
  header.textContent = "Archives";

  container.appendChild(header);

  // List
  const list = document.createElement("ul");

  container.appendChild(list);

  // Add to page
  document.body.appendChild(container);

  try {

    const response = await fetch(jsonURL);

    if (!response.ok) {
      throw new Error("Failed to fetch JSON");
    }

    const archiveData = await response.json();

    // Sort newest first
    archiveData.sort((a, b) => {

      if (b.Year !== a.Year) {
        return b.Year - a.Year;
      }

      return monthOrder[b.Month] - monthOrder[a.Month];
    });

    // Render links
    archiveData.forEach(item => {

      const li = document.createElement("li");

      const link = document.createElement("a");

      link.href = item.Link;

      link.textContent = `${item.Month} ${item.Year}`;

      link.target = "_blank";

      li.appendChild(link);

      list.appendChild(li);

    });

  } catch (error) {

    console.error(error);

    list.innerHTML = "<li>Failed to load archives.</li>";

  }

})();
