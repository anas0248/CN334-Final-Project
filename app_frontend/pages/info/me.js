import { useState, useEffect } from 'react'
export default function myInfo() {
    const [info, setInfo] = useState(null)
    const [info_list, setInfoList] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem("jwt_access");
        console.log("Token:", token);

        fetch(`http://127.0.0.1:3342/profile/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setInfo(data);
                    const listItems = Object.keys(data.data).map((key) => {
                        const value = data.data[key];
                        return (
                            <li key={key}>
                                <strong>{key}:</strong>{" "}
                                {typeof value === "object" && value !== null
                                    ? <pre>{JSON.stringify(value, null, 2)}</pre>
                                    : value}
                            </li>
                        );
                    });
                    setInfoList(listItems);
                } else {
                    setInfo(null);
                    setInfoList([]);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch info:", err);
                setInfo(null);
                setInfoList([]);
            });
    }, []);

    if (!info) return <p>No profile data</p>
    else return (
        <main
            className='flex min-h-screen flex-col items-center justify-between'
        >
            <div style={{ fontSize: "64px" }}
                className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                <div>{info.data.username} Info</div>
                <div>
                    {info_list}
                </div>
            </div>
        </main>);
}