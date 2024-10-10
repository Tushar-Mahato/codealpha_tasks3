const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('project-list');

let projects = [];

// Handle form submission
projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const goal = document.getElementById('goal').value;

    // Create a new project object
    const project = {
        title,
        description,
        goal,
        currentFunding: 0,
        updates: []
    };

    // Add project to the list
    projects.push(project);
    displayProjects();
    
    // Clear the form
    projectForm.reset();
});

// Display projects
function displayProjects() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Funding Goal: $${project.goal}</p>
            <p>Current Funding: $${project.currentFunding}</p>
            <button onclick="contribute(${index})">Contribute</button>
            <div class="updates">
                <h4>Updates</h4>
                <ul id="updates-${index}"></ul>
                <input type="text" id="update-${index}" placeholder="Add an update" />
                <button onclick="addUpdate(${index})">Add Update</button>
            </div>
        `;
        projectList.appendChild(projectDiv);
    });
}

// Contribute to a project
function contribute(index) {
    const amount = prompt("Enter contribution amount:");
    if (amount) {
        projects[index].currentFunding += parseFloat(amount);
        displayProjects();
    }
}

// Add project update
function addUpdate(index) {
    const updateInput = document.getElementById(`update-${index}`);
    const updateText = updateInput.value;
    if (updateText) {
        projects[index].updates.push(updateText);
        const updatesList = document.getElementById(`updates-${index}`);
        const updateItem = document.createElement('li');
        updateItem.textContent = updateText;
        updatesList.appendChild(updateItem);
        updateInput.value = '';
    }
}
