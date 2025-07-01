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
    
    let data = `<div class="flex items-center space-x-4 mb-4">
                        <img
                            src="${details.avatar_url}"
                            alt="Octocat"
                            class="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h2 class="text-xl font-semibold">${details.name}</h2>
                            <p class="text-gray-400">${details.login}</p>
                        </div>
                        </div>
                            <p class="mb-4">${details.bio}</p>
                            <div class="text-sm space-y-1 flex justify-between gap-3">
                            <p><strong>Public Repos:</strong> ${details.public_repos}</p>
                            <p><strong>Followers:</strong> ${details.followers}</p>
                            <p><strong>Following:</strong> ${details.following}</p>
                            <p><strong>Location:</strong> ${details.location}</p>
                            <p><strong>Company:</strong>${details.company}</p>
                            <p><strong>Blog:</strong> <a href="https://github.blog" class="text-blue-400 hover:underline">github.blog</a></p>
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