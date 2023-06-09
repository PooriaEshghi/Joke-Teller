const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// VoiceRSS Javascript SDK


// Passing Joke to VoiceRSS API

const tellMe = (joke) => {
  console.log(`tell me: ${joke}`);
  VoiceRSS.speech({
    key: "4301fb7fed65488399d156971d76ed05",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};
// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled
}


// Get Jokes from Joke API

const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
  try {
    const respons = await fetch(apiUrl);
    const data = await respons.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("whoops", error);
  }
};

// Event Listener
button.addEventListener('click',getJokes)
audioElement.addEventListener('ended', toggleButton);