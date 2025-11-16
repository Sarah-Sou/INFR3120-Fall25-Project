function createHabit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let frequency = document.getElementById("frequency").value;
    let status = document.getElementById("status").value;

    if (!name) {
        alert("Please enter a habit name.");
        return;
    }

    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    habits.push({
        name: name,
        frequency: frequency,
        status: status
    });

    localStorage.setItem("habits", JSON.stringify(habits));

    window.location = "index.html";
}

function loadHabits() {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    let table = document.getElementById("habitTable");

    habits.forEach((habit, index) => {
        let row = table.insertRow(-1);

        row.insertCell(0).innerText = habit.name;
        row.insertCell(1).innerText = habit.frequency;
        row.insertCell(2).innerText = habit.status;
        row.insertCell(3).innerHTML = `
            <button onclick="viewHabit(${index})">View</button>
        `;
    });
}

function viewHabit(index) {
    localStorage.setItem("selectedHabit", index);
    window.location = "view.html";
}

function loadViewHabit() {
    let index = localStorage.getItem("selectedHabit");
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    let habit = habits[index];

    document.getElementById("details").innerHTML = `
        <p><strong>Name:</strong> ${habit.name}</p>
        <p><strong>Frequency:</strong> ${habit.frequency}</p>
        <p><strong>Status:</strong> ${habit.status}</p>
    `;
}

function deleteHabit() {
    let index = localStorage.getItem("selectedHabit");
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    window.location = "index.html";
}
