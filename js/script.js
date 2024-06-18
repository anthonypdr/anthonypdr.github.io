// DOM elements
const terminal = document.getElementById('terminal');
const outputDiv = document.getElementById('output');
const commandForm = document.getElementById('commandForm');
const commandInput = document.getElementById('commandInput');

function focusInput() {
    commandInput.focus();
}

// Event listener for form submission
commandForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const command = commandInput.value.trim(); // Get command input
    commandInput.value = ''; // Clear input field

    if (command === '') {
        return;
    }

    // Process the command
    processCommand(command);
});

// Function to process the entered command
function processCommand(command) {
    let output = '';

    switch (command) {
        case 'help':
            output = 'List of available commands:\n\n' +
                'help - Display this help message\n' +
                'cls - Clear the terminal screen\n' +
                'date - Display current date and time\n' +
                'prof - Display information about me\n' +
                'proj - Display all my projects\n' +
                'sweb - Display the link of my main website\n' +
                'about - Display information about this terminal';
            break;
        case 'cls':
            outputDiv.textContent = '';
            return;
        case 'date':
            output = new Date().toLocaleString();
            break;
        case 'prof':
            output = 'None at this moment.';
            break;
        case 'proj':
            output = 'No projects available.';
            break;
        case 'sweb':
            output = 'https://designwithtony.com';
            break;
        case 'about':
            output = 'This is a simple terminal interface created using HTML, CSS, and JavaScript.';
            break;
        default:
            output = `Command not found: ${command} \n> Type 'help' for a list of commands.`;
    }

    displayOutput(output);
}

// Function to display output in the terminal
function displayOutput(output) {
    outputDiv.textContent += '> ' + output + '\n';
    outputDiv.scrollTop = outputDiv.scrollHeight;
    terminal.scrollTop = terminal.scrollHeight;// Scroll to bottom
}

// Initial greeting message
displayOutput('Welcome to my Sub Portfolio, here you can browse about me and projects I recently\u00A0created.');
displayOutput('Type \'help\' for a list of commands.');