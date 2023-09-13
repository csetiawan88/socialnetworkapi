// Import the array of fictional usernames from userData.js
const { usernames } = require("./userData");

// Array of predefined thoughts for social media posts
const thoughts = [
  "Enjoying a relaxing weekend getaway 🌴☀️",
  "Feeling grateful for the little moments in life.",
  "Trying out a new recipe tonight – wish me luck!",
  "Just finished an amazing book 📚 Any recommendations?",
  "It's never too late to chase your dreams ✨",
  "Family time is the best time ❤️",
  "Sending positive vibes your way 🌟",
  "Exploring a new city – so much to see and do!",
  "Monday motivation: Be unstoppable 💪",
  "Movie night with friends – what should we watch?",
  "Remember to take breaks and practice self-care 💆‍♀️",
  "A cup of tea and some quiet time – perfect evening 🍵",
  "Counting down the days until my next adventure ✈️",
  "Embracing change and new beginnings 🌼",
  "Gratitude turns what we have into enough 🙏",
];

// Array of predefined reactions or comments for social media posts
const reactions = [
  "Wow, this looks amazing! 😍",
  "You're absolutely killing it! 👏",
  "I'm so inspired by your journey. Keep going! 💪",
  "This made my day! 😄",
  "You've got a talent for this. Impressive! 👌",
  "Sending love and positive vibes your way! ❤️",
  "I can't wait to try this myself. Thanks for sharing! 🙌",
  "You're a true artist. Your work is beautiful! 🎨",
  "Your smile is contagious! 😁",
  "This is pure awesomeness! 🚀",
  "You always know how to brighten up my feed. Thanks! ☀️",
  "I admire your dedication and hard work. Keep shining! 🌟",
  "This is exactly what I needed to see today. Thank you! 🌻",
  "Your positivity is contagious. Keep spreading it! 😊",
  "You've got a way with words. I love your captions! ✍️",
];

// Function to generate a random number of reactions for a thought
const getRandomReaction = () => {
  numberOfReactions = Math.floor(Math.random() * 2);

  const reactionsList = [];

  if (numberOfReactions) {
    for (let i = 0; i < numberOfReactions; i++) {
      reactionsList.push({
        reactionBody: reactions[Math.floor(Math.random() * reactions.length)],
        username: getRandomUser(), // Get a random username for the reaction
      });
    }
  }

  return reactionsList;
};

// Function to get a random username from the imported usernames array
const getRandomUser = () => {
  return usernames[Math.floor(Math.random() * usernames.length)];
};

// Function to get a random thought from the predefined thoughts array
const getRandomThought = () => {
  return thoughts[Math.floor(Math.random() * thoughts.length)];
};

// Function to generate a list of random thoughts with reactions
const getThoughts = (numberOfThoughts) => {
  const thoughtsList = [];

  for (let i = 0; i < numberOfThoughts; i++) {
    thoughtsList.push({
      thoughtText: getRandomThought(),
      username: getRandomUser(), // Get a random username for the thought
      reactions: getRandomReaction(), // Get random reactions for the thought
    });
  }

  return thoughtsList;
};

// Export the getThoughts function to use in other parts of the application
module.exports = { getThoughts };
