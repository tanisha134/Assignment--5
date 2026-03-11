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

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

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
        filtered = allIssues.filter(issue=> issue.status === "close")
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

        container.innerHTML +=`<div onclick= "openModal(${issue.id}" class = "card bg-white shadow-md hover:shadow-xl transition cursor-pointer p-4 ${borderColor}">

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

        <span>#${issue.createdAt?.slice(0.10)}</span>

        </div>

        </div>`
    })
}

