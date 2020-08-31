// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

SendEmail();
async function SendEmail() {
  const customer = await getCustomer(1);

  if (1) {
    const topMovie = await getTopMovies();

    sendEmail();
  }
}

function getCustomer(id) {
  console.log("getting Customers...");
  setTimeout(() => {
    return {
      id: 1,
      name: "Mosh Hamedani",
      isGold: true,
      email: "email",
    };
  }, 4000);
}

function getTopMovies() {
  console.log("Getting Top Movies.....");
  setTimeout(() => {
    console.log([("movie1", "movie2")]);
  }, 4000);
}

function sendEmail() {
  setTimeout(() => {
    console.log("Email Sent...");
  }, 4000);
}
