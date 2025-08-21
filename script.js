let inpbutton = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getuserdetail(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw )=> {
        if(!raw.ok) throw new Error("user not found")
            return raw.json();
    });
}

function getrepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort='updated'`)
    .then((raw )=> {
        if(!raw.ok) throw new Error("Failed to fetch repos")
            return raw.json();
    });  
}

function decorateprofiledata(details){
    console.log(details);
    
    let data = `<div class="flex items-center space-x-4 mb-6">
                        <img
                            src="${details.avatar_url}"
                            alt="Profile Picture"
                            class="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg"
                        />
                        <div>
                            <h2 class="text-2xl font-bold text-white">${details.name}</h2>
                            <p class="text-blue-400 text-lg">@${details.login}</p>
                        </div>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-blue-400">${details.public_repos}</div>
                                    <div class="text-sm text-gray-400">Public Repos</div>
                                </div>
                            </div>
                            <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-green-400">${details.followers}</div>
                                    <div class="text-sm text-gray-400">Followers</div>
                                </div>
                            </div>
                            <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-purple-400">${details.following}</div>
                                    <div class="text-sm text-gray-400">Following</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-400">Location</div>
                                        <div class="text-white font-medium">${details.location || 'Not specified'}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-sm text-gray-400">Company</div>
                                        <div class="text-white font-medium">${details.company || 'Not specified'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-400">Blog</div>
                                    <a href="${details.blog || '#'}" target="_blank" class="text-blue-400 hover:text-blue-300 font-medium transition-colors">${details.blog || 'Not specified'}</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="repos mt-6 space-y-3"></div>`;

    card.innerHTML = data;
    
    // Re-select the repos container after updating the card content
    reposContainer = document.querySelector(".repos");
}


inpbutton.addEventListener("click", function(){
    let username = usernameinp.value.trim();
    if(username.length > 0){
        getuserdetail(username).then(data => {
            decorateprofiledata(data);

            getrepos(username).then((repos) => {
                displayRepos(repos)
            });
        });
    }else{
        alert("Please enter a username");
    }
});


let reposContainer = document.querySelector(".repos");

function displayRepos(repos){
    reposContainer.innerHTML = "";
    if(repos.length === 0){
        reposContainer.innerHTML = "no repo found";
        return;
    }

    repos.forEach((repo) => {
        let repoData = `
        <div class="bg-gray-800 p-4 rounded shadow-xl border border-blue-500">
            <a href="${repo.html_url}" target="_blank" class="text-blue-400 text-lg font-semibold hover:underline">
                ${repo.name}
            </a>
            <p class="text-sm text-gray-400">${repo.description || "No description"}</p>
            <div class="text-xs mt-2 text-gray-500">
                ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🛠️ ${repo.language || "N/A"}
            </div>
        </div>
    `;

    reposContainer.innerHTML += repoData;
    });
}