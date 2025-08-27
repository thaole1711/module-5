import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserById } from "../redux/Actions.js";

 function UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    return (
        <div style={{ padding: "20px" }}>
            <h2>User Management</h2>
            <button onClick={() => dispatch(fetchUsers())}>Get Users</button>
            <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u,index) => (
                    <tr key={u.id}>
                        <td>{index+1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.website}</td>
                        <td>
                            <button onClick={() => dispatch(deleteUserById(u.id))}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserList