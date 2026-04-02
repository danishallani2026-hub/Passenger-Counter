let countEl = document.getElementById("count-el"); // pass in arguments
let saveEl = document.getElementById("save-el");
let totalEl = document.getElementById("total-el");
const entriesLabel = "Previous entries: ";

let count = 0;
let entries = [];
let totalPassengers = 0;

let saveBtn = document.getElementById("save-btn");

// Load previous entries from localStorage
let savedEntries = localStorage.getItem("entries");
let savedTotal = localStorage.getItem("totalPassengers");

if (savedEntries) {
    saveEl.textContent = savedEntries;

    // rebuild entries array from saved text
    let entriesText = savedEntries.replace(entriesLabel, "").trim();
    if (entriesText !== "") {
        entries = entriesText.split(" - ").map(Number).filter(num => !isNaN(num));
    }
}

if (savedTotal) {
    totalPassengers = Number(savedTotal);
    totalEl.textContent = "Total passengers: " + totalPassengers;
}

saveBtn.disabled = true;

function increment() {
    count++;
    countEl.textContent = count;

    saveBtn.disabled = false;
}

function save() {
    // Prevent saving when count is 0
    if (count === 0) {
        return;
    }

    entries.push(count);
    totalPassengers += count;

    saveEl.textContent = entriesLabel + entries.join(" - ");
    totalEl.textContent = "Total passengers: " + totalPassengers;

    // Save entries to localStorage
    localStorage.setItem("entries", saveEl.textContent)
    localStorage.setItem("totalPassengers", totalPassengers);

    count = 0;
    countEl.textContent = count;

    saveBtn.disabled = true;
}

function reset() {
    count = 0;
    countEl.textContent = count;
    saveEl.textContent = entriesLabel;

    entries.length = 0; // Clears the array
    totalEl.textContent = "Total passengers: 0";
    totalPassengers = 0;

    saveBtn.disabled = true;

    localStorage.removeItem("entries");
    localStorage.removeItem("totalPassengers");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "space") {
        event.preventDefault();
        increment();
    }
});
