import axios from "axios";

const BASE_URL = "https://proj.ruppin.ac.il/cgroup69/prod/api";

export async function POST(url, obj) {
    try {
        let {data} = await axios({
            method: 'post',
            url: `${BASE_URL}/${url}`,
            data: obj
        });
        console.log(data)
    }
    catch (err) {
        console.error({ err })
    }
    // try {
    //     let res = await fetch(`${BASE_URL}/${url}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(obj)
    //     });
    //     //הסטטוס הוא לא מקבוצת 200
    //     if (!res.ok) {
    //         console.log({ res });
    //         return;
    //     }
    //     try {
    //         return await res.json();
    //     }
    //     catch {
    //         console.log('hello')
    //         let t= await res.text()
    //         console.log('this is' ,t)
    //         return res
    //     }

    // } catch (error) {
    //     console.error({ error });
    // }
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

export async function DELETE(url) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`, {
            method: 'DELETE',
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
