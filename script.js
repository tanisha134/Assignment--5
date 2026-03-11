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
