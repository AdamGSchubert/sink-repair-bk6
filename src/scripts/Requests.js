import { getRequests, deleteRequest, getPlumbers, sendRequest, sendComplete } from "./dataAccess.js"//

// const plumbers = getPlumbers()

//need a function to convert serrvice request to html rep 
// needs to be wrapped in a li tag
// show only the description 
//return the html rep

const convertRequestToListElement = (request)=>{
     return `
    <li>
${request.description/*grabs the description from the requets and enters it herel*/} 
        ${Plumbers(request)/* takes the plumbers function and the request as imput */}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
`
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${//generates li html element of requests 
                requests.map(convertRequestToListElement).join("") //itterates over requests, invokes the funct convertRequestToListElement as the funtion for map() 
            }
        </ul>
    `

    return html
}


export const Plumbers =(request)=>{
    const plumbers = getPlumbers()// get the plumbers after the plumbers function is called (keeps out of global scope, limiting when the call is done)
    let html = `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(//creates new plumbers array with the function return below.
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>`
return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

           
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: new date().toLocalDateString("en-US")
             }
             

            sendComplete(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)