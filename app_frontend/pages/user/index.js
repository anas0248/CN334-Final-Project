import { useState, useEffect } from 'react';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:3342/api/user/all`)  // สมมติ API ของคุณส่งข้อมูล users ทั้งหมด
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch users.");
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data); // สมมติ data เป็น array ของ user objects
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message);
            });
    }, []);

    if (error) return <p>{error}</p>;
    if (!users.length) return <p>Loading users...</p>;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-6">All Users</h1>
            <div className="w-full max-w-4xl">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Username</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Date Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(user.date_joined).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
