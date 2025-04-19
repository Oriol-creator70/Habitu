const fs = require("fs").promises;
const path = require("path");

// Archivo para almacenar hábitos
const habitsFile = path.join(__dirname, "habits.json");

// Cargar hábitos desde el archivo
async function loadHabits() {
    try {
        const data = await fs.readFile(habitsFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe, inicia con un array vacío
        return [];
    }
}

// Guardar hábitos en el archivo
async function saveHabits(habits) {
    await fs.writeFile(habitsFile, JSON.stringify(habits, null, 2));
}

// Simulación de las funciones de la PWA
let habits = [];

async function init() {
    habits = await loadHabits();
}

async function addHabit(habitName) {
    if (habitName) {
        habits.push({ name: habitName, count: 0 });
        await saveHabits(habits);
    }
}

async function incrementCount(index) {
    if (habits[index]) {
        habits[index].count++;
        await saveHabits(habits);
    }
}

function displayHabits() {
    habits.forEach((habit, index) => {
        console.log(`${habit.name}: ${habit.count} días`);
    });
}

// Ejemplo de uso
async function main() {
    await init();
    await addHabit("No fumar");
    await incrementCount(0);
    displayHabits();
}

main();