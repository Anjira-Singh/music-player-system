let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
//const BG = document.querySelector("#BG");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Jaden Smith",
    artist: "Icon",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQSCaJfLX-LEPmCHcz5fvkcZUrO2_5Z4LeaGe-HiuIYh829Q6YQ",
    path: "Jaden Smith - Icon.mp3"
  },
  {
    name: "Billie Eilish",
    artist: "Bad Guy",
    image: "https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png",
    path: "Billie Eilish - bad guy (Lyrics).mp3"
  },
  {
    name: "In The End",
    artist: "Linkin Park",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo1RQ_vSELHhtffeMwTehFeUa9d7N_lwHeoZeovIN77uF9p67e",
    path: "Tommee Profitt - In The End (Mellen Gi Remix).mp3"
  },
  {
    name: "On My Own",
    artist: "Ross Lynch",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTob-tfpJQI1_J2pTsGaRh0tQT3oOUBsSdCrGbh790J1Was-koe",
    path: "Ross Lynch - On My Own (From Teen Beach 2).mp3"
  }

];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}
 // function showBackground() {
 //        document.getElementById("bg").style.backgroundImage = "url(" + track_list[track_index].image + ")";
 //        document.getElementById("bg").style.backgroundPosition = "center ";
 //        document.getElementById("bg").style.backgroundSize = "cover";
 //        document.getElementById("bg").style.backgroundRepeat = "no-repeat";
 //        document.getElementById("bg").style.backgroundAttachment = "fixed";
 //        document.getElementById("bg").style.webkitFilter = "blur(5px)";
 //    }

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
   // document.body.style.backgroundImage= "url(" + track_list[track_index].image + ")";
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


