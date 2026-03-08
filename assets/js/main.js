const tabs = document.querySelectorAll(".issue-btn");
let currentTab = "all";
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

const removeActive = () => {
    const issueButtons = document.querySelectorAll('.issue-btn');
    // console.log(issueButtons);
    issueButtons.forEach((btn) => btn.classList.remove('active'));
}


const loadIssues = async (tab = "all") =>  {
    // manageWordSpinner(true);
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
                <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="font-bangla font-medium text-4xl">নেক্সট Lesson এ যান</p>
            </div>
        `;
        // manageWordSpinner(false);
        return;
    }


    // {
    //   "id": 1,
    //   "title": "Fix navigation menu on mobile devices",
    //   "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    //   "status": "open",
    //   "labels": [
    //     "bug",
    //     "help wanted"
    //   ],
    //   "priority": "high",
    //   "author": "john_doe",
    //   "assignee": "jane_smith",
    //   "createdAt": "2024-01-15T10:30:00Z",
    //   "updatedAt": "2024-01-15T10:30:00Z"
    // },



    // 2. get every words into separate div
    issues.forEach(item => {
        // console.log(item);
        // 3. create card element and put data into it
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="issue-card rounded-lg overflow-hidden relative cursor-pointer" onclick="issue_modal.showModal()">
                
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
    // manageWordSpinner(false);
}

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        currentTab = tab.dataset.tab;
        renderJobs(currentTab);
    });
});
loadIssues();