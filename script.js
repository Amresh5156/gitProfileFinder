
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
                    </div>`;

    card.innerHTML = data;
}



inpbutton.addEventListener("click", function(){
  
    let username = usernameinp.value.trim();
    if(username.length > 0){
        getuserdetail(username).then(data => {
            decorateprofiledata(data);
        })
    }else{
        alert("Please enter a username");
    }
});
