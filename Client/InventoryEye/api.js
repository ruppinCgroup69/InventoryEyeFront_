import axios from 'axios';

const BASE_URL = "https://proj.ruppin.ac.il/cgroup69/prod/api";

export async function POST(url, obj) {
    try {
        let res = await axios.post(`${BASE_URL}/${url}`, obj,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        console.log('data ==> ', res);
        if (res.status == 200 || res.status == 201) {
            return {date:res.data,ok:true}
        }
        else{
            return false
        }

    } catch (error) {
        console.error({ error });
        throw error;
    }
}

export async function GET(url) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        //הסטטוס הוא לא מקבוצת 200
        if (!res.ok) {
            console.log({ res });
            return;
        }

        let data = await res.json();
        return data;

    } catch (error) {
        console.error({ error });
    }

}

export async function PUT(url, obj) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (!res.ok) {
            console.log({ res });
            return { ok: false }; // Return an object with ok: false for error responses
        }

        // Check if the response body exists before parsing
        let data = null;
        if (res.headers.get('Content-Length') !== '0') {
            data = await res.json();
        }

        // Return the parsed data along with the ok status
        return { ok: true, data };

    } catch (error) {
        console.error({ error });
        return { ok: false }; // Return an object with ok: false in case of a catch error
    }
}



export async function DELETE(url) {
    try {
        let res = await axios.delete(`${BASE_URL}/${url}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        console.log('data ==> ', res);
        if (res.status == 200 ) {
            return {date:res.data,ok:true}
        }
        else{
            return false
        }

    } catch (error) {
        console.error({ error });
        throw error;
    }
}
