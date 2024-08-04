import { Tasks, loadingRenderedTasks } from "./tasks.js";

let fetchData = [];

const baseIPAddress = "http://192.168.48.136:8080"

//////////////////////////////////////////////////////
export async function apiGet(path) {
    try {
        const response = await fetch(baseIPAddress + path);
        const data = await response.json();
        fetchData = data;
        return fetchData;
    } catch (error) {
        console.error('Error fetching data from the server:', error);
        return [];
    }
}

//////////////////////////////////////////////////////
export async function apiPost(path, apirequestbody) {
    try {
        const response = await fetch(baseIPAddress + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apirequestbody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

//////////////////////////////////////////////////////


export async function apiUpdate(path, apirequestbody) {

    try {
        const response = await fetch(baseIPAddress + path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apirequestbody)
        })
        if (!response.ok){
            throw new Error("Response not Ok");
        }
    }catch(error){
        console.log("Error Occured during the updating process")
    }

}



//////////////////////////////////////////////////////
export async function apiDelete(path) {
    try {
        const response = await fetch(baseIPAddress + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            // throw new Error("Response not Ok");
        }
    } catch (error) {
        console.log("Error Occured during the deleting process")
        throw error;
    }
}
//////////////////////////////////////////////////////
