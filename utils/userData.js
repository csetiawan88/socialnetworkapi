// List of predefined usernames for generating social media users
const usernames = [
  "Ethan",
  "Olivia",
  "Liam",
  "Ava",
  "Noah",
  "Mia",
  "Sophia",
  "Aiden",
  "Emma",
  "Lucas",
  "Isabella",
  "Mason",
  "Harper",
  "Elijah",
  "Amelia",
  "James",
  "Charlotte",
  "Benjamin",
  "Mia",
  "Samuel",
  "Evelyn",
  "William",
  "Abigail",
  "Logan",
  "Grace",
  "Henry",
  "Lily",
  "Michael",
  "Zoe",
  "Jackson",
  "Emily",
  "Daniel",
  "Scarlett",
  "Alexander",
  "Avery",
  "Oliver",
  "Sofia",
  "David",
  "Madison",
  "Caleb",
  "Ella",
  "Joseph",
  "Chloe",
  "John",
  "Lucy",
  "Christopher",
  "Riley",
  "Andrew",
  "Layla",
  "Nathan",
];

// Function to get a random element from an array
const getRandomEl = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Function to generate a random email address based on a name
const getRandomEmail = (name) => {
  // List of email domains and tails
  const domains = ["gmail", "outlook", "icloud", "yahoo"];
  const tails = ["com", "com.au"];

  // Randomly select a domain and tail from the lists
  const randomDomain = getRandomEl(domains);
  const randomTail = getRandomEl(tails);

  // Combine the name, domain, and tail to create the email address
  return `${name}@${randomDomain}.${randomTail}`;
};

// Function to generate a list of users with random usernames and email addresses
const getUsers = () => {
  const users = usernames.map((name) => {
    return {
      username: name,
      email: getRandomEmail(name),
    };
  });

  return users;
};

// Export the list of usernames and the getUsers function for use in other parts of the application
module.exports = { usernames, getUsers };
