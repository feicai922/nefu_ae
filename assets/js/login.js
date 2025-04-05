const baseUrl = 'http://47.104.216.97:8080/user';

async function getUser() {
    const account = document.getElementById('getAccount').value;
    const response = await fetch(`${baseUrl}/${account}`);
    const user = await response.json();
    document.getElementById('getUserResult').textContent = JSON.stringify(user, null, 2);
}

async function addUser() {
    const account = document.getElementById('addAccount').value;
    const password = document.getElementById('addPassword').value;
    const name = document.getElementById('addName').value;

    const user = { account, password, name };
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.text();
    document.getElementById('addUserResult').textContent = result;
}

async function updateUser() {
    const account = document.getElementById('updateAccount').value;
    const password = document.getElementById('updatePassword').value;
    const name = document.getElementById('updateName').value;

    const user = { account, password, name };
    const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.text();
    document.getElementById('updateUserResult').textContent = result;
}

async function deleteUser() {
    const account = document.getElementById('deleteAccount').value;
    const response = await fetch(`${baseUrl}/${account}`, {
        method: 'DELETE'
    });
    const result = await response.text();
    document.getElementById('deleteUserResult').textContent = result;
}