/* ELEMENT */
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result-box");

const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");

/* STATE */
let currentQuestion = 0;
let userAnswers = [];

let scores = {
  komik:0,
  orfil:0,
  oxlab:0,
  mosaic:0,
  icon:0,
  spice:0,
  mvp:0,
  pipa:0,
  kuls:0,
  tobo:0,
  stage:0,
  flui:0,
  vote:0,
  wire:0
};

function resetScores(){
  for(let key in scores){
    scores[key] = 0;
  }
}

const namaMap = {
  komik: "POJOKOMIK",
  orfil: "ORFIL",
  oxlab: "OX-LAB",
  mosaic: "MOSAIC",
  icon: "ICON",
  spice: "SPICE",
  mvp: "MVP",
  pipa: "PIPA",
  kuls: "KULS",
  tobo: "TOBO",
  stage: "STAGE",
  flui: "FLUI",
  vote: "VOTE",
  wire: "WIRE"
};

/* DATA */
const questions = [
  {
    question:"Mana yang paling menggambarkan diri kamu?",
    options:[
      {text:"Aku santai dan suka membuat ide visual atau ilustrasi", score:{komik:1, pipa:1, icon:1}},
      {text:"Aku aktif di lapangan dalam proses produksi media", score:{orfil:1, wire:1, vote:1}},
      {text:"Aku suka tantangan dan pemecahan masalah teknologi", score:{oxlab:1, spice:1}},
      {text:"Aku terstruktur dan fokus ke strategi", score:{kuls:1, mosaic:1}},
      {text:"Aku kolaboratif dan suka koordinasi dalam tim", score:{mvp:1, flui:1}}
    ]
  },
  {
    question:"Secara pribadi, kamu lebih senang bekerja secara bagaimana?",
    options:[
      {text:"Secara kelompok dan memimpin", score:{mvp:1, kuls:1}},
      {text:"Secara kelompok dan dipimpin", score:{spice:1, vote:1, mosaic:1}},
      {text:"Secara kelompok dengan setara", score:{orfil:1, stage:1, icon:1, oxlab:1}},
      {text:"Secara individu", score:{tobo:1, komik:1}},
      {text:"Fleksibel", score:{wire:1, pipa:1, flui:1}}
    ]
  },
  {
    question:"Kalau kamu bisa mendeskripsikan dirimu dalam satu sifat, apa itu?",
    options:[
      {text:"Imajinasi yang tinggi", score:{komik:1, orfil:1, pipa:1}},
      {text:"Kemampuan manajemen yang baik", score:{mvp:1, kuls:1}},
      {text:"Punya logika kuat", score:{spice:1, oxlab:1, tobo:1}},
      {text:"Disiplin yang tinggi", score:{vote:1, mosaic:1, icon:1}},
      {text:"Ekspresi diri yang kuat ", score:{flui:1, stage:1, wire:1}}
    ]
  },
  {
    question:"Kalau kamu ada waktu luang, aktivitas mana yang paling mungkin kamu lakukan?",
    options:[
      {text:"Menggambar atau membuat ilustrasi", score:{tobo:1, pipa:1, komik:1}},
      {text:"Mengedit dan membuat video, foto, atau audio", score:{wire:1, flui:1, orfil:1}},
      {text:"Ngoding atau eksplor teknologi", score:{spice:2, oxlab:1}},
      {text:"Membuat, menulis, atau menganalisis konten", score:{kuls:1, mosaic:1, vote:1}},
      {text:"Merancang ide kegiatan atau proyek kreatif", score:{icon:1, stage:1, mvp:1}}
    ]
  },
  {
    question:"Dalam kerja tim, kamu paling nyaman berperan sebagai apa?",
    options:[
      {text:"Tim produksi media", score:{orfil:1, vote:1, wire:1}},
      {text:"Developer atau teknisi", score:{spice:1}},
      {text:"Penyusun konsep atau strategi", score:{kuls:1, icon:1, stage:1}},
      {text:"Koordinator kegiatan", score:{mvp:1, flui:1}},
      {text:"Desainer atau Artist", score:{pipa:1, stage:1, wire:1}}
    ]
  },
  {
    question:"Kalau harus memilih kegiatan yang ingin kamu coba pertama kali, kamu paling tertarik mencoba yang mana?",
    options:[
      {text:"Membuat ilustrasi, komik, atau animasi", score:{pipa:1, komik:1}},
      {text:"Membuat game atau eksperimen teknologi", score:{spice:1, oxlab:2}},
      {text:"Membuat film, video, atau musik", score:{wire:1, mosaic:1}},
      {text:"Membuat campaign media, artikel, atau analisis konten digital", score:{vote:1, kuls:1, flui:1}},
      {text:"Merancang boardgame atau event", score:{tobo:1, mvp:1}}
    ]
  },
  {
    question:"Skill apa yang paling ingin kamu kembangkan?",
    options:[
      {text:"Membuat Ilustrasi, animasi, atau desain visual", score:{pipa:1, komik:1, tobo:1}},
      {text:"Membuat Branding, pengembangan IP, atau strategi media digital", score:{icon:1, mosaic:1}},
      {text:"Fotografi, videografi, atau produksi musik", score:{orfil:1, flui:1, stage:1}},
      {text:"Belajar membuat program dan explore teknologi", score:{oxlab:1}},
      {text:"Manajemen event atau tim", score:{vote:1, mvp:1}}
    ]
  },
  {
    question:"Saat melihat karya digital yang keren, kamu biasanya fokus ke bagian apa?",
    options:[
      {text:"Gaya ilustrasi, komik, atau animasi yang digunakan", score:{oxlab:1, komik:1}},
      {text:"Cara video atau musiknya diproduksi", score:{orfil:1, vote:1, stage:1}},
      {text:"Konsep promosi, pesan brand, atau strategi kontennya", score:{kuls:1, flui:1, mosaic:1}},
      {text:"Ide produk kreatif atau konsep kegiatan yang dibuat", score:{mvp:1, icon:1}},
      {text:"Teknologi atau sistem yang dipakai", score:{tobo:1, spice:1}}
    ]
  },
  {
    question:"Menurut kamu, orang yang terlihat keren itu biasanya saat sedang apa?",
    options:[
      {text:"Saat sedang menyusun strategi atau konten media", score:{kuls:1, vote:1, mosaic:1}},
      {text:"Saat sedang gambar atau bikin karya visual", score:{komik:1, pipa:1}},
      {text:"Saat sedang ngoding atau bikin sesuatu berbasis teknologi", score:{spice:1, mosaic:1}},
      {text:"Saat sedang shooting / produksi video atau musik", score:{wire:1, orfil:1, stage:1}},
      {text:"Saat sedang memimpin tim atau menjalankan proyek", score:{mvp:1, icon:1}}
    ]
  },
  {
    question:"Kalau diberi kesempatan membuat proyek sendiri, kamu paling tertarik membuat apa?",
    options:[
      {text:"Membuat game atau eksperimen teknologi interaktif", score:{oxlab:1, komik:1, tobo:1}},
      {text:"Desain fashion atau Performing Arts", score:{flui:1, kuls:1, stage:1}},
      {text:"Film pendek, video konten, atau musik", score:{wire:1, orfil:1}},
      {text:"Boardgame dan produk kreatif", score:{tobo:1, pipa:1}},
      {text:"Konsep IP, media digital, atau pengembangan brand story", score:{icon:1, mosaic:1}}
    ]
  },
];

const container = document.querySelector(".bubble-container");

function createBubble(){
  const bubble = document.createElement("img");

  bubble.src = "img/bubble.png";
  bubble.classList.add("bubble");

  bubble.style.left = Math.random() * 100 + "vw";

  const size = Math.random() * 70 + 70;
  bubble.style.width = size + "px";

  const duration = Math.random() * 3 + 4;
  bubble.style.animationDuration = duration + "s";

  // 🔥 EVENT PECAH
  bubble.addEventListener("click", () => {
    bubble.classList.add("pop");

    setTimeout(() => {
      bubble.remove();
    }, 400);
  });

  // optional: hover juga bisa pecah
  bubble.addEventListener("mouseenter", () => {
    bubble.classList.add("pop");

    setTimeout(() => {
      bubble.remove();
    }, 400);
  });

  container.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, duration * 1000);
}

//spawn terus tiap 500ms
setInterval(createBubble, 500);


/* INIT */
userAnswers = new Array(questions.length).fill(null);

/* START */

startBtn.onclick = () => {
    resetScores();
}


startBtn.addEventListener("click", () => {
  home.classList.remove("active");
  quiz.classList.add("active");
  loadQuestion();
});

startBtn.addEventListener("click", ()=>{
  document.getElementById("home").style.display = "none";
  document.getElementById("quiz").style.display = "flex";
});

/* LOAD QUESTION */
function loadQuestion(){
  const current = questions[currentQuestion];
  questionEl.textContent = (currentQuestion+1) + ". " + current.question;

  optionsEl.innerHTML = "";

  current.options.forEach((opt,index)=>{
    const div = document.createElement("div");
    div.classList.add("option");

    const letter = String.fromCharCode(65+index);

    div.innerHTML = `
      <div class="option-label">${letter}</div>
      <div>${opt.text}</div>
    `;

    if(userAnswers[currentQuestion]===index){
      div.classList.add("selected");
    }

    div.addEventListener("click", ()=>{
      userAnswers[currentQuestion]=index;
      loadQuestion();
    });

    optionsEl.appendChild(div);
  });

  // submit hanya muncul kalau semua sudah dijawab
  if(userAnswers.includes(null)){
    submitBtn.style.display = "none";
  } else {
    submitBtn.style.display = "block";
  }
}

function showWarning(){
  const box = document.querySelector(".quiz-box");
  const warning = document.getElementById("warning-text");

  warning.style.display = "block";
  box.classList.add("shake");

  setTimeout(()=>{
    box.classList.remove("shake");
  }, 300);

  setTimeout(()=>{
    warning.style.display = "none";
  }, 1500);
}

/* NEXT */
nextBtn.addEventListener("click", ()=>{
  if(userAnswers[currentQuestion]===null){
    showWarning(); //DI SINI
    return;
  }

  if(currentQuestion < questions.length-1){
    currentQuestion++;
    loadQuestion();
  }
});

/* PREV */
prevBtn.addEventListener("click", ()=>{
  if(currentQuestion > 0){
    currentQuestion--;
    loadQuestion();
  }
});

/* SUBMIT */
submitBtn.addEventListener("click", ()=>{
  calculateScore();
  showResult();
});

/* CALCULATE */
function calculateScore(){
  scores = {
    komik:0,
    orfil:0,
    oxlab:0,
    mosaic:0,
    icon:0,
    spice:0,
    mvp:0,
    pipa:0,
    kuls:0,
    tobo:0,
    stage:0,
    flui:0,
    vote:0,
    wire:0};

  userAnswers.forEach((ans,i)=>{
    const opt = questions[i].options[ans];
    for(let key in opt.score){
      scores[key]+=opt.score[key];
    }
  });
}

/* RESULT IMAGE */
const resultImages = {
  komik:"img/POJOKOMIK.png",
  orfil:"img/ORFIL.png",
  oxlab:"img/OXLAB.png",
  mosaic:"img/MOSAIC.png",
  icon:"img/ICON.png",
  spice:"img/SPICE.png",
  mvp:"img/MVP.png",
  pipa:"img/PIPA.png",
  kuls:"img/KULS.png",
  tobo:"img/TOBO.png",
  stage:"img/STAGE.png",
  flui:"img/FLUI.png",
  vote:"img/VOTE MEDIA.png",
  wire:"img/WIRE.png",
};


function showResult(){
  quiz.classList.remove("active");
  result.classList.add("active");
  quiz.style.display = "none";
  
  const sorted = Object.entries(scores)
    .sort((a,b)=>b[1]-a[1]);

  const top1 = sorted[0][0];
  const top2 = sorted[1][0];
  const top3 = sorted[2][0];

  document.getElementById("result-text").innerText =
  `Kamu cocok dengan peminatan ${namaMap[top1]}, ${namaMap[top2]}, dan ${namaMap[top3]}`;

  if(sorted.length < 3){
    console.log("scores error");
    return;
  }

  document.getElementById("result1").src = resultImages[sorted[0][0]];
  document.getElementById("result2").src = resultImages[sorted[1][0]];
  document.getElementById("result3").src = resultImages[sorted[2][0]];
}