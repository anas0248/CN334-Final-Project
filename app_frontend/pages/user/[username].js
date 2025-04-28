import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserDetail() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { username } = router.query;
    console.log(username);

    useEffect(() => {
        if (!username) return;

        fetch(`http://127.0.0.1:3342/api/user/${username}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch user info.");
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message);
                setUser(null);
            });
    }, [username]);

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading user data...</p>;

    return (
        <main className='flex min-h-screen flex-col items-center justify-between'>
            <div style={{ fontSize: "64px" }} className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                <div>User Details</div>
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleString()}</p>
                </div>
            </div>
        </main>
    );
}
