import { useState } from 'react';
import './UsersList.css';
const UsersList = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        usertype: 'Admin'
    });

    const [users, setUsers] = useState([]);

    const [allUsers, setAllUsers] = useState([]);


    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData(prevDataForm => ({ ...prevDataForm, [name]: target.value }))
    };

    const setUser = (e) => {
        e.preventDefault();

        const baseUsers = [...allUsers, { ...formData, id: Date.now() }]
        setUsers(baseUsers);
        setAllUsers(baseUsers);
        console.log(baseUsers);
    };

    const removeUser = (id) => {
        const filteredUsers = allUsers.filter(user => user.id !== id)
        setUsers(filteredUsers);
        setAllUsers(filteredUsers)
    };

    const userSelection = (type) => {
        const selection = allUsers.filter(user => user.usertype === type)
        setUsers(selection);
    };

    const showAllUsers = () => {
        setUsers(allUsers);
    };

    return (
        <div className="usersList">
            <form onSubmit={setUser}>
                <label htmlFor="username">User name</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="User name"
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <label htmlFor="email">User email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="User email"
                    onChange={handleInputChange}
                    value={formData.email}
                />
                <label htmlFor="usertype">User type</label>
                <select id="usertype" name="usertype" onChange={handleInputChange}>
                    <option value="Admin" >Admin</option>
                    <option value="User" >User</option>
                </select>
                <button>Save</button>
            </form>
            <div className="buttonsPanel">
                <button onClick={() => userSelection('Admin')}>Wyświetl tylko adminów</button>
                <button onClick={() => userSelection('User')}>Wyświetl tylko userów</button>
                <button onClick={showAllUsers}>Wyświetl wszystkich</button>
            </div>
            <div className="list">
                {users.map(user => {
                    return <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.usertype}</p>
                    </div>
                })}
            </div>
        </div>
    );
};
export default UsersList;