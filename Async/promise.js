console.log("Before");

getUser(1)
  .then((user) => getRepo(user))
  .then((repo) => console.log(repo))
  .catch((err) => console.log(err.message));

console.log("after");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading From Database.....");
      resolve({ id: id, name: "ishaan" });
    }, 2000);
  });
}

function getRepo(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(user);
      console.log("feching repos. ..... ..");
      resolve(["repos"]);
    }, 2000);
  });
}
