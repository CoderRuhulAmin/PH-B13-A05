const tabs = document.querySelectorAll(".issue-btn");
let currentTab = "all";

const manageIssueSpinner = (status) => {
    if(status === true){
        document.getElementById('issue-spinner').classList.remove('hidden');
        document.getElementById('issue-spinner').classList.add('flex');
        document.getElementById('issue-list').classList.add('hidden');
    } else {
        document.getElementById('issue-spinner').classList.add('hidden');
        document.getElementById('issue-spinner').classList.remove('flex');
        document.getElementById('issue-list').classList.remove('hidden');
    }
}


const createElements = (arr) => {

    const htmlElements = arr.map((el) => {
        if(el.toUpperCase() === "BUG"){
            return `
                <div class="priority-btn btn h-6 border-2 border-red-200 rounded-full px-[8px] bg-red-100 text-[12px] font-medium text-red-600">
                    <i class="fa-solid fa-bug-slash"></i>
                    ${el.toUpperCase()}
                </div>
            `;
        }else if(el.toUpperCase() === "HELP WANTED"){
            return `
                <div class="priority-btn btn h-6 border-2 border-yellow-200 rounded-full px-[8px] bg-yellow-100 text-[12px] font-medium text-yellow-600">
                    <i class="fa-solid fa-life-ring"></i>
                    ${el.toUpperCase()}
                </div>
            `
        }else{
            return `
                <div class="priority-btn btn h-6 border-2 border-green-200 rounded-full px-[8px] bg-green-100 text-[12px] font-medium text-green-600">
                    <i class="fa-solid fa-paint-roller"></i>
                    ${el.toUpperCase()}
                </div>
            `
        }
        
    });
    return htmlElements.join(" ");
}

const createTopColoredStripe = (status) => {
    // console.log(status)
    if(status.toLowerCase() === "open"){
        return `<div id="top-colored-stripe" class="h-4 w-full bg-green-600 absolute top-0"></div>`;
    }else if(status.toLowerCase() === "closed"){
        return `<div id="top-colored-stripe" class="h-4 w-full bg-purple-600 absolute top-0"></div>`;
    }
}

const createStatusCircle = (status) => {
    // console.log(status)
    if(status.toLowerCase() === "open"){
        return `
            <div class="status-icon w-6 h-6 rounded-full bg-green-200 flex justify-center items-center">
                <div class="w-4 h-4 rounded-full border-2 border-green-600 border-dashed flex justify-center items-center">
                </div>
            </div>
        `;
    }else if(status.toLowerCase() === "closed"){
        return `
            <div class="status-icon w-6 h-6 rounded-full bg-purple-200 flex justify-center items-center">
                <div class="w-4 h-4 rounded-full border-2 border-purple-600 flex justify-center items-center">
                    <span class="text-purple-600 block text-[8px] font-extrabold"><i class="fa-solid fa-check"></i></span>
                </div>
            </div>
        `;
    }
}

const createStatusBtnForDetails = (issue) => {
    // console.log(status)
    if(issue.status.toLowerCase() === "open"){
        return `
            <div class="flex items-center gap-2">
                <span class="rounded-full border-0 px-2 py-1 bg-green-600 text-[12px] font-medium text-white">Opened</span>
                <span class="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
                <span class="text-[#64748B]">Opened by ${issue.author}</span>
                <span class="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
                <span class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;
    }else if(issue.status.toLowerCase() === "closed"){
        return `
            <div class="flex items-center gap-2">
                <span class="rounded-full border-0 px-2 py-1 bg-purple-600 text-[12px] font-medium text-white">Closed</span>
                <span class="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
                <span class="text-[#64748B]">Closed by ${issue.assignee}</span>
                <span class="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
                <span class="text-[#64748B]">${new Date(issue.updatedAt).toLocaleDateString()}</span>
            </div>
        `;
    }
}

const createPriorityBtn = (priority) => {
    // console.log(priority)
    if(priority.toUpperCase() === "HIGH"){
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-red-100 text-[12px] font-medium text-red-600">${priority.toUpperCase()}</div>`;
    }else if(priority.toUpperCase() === "MEDIUM"){
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-yellow-100 text-[12px] font-medium text-yellow-600">${priority.toUpperCase()}</div>`;
    }else{
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-gray-100 text-[12px] font-medium text-gray-600">${priority.toUpperCase()}</div>`;
    }
}

const createPriorityBtn2 = (priority) => {
    // console.log(priority)
    if(priority.toUpperCase() === "HIGH"){
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-red-600 text-[12px] font-medium text-white">${priority.toUpperCase()}</div>`;
    }else if(priority.toUpperCase() === "MEDIUM"){
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-yellow-600 text-[12px] font-medium text-white">${priority.toUpperCase()}</div>`;
    }else{
        return `<div class="priority-btn btn w-20 h-6 rounded-full p-[6px] bg-gray-600 text-[12px] font-medium text-white">${priority.toUpperCase()}</div>`;
    }
}

const removeActive = () => {
    tabs.forEach((btn) => btn.classList.remove('active'));
}


const loadIssues = async (tab = "all") =>  {
    manageIssueSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    

    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;
    
    currentTab = tab;
    let filteredIssues = issues.filter((issue) => {
        if(tab.toLowerCase() == "all") return true;
        return issue.status.toLowerCase() == tab.toLowerCase();
    });
    // console.log(filteredIssues);
    displayIssues(filteredIssues);

}
const displayIssues = (issues) => {
    // console.log(issues);

    document.getElementById('counted-issues').innerText = `${issues.length} Issues`;

    // 1. get the container & empty
    const issueList = document.getElementById('issue-list');
    issueList.innerHTML = "";
    if(issues.length === 0){
        issueList.innerHTML = `
            <div class="col-span-3 text-center py-10 space-y-5">
                <div class="text-8xl bg-gradient-to-r from-[#FDFDFD] to-[#79716B] bg-clip-text text-transparent"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <p class="text-4xl text-[#79716B]">Issue not found!</p>
            </div>
        `;
        manageIssueSpinner(false);
        return;
    }


    // 2. get every words into separate div
    issues.forEach(item => {
        // console.log(item);
        // 3. create card element and put data into it
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="issue-card rounded-lg overflow-hidden relative cursor-pointer" onclick="loadIssueDetail(${item.id})">
                
                <!-- Top colored stripe -->
                ${createTopColoredStripe(item.status)}

                <!-- Card content -->
                <div class="card w-full bg-white shadow-md mt-1 space-y-4 py-4 z-2">
                    <div class="flex flex-wrap gap-2 justify-between items-center px-4">
                        ${createStatusCircle(item.status)}
                        
                        ${createPriorityBtn(item.priority)}
                        
                    </div>
                    <div class="px-4 space-y-2">
                        <h2 class="text-[14px] font-semibold">${item.title}</h2>
                        <p class="text-[12px] text-[#64748B] line-clamp-2">${item.description}</p>
                        
                        <div class="flex flex-wrap gap-2 items-center">
                            ${createElements(item.labels)}
                        </div>
                    </div>
                    <div class="border-t-2 border-gray-300"></div>
                    <div class="px-4">
                        <p class="text-[12px] text-[#64748B] mb-2">#1 by ${item.author}</p>
                        <p class="text-[12px] text-[#64748B]">${new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `;
        // 4. Created Card append into wordContainer
        issueList.appendChild(card);
    });
    manageIssueSpinner(false);
}

const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetail(details.data);
}
const displayIssueDetail = (issue) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div class="card w-full bg-white space-y-4 py-4 z-2">
            <div class="flex flex-wrap gap-2 justify-between items-center px-4">
                ${createStatusCircle(issue.status)}
                        
                ${createPriorityBtn(issue.priority)}
            </div>
            <div class="px-4 space-y-2">
                <h2 class="text-[14px] font-semibold">${issue.title}</h2>
                ${createStatusBtnForDetails(issue)}
                <div class="flex flex-wrap gap-2 items-center">
                    ${createElements(issue.labels)}
                </div>
                <p class="text-[12px] text-[#64748B] line-clamp-2">
                    ${issue.description}
                </p>
            
                <div class="grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl py-4">
                    <div class="ps-4">
                        <p class="text-[#64748B]">Assignee: </p>
                        <h3 class="font-semibold">${issue.assignee}</h3>
                    </div>
                    <div class="ps-4">
                        <p class="text-[#64748B]">Priority: </p>
                        ${createPriorityBtn2(issue.priority)}
                    </div>
                </div>
            </div>
        </div>
    `;
     
    document.getElementById('issue_modal').showModal();
}

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        currentTab = tab.dataset.tab;
        loadIssues(currentTab);
    });
});
loadIssues();

document.querySelector('.btn-search').addEventListener("click", async ()=> {
    manageIssueSpinner(true);
    removeActive();

    const input = document.querySelector('.input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;
    // console.log(issues);

    const filterIssues = issues.filter(issue => {
        return issue.title.toLowerCase().includes(searchValue);
    });
    console.log(filterIssues);
    displayIssues(filterIssues);
});
document.querySelector('#btn-search').addEventListener("click", async ()=> {
    manageIssueSpinner(true);
    removeActive();

    const input = document.querySelector('#input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    const issues = data.data;
    // console.log(issues);

    const filterIssues = issues.filter(issue => {
        return issue.title.toLowerCase().includes(searchValue);
    });
    console.log(filterIssues);
    displayIssues(filterIssues);
});