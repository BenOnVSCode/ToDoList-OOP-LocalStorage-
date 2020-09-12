//DOM elements,


class Mission {
    constructor(title) {
        this.title = title ;
    }
}

class UI {
    static displayMissions() {
        const missions = Store.getMissions();


        missions.forEach((mission) => UI.addMissionToList(mission));
    }

    static addMissionToList(mission) {
        const list = document.querySelector('#mission-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${mission.title}</td>
            <td><a href="#"><i class="xmen fal fa-trash delete"></i></a></td>
            <td><a href="#"><i class="xhy fal fa-check check" ></i></a></td>
        `;

        list.appendChild(row);
    }
    

    static deleteMission(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.parentElement.remove();
        }
    }
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}` ;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#mission-form');
        container.insertBefore(div, form);


        setTimeout(() => document.querySelector('.alert').remove(), 1500)
    }

    static clearFields() {
        document.querySelector('#title').value = '';
    }
}

class Store {
    static getMissions() {
        let missions ;
        if(localStorage.getItem('missions') === null) {
            missions = [];
        }
        else {
            missions = JSON.parse(localStorage.getItem('missions'));
        }

        return missions

    }
    static addMission(mission) {
    const missions = Store.getMissions();

    missions.push(mission);
    localStorage.setItem('missions', JSON.stringify(missions));
        
    }
    static removeMission(title) {
        const missions = Store.getMissions();
        missions.forEach((mission, index) => {
            if(mission.title === title) {
                missions.splice(index, 1)
            }
        })


        localStorage.setItem('missions', JSON.stringify(missions));
    }
    static checkMission(title) {
        const missions = Store.getMissions();
        missions.forEach((mission, index) => {
            if(mission.title === title) {
                missions.splice(index, 1)
            }
        })


        localStorage.setItem('missions', JSON.stringify(missions));
    }
    
}






document.addEventListener('DOMContentLoaded', UI.displayMissions);

document.querySelector('#mission-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;

    if(title === '') {
        UI.showAlert('Please fill in the field', 'danger')
    }
    else {
        const mission = new Mission(title);

        UI.addMissionToList(mission);

        Store.addMission(mission)

        UI.clearFields();


        
    }
    
});
document.querySelector('#mission-list').addEventListener('click', (e) => {
    const item = e.target;
        if(item.classList[0] === "xhy") {
            const todo = item.parentElement.parentElement.parentElement;
            todo.classList.toggle('completed');
            Store.checkMission(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent);
        }
        
       
        
})

document.querySelector('#mission-list').addEventListener('click', (e) => {
    const item = e.target ;
    if(item.classList[0] === "xmen") {
        UI.deleteMission(e.target);
        Store.removeMission(e.target.parentElement.parentElement.previousElementSibling.textContent);

    }
    
    

    
       
 
})









//Some styling, (i konw its easy with css);

style = () => {
    const h1 = document.querySelector('h1');
    const input = document.querySelector('input');
    const inputRow = document.querySelector('.input');
    const button = document.querySelector('button')
    h1.style.textAlign = 'center'
    h1.style.margin = '20px 0 20px 0'
    inputRow.style.textAlign = 'center';
    inputRow.style.margin = 'auto';
    inputRow.style.display = 'block' ;
    input.style.borderRadius = '0'
    input.style.border = 'solid 1px #DEE2E6';
    input.style.padding = '5px 100px 5px 0px' ;
    input.style.margin = '20px 0' ;

}

style();

