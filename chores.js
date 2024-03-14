const peopleInput = document.querySelector('.column:first-child input');
const peopleList = document.querySelector('.column:first-child ul');
const choresInput = document.querySelector('.column:last-child input');
const choresList = document.querySelector('.column:last-child ul');
const assignBtn = document.querySelector('.assign-btn');
const resultList = document.querySelector('.result-list');

function addItem(input, list, itemType) {
  const itemText = input.value.trim();
  if (itemText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = itemText;
    li.appendChild(span);

    const removeBtn = document.createElement('span');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      list.removeChild(li);
    });
    li.appendChild(removeBtn);

    list.appendChild(li);
    input.value = '';
  }
}

document.querySelectorAll('.add-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.parentNode.querySelector('input');
    const list = btn.parentNode.parentNode.querySelector('ul');
    const itemType = btn.parentNode.parentNode.querySelector('h2').textContent.toLowerCase();
    addItem(input, list, itemType);
  });
});

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const btn = input.parentNode.querySelector('.add-btn');
      const list = input.parentNode.parentNode.querySelector('ul');
      const itemType = input.parentNode.parentNode.querySelector('h2').textContent.toLowerCase();
      addItem(input, list, itemType);
      input.focus();
    }
  });
});

assignBtn.addEventListener('click', () => {
  resultList.innerHTML = '';
  const people = Array.from(peopleList.querySelectorAll('li')).map((li) => li.querySelector('span').textContent);
  const chores = Array.from(choresList.querySelectorAll('li')).map((li) => li.querySelector('span').textContent);

  if (chores.length > 0) {
    const assignments = {};

    // Shuffle the chores array
    chores.sort(() => Math.random() - 0.5);

    while (chores.length > 0) {
      for (let i = 0; i < people.length; i++) {
        const person = people[i];

        if (!assignments[person]) {
          assignments[person] = [];
        }

        // Assign a random remaining chore to the current person
        if (chores.length > 0) {
          const choreIndex = Math.floor(Math.random() * chores.length);
          assignments[person].push(chores[choreIndex]);
          chores.splice(choreIndex, 1);
        }
      }
    }

    for (const person in assignments) {
      const li = document.createElement('li');
      li.textContent = `${person}: ${assignments[person].join(', ')}`;
      resultList.appendChild(li);
    }
  }
});
