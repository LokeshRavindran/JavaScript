// contacting API
class user {
  getUser(url) {
    console.log("inside get user");
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((user) => this.handleErrors(user))
        .then((data) => resolve(data.json()))
        .catch((err) => {
          let error = document.getElementById("error");
          error.style.display = "block";
          let basicDetails = document.getElementById("basic-details");
          basicDetails.style.display = "none";
          let repos = document.getElementById("repos");
          repos.style.display = "none";
          document.getElementsByTagName("footer")[0].style.position =
            "absolute";

          error.innerHTML = `<h3>No Profiles found for this username</h3>`;
        });
    });
  }

  getRepos(repoUrl) {
    return new Promise((resolve, reject) => {
      fetch(repoUrl)
        .then((repo) => this.handleErrors(repo))
        .then((repoData) => resolve(repoData.json()))
        .catch((err) => reject(err));
    });
  }

  handleErrors(promise) {
    if (promise.status == 200) {
      console.log("success");
      return promise;
    } else {
      console.log("error");
      throw new Error(promise.status);
    }
  }

  updateUIBasicDetails(userData) {
    console.log("inside update ui basic details");

    let error = document.getElementById("error");
    error.style.display = "none";
    let basicDetails = document.getElementById("basic-details");
    basicDetails.style.display = "flex";
    let repos = document.getElementById("repos");
    repos.style.display = "block";

    basicDetails.innerHTML = "";
    //   setting the profile pic and view profile
    let profilePicture = userData.avatar_url;
    let viewProfile = userData.html_url;

    // details-section details-1
    let publicRepos = userData.public_repos;
    let publicGists = userData.public_gists;
    let followers = userData.followers;
    let following = userData.following;

    //   details-section section-2
    let company = userData.company;
    let website = userData.html_url;
    let location = userData.location;
    let memberSince = userData.created_at;

    memberSince = memberSince.replace("T", " ");
    memberSince = memberSince.replace("Z", " ");

    basicDetails.innerHTML += `<div id="image-section">
                              <img src="${profilePicture}" alt="profile picture" />
                              <a href="${viewProfile}" target="_blank">View Profile</a>
                          </div>
                      <div id="details-section">
                          <div id="details-1">
                               <ul>
                                  <li class="color-block kelly-green">Public Repos: ${publicRepos}</li>
                                  <li class="color-block violet">Public Gists: ${publicGists}</li>
                                  <li class="color-block yellow">Followers: ${followers}</li>
                                  <li class="color-block coral">Following: ${following}</li>
                              </ul>
                      </div>
                      <div id="details-2">
                          <table>
                              <tr>
                                  <td>Company: ${company}</td>
                              </tr>
                              <tr>
                                  <td>Website: ${website}</td>
                              </tr>   
                              <tr>
                                  <td>Location: ${location}</td>
                              </tr>
                              <tr>
                                  <td>Member Since: ${memberSince}</td>
                              </tr>
                          </table>
                      </div>
                  </div>`;
  }

  updateUIRepoDetails(repoData) {
    console.log("update ui repo details");

    document.getElementsByTagName("footer")[0].style.position = "relative";

    let latestRepos = document.getElementById("latest-repos");

    latestRepos.innerHTML = "";
    repoData.forEach((repo) => {
      let name = repo.name;
      let stars = repo.stargazers_count;
      let watchers = repo.watchers_count;
      let forks = repo.forks_count;
      let a = repo.html_url;

      latestRepos.innerHTML += `<li>
                            <a href="${a}" target="_blank" class="color-block">${name}</a>
                            <ul id="repo-details">
                              <li class="color-block sandal">Stars: ${stars}</li>
                              <li class="color-block blue">Watchers: ${watchers}</li>
                              <li class="color-block pink">Forks: ${forks}</li>
                            </ul>
                       </li>`;
    });
  }
}

// getting the input field
const input = document.getElementById("username");
const output = document.getElementById("output");
output.style.display = "none";

// listners
// listerning to the input field
input.addEventListener("keyup", (e) => {
  output.style.display = "block";
  let url = "https://api.github.com/users/";
  let username = new user();
  let usernameForSearch;

  //   search text
  if (usernameForSearch === undefined) {
    usernameForSearch = e.target.value;
  } else {
    usernameForSearch = e.target.value;
  }
  if (usernameForSearch === "") {
    output.style.display = "none";
    document.getElementsByTagName("footer")[0].style.position = "absolute";
  }
  url += usernameForSearch;
  console.log(url);
  // getting the user details
  username
    .getUser(url)
    .then((userData) => {
      username.updateUIBasicDetails(userData);

      username
        .getRepos(userData.repos_url)
        .then((repoData) => {
          username.updateUIRepoDetails(repoData);
        })
        .catch((err) => err);
    })
    .catch((err) => err);

  e.preventDefault();
});

// API LINK:
// https://api.github.com/users/LokeshRavindran
