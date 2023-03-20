import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers, deleteRequest, fetchCompletions } from "./dataAccess.js"


const mainContainer = document.querySelector("#container") //item to select on html doc

const render = () => {
    fetchRequests()//fetch the requests data 
    .then(() => fetchPlumbers()) // then after fetching the request data then fetch the plumbers data
    .then(()=> fetchCompletions()) // fetch the completions data after the requests and the plumbers data
    .then(// once done then generate the html page using the sinkRepair function 
    ()=>{   mainContainer.innerHTML = SinkRepair()
    }
        )}

render()//invoke the function outlined above

mainContainer.addEventListener(
    "stateChanged",// listen for a "statechanged"
    customEvent => {// once heard run this function to regen the page.
        render()
    }
)