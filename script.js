// ------------------Login------------------

function login() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if(username === "admin" && password === "admin123") {

        localStorage.setItem("loggedIn", true)
        window.location.href = "dashboard.html"
    }
    else {
        alert("Invalid Credentials")
    }
}

// ------------------Global Storage-----------------

let allIssues = []

// -------------------Load issues-------------

async function loadIssues(type="all") {
    const container = document.getElementById("issuesContainer")

    //spinner
    container.innerHTML = `<div class = "col-span-4 flex justify-center py-10"><span class="loading loading-spinner loading-lg"></span></div>`

    setActiveTab(type)

   const res = await fetch("https://corsproxy.io/?https://phi-lab-server.vercel.app/api/v1/lab/issues")

    const result = await res.json()

//take 50 issues
allIssues = (result.data || []).slice(0, 50)

displayIssues(type)

document.getElementById("issuesCount").innerText = allIssues.length

}

// Active tab

function setActiveTab(type) {
    const tabs = document.querySelectorAll(".tab-btn")

    tabs.forEach(tab=>{
        tab.classList.remove("bg-blue-500", "text-white")
    })

    document.getElementById(`tab-${type}`).classList.add("bg-blue-600", "text-white")

}

// Display issues

function displayIssues(type) {
    const container = document.getElementById("issuesContainer")

    container.innerHTML = ""

    let filtered = allIssues

    if(type === "open"){
        filtered = allIssues.filter(issue=> issue.status === "open")
    }

    if(type === "close"){
        filtered = allIssues.filter(issue=> issue.status === "closed")
    }

    // update header+count

    const title = document.getElementById("issueTitle")

    if(type === "all"){
        title.innerHTML = `All Issues (${filtered.length})`
    }

    if(type === "open"){
        title.innerHTML = `Open Issues (${filtered.length})`
    }

    if(type === "close"){
        title.innerHTML = `Close Issues (${filtered.length})`
    }

    // cards

    filtered.forEach(issue=> {
        const borderColor =
        issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500"

        container.innerHTML +=`<div onclick= "openModal(${issue.id})" class = "card bg-white shadow-md hover:shadow-xl transition cursor-pointer p-4 border-t-4 ${borderColor}">

        <div class= "flex justify-between items-center mb-2">

        <span class = "badge ${issue.priority === "high"? "bg-red-100 text-red-700": issue.priority === "medium"? "bg-yellow-100 text-yellow-600": "bg-gray-200 text-gray-700"}">
        ${issue.priority}
        </span>

        </div>

        <h2 class = "font-semibold text-md mb-1">${issue.title}</h2>

        <p class = "text-sm text-gray-500 mb-3"> ${issue.description?.slice(0, 80)}</p>


        <div class = "flex gap-2 mb-3">

        ${issue.labels?.includes("bug")? `<span class = "badge bg-red-100 text-yellow-700">bug</span>`: ""}

        ${issue.labels?.includes("help wanted")? `<span class= "badge bg-yellow-100 text-yellow-600">help wanted</span>` : ""}

        ${issue.labels?.includes("enhancement")? `<span class= "badge bg-green-100 text-green-700"> enhancement</span>`: ""}

        </div>

        <hr class = "mb-2">

        <div class = "flex justify-between text-xs text-gray-500">

        <span>#${issue.id} ${issue.author}</span>

        <span>${issue.createdAt?.slice(0,10)}</span>

        </div>

        </div>`
    })
}

// ------------------Modal-----------------

function openModal(id){

    const issue = allIssues.find(i=>i.id===id) 

    const modal = document.getElementById("issueModal")
    const content = document.getElementById("modalContent")

    const labels = (issue.labels || []).map(label => `<span class="badge badge-outline">${label}</span>`).join("")

    content.innerHTML = `
    
    <h3 class= "text-xl font-bold mb-2">${issue.title}</h3>

    <div class= "flex items-center gap-2 mb-3">

    <span class = "badge ${issue.status === "open"? "bg-green-100 text-green-700": "bg-purple-100 text-purple-700"}">
    ${issue.status}
    </span>

    <span class = "text-sm text-gray-500">• Opened by ${issue.author} ${issue.createdAt?.slice(0 ,10)}
    </span>

    </div>

    <div class = "flex gap-2 mb-4">

    ${issue.labels?.includes("bug")?`<span class="badge bg-red-100 text-red-700">bug</span>` : ""}

    ${issue.labels?.includes("help wanted")? `<span class = "badge bg-yellow-100 text-yellow-600">help wanted</span>` : ""}

    ${issue.labels?.includes("enhancement")? `<span class = "badge bg-green-100 text-green-600">enhancement</span>` : ""}

    </div>

    <p class = "mb-4 text-gray-600">${issue.description}</p>

    <div class = "grid grid-cols-2 gap-4 mb-5">

    <div>
    <p class = "text-sm text-gray-500">Assignee:</p>
    <p class = "font-semibold">${issue.author}</p>
    </div>

    <div>
    <p class = "text-sm text-gray-500">Priority:</p>

    <span class = "badge ${issue.priority === "high"? "bg-red-100 text-red-700": issue.priority === "medium"? "bg-yellow-100 text-yellow-700": "bg-gray-200 text-gray-700"}">${issue.priority}</span>

    </div>

    </div>

    <button onclick = "document.getElementById('issueModal').close()"class ="btn bg-blue-600 text-white">Close</button>

    `
    modal.showModal?.() || modal.setAttribute("open","true")
}

document.body.classList.add("modal-open")


// search

function searchIssues() {

    const keyword = document.getElementById("searchInput").value.toLowerCase()

    const filtered = allIssues.filter(issue => issue.title.toLowerCase().includes(keyword)
    )

    displaySearch(filtered)

}

function displaySearch(list){

    const container = document.getElementById("issuesContainer")

    container.innerHTML = ""

    list.forEach(issue =>{
        const borderColor = issue.status === "open"? "border-green-500": "border-purple-500"

        container.innerHTML += `
        <div onclick= "openModal(${issue.id})" class = "card bg-white shadow-md hover:shadow-xl transition border-t-4 p-4 ${borderColor} cursor-pointer">

        <div class= "flex justify-between items-center mb-2">

        <span class =" badge ${issue.priority === "high"? "bg-red-100 text-red-700": issue.priority === "medium"? "bg-yellow-100 text-yellow-600": "bg-gray-200 text-gray-700"}">
        ${issue.priority}
        </span>
        </div>

        <h2 class= "font-semibold text-md mb-1">${issue.title}</h2>

        <p class= "text-sm text-gray-500 mb-3">${issue.description?.slice(0,80)}</p>

        <div class = "flex gap-2 mb-3">
        
        ${issue.labels?.includes("bug")? `<span class = "badge bg-red-100 text-red-700">bug</span>`: ""}

        ${issue.labels?.includes("help wanted")?`<span class = "badge bg-yellow-100 text-yellow-600">help wanted</span>`: ""}
        
        ${issue.labels?.includes("enhancement")?`<span class = "badge bg-green-100 text-green-700">enhancement</span>`: ""}

        </div>

        <hr class = "mb-2">

        <div class = "flex justify-between text-xs text-gray-500">

        <span>#${issue.id} ${issue.author}</span>

        <span>${issue.createdAt?.slice(0,10)}</span>

        </div>
        
        </div>

        `
    })
}


// page load

window.onload = ()=>{
    if(document.getElementById("issuesContainer")){
        loadIssues("all")
    }
}