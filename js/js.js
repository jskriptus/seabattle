const record = document.querySelector('#record');
const shot = document.querySelector('#shot');
const hit = document.querySelector('#hit');
const dead = document.querySelector('#dead');
const emeny = document.querySelector('#enemy');
const again = document.querySelector('#again');
const title = document.querySelector('.header');

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
};

// Добавление кораблей и методов к ним
const game = {
    ships: [ 
        {
            location: ['26', '36', '46', '56'],
            hit: ['', '', '', '']
        }, 
        {
            location: ['11', '12', '13'],
            hit: ['', '', '']
        }, 
        {
            location: ['69', '79'],
            hit: ['', '']
        },
        {
            location: ['32'],
            hit: ['']
        }
    ],
    shipCount: 4,
};

const show = { 
    hit (elem) {
        this.changeClass(elem, 'hit')
    },
    miss (elem) {
        this.changeClass(elem, 'miss');
    },
    dead (elem) {
        this.changeClass(elem, 'dead');
    }, 
    changeClass(elem, value) {
        elem.className = value;
    }
};



const fire = () => {
    
    if (title.textContent !== 'Игра окончена!') {
    
        const target = event.target; // записываем в переменную выбранную ячейку
        
        if (target.classList.length > 0 || target.tagName !== 'TD') {
            return;
        }

        show.miss(target);
        play.updateData = 'shot';


        for (let i = 0; i < game.ships.length; i++) {

            const ship = game.ships[i];
            const index = ship.location.indexOf(target.id);

            if (index >= 0) {
                show.hit(target);
                play.updateData = 'hit';
                ship.hit[index] = 'x';

                const live = ship.hit.indexOf('');

                if (live < 0) {
                    play.updateData = 'dead';

                    for (const id of ship.location) {
                        show.dead(document.getElementById(id));
                    }

                    game.shipCount -= 1;

                    if (game.shipCount < 1) {
                        title.textContent = 'Игра окончена!';
                        title.style.color = 'red';

                        if (play.shot < play.record || play.record === 0) {
                            localStorage.setItem('seaBattleRecord', play.shot); // сохраняем колличество выстрелов в localStorage
                            play.record = play.shot; // Записываем колличество выстрелов и выводим на странице результат
                            play.render();
                        }
                    }
                }
            }
        }
    }
};


const init = () => {
    enemy.addEventListener('click', fire)
    play.render();

    again.addEventListener('click', () => {
        location.reload();
    })
};

init();