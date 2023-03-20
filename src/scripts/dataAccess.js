const applicationState = {

}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())//after returning the promise, convert to js
        .then(//take the js as an initial parameter. 
            (serviceRequests) => {
                // Store the external state in application state local db
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`) //run the fetch job to get plumbers and return promise to get plumbers 
        .then(response => response.json())// take the fetch plumbers promise and invoke json conversion to javascript method
        .then( // take the javascript output and save the actual data in the application state plumbers database
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const sendRequest = (userServiceRequest) => { //creates a send request, take user input obj from service form
    const fetchOptions = {
        method: "POST",// different types, post submits an entity to specified resource 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest) 
    }


    return fetch(`${API}/requests`, fetchOptions) 
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendComplete = (completedRequest) => { //creates a send request, take user input obj from service form
    const fetchOptions = {
        method: "POST",// different types, post submits an entity to specified resource 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest) 
    }


    return fetch(`${API}/completions`, fetchOptions) 
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = ()=>{
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (data) => {
        applicationState.completions = data
        }
    )
}




const mainContainer = document.querySelector("#container")
//delete button
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}






export const getRequests =()=>{
    return applicationState.requests.map(requests =>({...requests}))// export statement for requests 
}
export const getPlumbers = ()=>{
    return applicationState.plumbers.map(plumbers =>({...plumbers}))// export statement for plumbers data
}
export const getCompletions = ()=>{
    return applicationState.completions.map(completions =>({...completions}))
}