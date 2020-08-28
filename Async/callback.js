// calbacks

console.log("Before");
getUser(1, displayUser);

function displayUser(user) {
  console.log(user);
  getRepo(user, displayRepo);
}
function displayRepo(repo) {
  console.log(repo);
}

console.log("After");

// stimulating Time Delay
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading From Database ........");
    callback({ id: id, name: "ishaan" });
  }, 2000);
}
const repo = [{ username: "ishaan " }, { username: "track" }];

function getRepo(username, callback) {
  setTimeout(() => {
    console.log("fetching from databse.....");
    const user = repo.find((r) => r.username === username.name);

    if (!user) callback("404");
    else callback(user);
  }, 2000);
}
