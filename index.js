let buttons = document.querySelectorAll('.btn');
let allUsers = document.querySelector('#all-users');
let specificUserInput = document.querySelector('#userId-input');
let specificUser = document.querySelector('#specific-user');
let newUserInput = document.querySelector('#name-input');
let newUser = document.querySelector('#new-user');

buttons.forEach(btn => btn.addEventListener('click', e => { update(e.target.id); }));

const update = target => {
    switch(target) {
        case 'btn-all-users':
            fetch('https://5f5260d0-2a7c-4cf8-b4f3-564684faf4d5.mock.pstmn.io/users')
                .then( res => { return res.json(); } )
                .then( data => { allUsers.innerText = JSON.stringify(data, undefined, 4); })
                .catch( err => { console.log('Encountered error', err); } );
            
            break;
        case 'btn-specific-user':
            fetch(`https://5f5260d0-2a7c-4cf8-b4f3-564684faf4d5.mock.pstmn.io/users?userid=${specificUserInput.value}`)
                .then( res => { return res.json(); } )
                .then( data => { specificUser.innerText = JSON.stringify(data, undefined, 4); })
                .catch( err => { console.log('Encountered error', err); } );

            break;
        default:
            let new_id = Math.floor(Math.random() * 90000) + 10000;

            const newUserEntry = {
                "userid": new_id,
                "username": newUserInput.value,
                "status": "new"
            }

            console.log(JSON.stringify(newUserEntry));

            fetch('https://5f5260d0-2a7c-4cf8-b4f3-564684faf4d5.mock.pstmn.io/users', {
                method: 'POST',
                body: JSON.stringify(newUserEntry)
            })
                .then( res => { return res.json(); } )
                .then( data => {
                    console.log(data);
                    newUser.innerText = `New user, ${newUserEntry.username}, added.\n\n`;
                    newUser.innerText += JSON.stringify(data, undefined, 4);
                })
                .catch( err => { console.log('Encountered error', err) } );
    }
}