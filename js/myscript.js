






var currentLevel = 0;
let levelScores  = { 1: null, 2: null, 3: null };


function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


function updateDots(level) {
  document.querySelectorAll('.lv-dot').forEach((dot, i) => {
    dot.classList.remove('done', 'active');
    if (i + 1 < level)  dot.classList.add('done');
    if (i + 1 === level) dot.classList.add('active');
  });
}


function updateHUD(label, hpPersen) {
  document.getElementById('hudLabel').textContent = label;
  document.getElementById('hpFill').style.width   = hpPersen + '%';
}




function mulaiGame() {
  currentLevel = 1;
  levelScores  = { 1: null, 2: null, 3: null };
  updateDots(1);
  updateHUD('LEVEL 01', 100);
  showScreen('screen-level1');
  resetLevel1();
}




let l1Soal     = 0;
let l1Benar    = 0;
let l1Total    = 5;
let l1Current  = 0;
let l1Selesai  = false;
let l1Angka    = 0;

function resetLevel1() {
  l1Soal    = 0;
  l1Benar   = 0;
  l1Current = 0;
  l1Selesai = false;

  document.getElementById('l1-soal').textContent  = '0/' + l1Total;
  document.getElementById('l1-benar').textContent = '0';
  document.getElementById('l1-main').style.display    = 'block';
  document.getElementById('l1-clear').className       = 'stage-clear';

  updateHUD('LEVEL 01', 100);
  buatSoalL1();
}

function buatSoalL1() {
  var angka = Math.floor(Math.random() * 50) + 1;
  l1Angka   = angka;
  document.getElementById('l1-angka').textContent = angka;
  document.getElementById('l1-msg').className     = 'msg-box msg-neutral';
  document.getElementById('l1-msg').innerHTML     =
    '<span class="msg-icon">🎮</span><span>Angka ini GANJIL atau GENAP?</span>';
}

function jawabL1(jawaban) {
  if (l1Selesai) return;

  var angka       = l1Angka;
  const PEMBAGI   = 2;
  let jawabanBenar;

  if (angka % PEMBAGI === 0) {
    jawabanBenar = 'genap';
  } else {
    jawabanBenar = 'ganjil';
  }

  l1Current++;
  document.getElementById('l1-soal').textContent = l1Current + '/' + l1Total;

  let msg = document.getElementById('l1-msg');
  if (jawaban === jawabanBenar) {
    l1Benar++;
    document.getElementById('l1-benar').textContent = l1Benar;
    msg.className = 'msg-box msg-success';
    msg.innerHTML = '<span class="msg-icon">✅</span><span>BENAR! ' + angka + ' memang ' + jawabanBenar.toUpperCase() + '!</span>';
  } else {
    msg.className = 'msg-box msg-error';
    msg.innerHTML = '<span class="msg-icon">❌</span><span>SALAH! ' + angka + ' adalah ' + jawabanBenar.toUpperCase() + '!</span>';
  }

  let hpPersen = Math.round(((l1Total - l1Current) / l1Total) * 100);
  updateHUD('LEVEL 01', hpPersen);

  if (l1Current >= l1Total) {
    l1Selesai = true;
    let bintang = l1Benar >= 5 ? '⭐⭐⭐' : l1Benar >= 3 ? '⭐⭐' : '⭐';
    levelScores[1] = { benar: l1Benar, total: l1Total, bintang: bintang };
    setTimeout(() => tampilClearL1(), 900);
  } else {
    setTimeout(() => buatSoalL1(), 1000);
  }
}

function tampilClearL1() {
  document.getElementById('l1-main').style.display = 'none';
  let sc = document.getElementById('l1-clear');
  sc.className = 'stage-clear show';

  let d = levelScores[1];
  document.getElementById('l1-clear-stars').textContent = d.bintang;
  document.getElementById('l1-clear-info').innerHTML =
    'JAWABAN BENAR: ' + d.benar + ' / ' + d.total + '<br>RATING: ' +
    (d.benar === 5 ? 'PERFECT!' : d.benar >= 3 ? 'GREAT!' : 'KEEP GOING!');
}

function lanjutLevel2() {
  currentLevel = 2;
  updateDots(2);
  updateHUD('LEVEL 02', 100);
  showScreen('screen-level2');
  resetLevel2();
}




let l2Soal    = 0;
let l2Benar   = 0;
let l2Total   = 4;
let l2Ops     = ['+', '-', '*', '/'];
let l2OpsIdx  = 0;
let l2A       = 0;
let l2B       = 0;
let l2Selesai = false;

function resetLevel2() {
  l2Soal    = 0;
  l2Benar   = 0;
  l2OpsIdx  = 0;
  l2Selesai = false;

  document.getElementById('l2-soal').textContent  = '0/' + l2Total;
  document.getElementById('l2-benar').textContent = '0';
  document.getElementById('l2-main').style.display    = 'block';
  document.getElementById('l2-clear').className       = 'stage-clear';
  document.getElementById('l2-input').value           = '';

  updateHUD('LEVEL 02', 100);
  buatSoalL2();
}

function buatSoalL2() {
  let op = l2Ops[l2OpsIdx];
  let a, b;

  if (op === '/') {
    b = Math.floor(Math.random() * 9) + 1;
    a = b * (Math.floor(Math.random() * 9) + 1);
  } else {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
  }

  l2A = a; l2B = b;
  let opLabel = op === '*' ? '×' : op === '/' ? '÷' : op;
  document.getElementById('l2-soal-text').textContent = a + ' ' + opLabel + ' ' + b + ' = ?';
  document.getElementById('l2-input').value = '';
  document.getElementById('l2-input').focus();

  let opName = { '+': 'PENJUMLAHAN', '-': 'PENGURANGAN', '*': 'PERKALIAN', '/': 'PEMBAGIAN' };
  document.getElementById('l2-op-label').textContent = opName[op];
  document.getElementById('l2-msg').className = 'msg-box msg-neutral';
  document.getElementById('l2-msg').innerHTML =
    '<span class="msg-icon">🧮</span><span>Hitung dan masukkan jawabanmu!</span>';
}

function jawabL2() {
  if (l2Selesai) return;

  let op     = l2Ops[l2OpsIdx];
  let jawaban = parseFloat(document.getElementById('l2-input').value);
  let benar;

  if (isNaN(jawaban)) {
    document.getElementById('l2-msg').className = 'msg-box msg-error';
    document.getElementById('l2-msg').innerHTML =
      '<span class="msg-icon">⚠️</span><span>Masukkan angka dulu!</span>';
    return;
  }

  let a = l2A, b = l2B;
  const tambah = a + b;
  const kurang = a - b;
  const kali   = a * b;
  const bagi   = a / b;

  if (op === '+') benar = tambah;
  else if (op === '-') benar = kurang;
  else if (op === '*') benar = kali;
  else benar = bagi;

  l2Soal++;
  l2OpsIdx++;
  document.getElementById('l2-soal').textContent = l2Soal + '/' + l2Total;

  let msg = document.getElementById('l2-msg');
  if (Math.abs(jawaban - benar) < 0.01) {
    l2Benar++;
    document.getElementById('l2-benar').textContent = l2Benar;
    msg.className = 'msg-box msg-success';
    msg.innerHTML = '<span class="msg-icon">✅</span><span>BENAR! Jawabannya memang ' + benar + '!</span>';
  } else {
    msg.className = 'msg-box msg-error';
    msg.innerHTML = '<span class="msg-icon">❌</span><span>SALAH! Jawaban yang benar adalah ' + benar + '!</span>';
  }

  let hpPersen = Math.round(((l2Total - l2Soal) / l2Total) * 100);
  updateHUD('LEVEL 02', hpPersen);

  if (l2Soal >= l2Total) {
    l2Selesai = true;
    let bintang = l2Benar >= 4 ? '⭐⭐⭐' : l2Benar >= 2 ? '⭐⭐' : '⭐';
    levelScores[2] = { benar: l2Benar, total: l2Total, bintang: bintang };
    setTimeout(() => tampilClearL2(), 900);
  } else {
    setTimeout(() => buatSoalL2(), 1000);
  }
}

function tampilClearL2() {
  document.getElementById('l2-main').style.display = 'none';
  let sc = document.getElementById('l2-clear');
  sc.className = 'stage-clear show';

  let d = levelScores[2];
  document.getElementById('l2-clear-stars').textContent = d.bintang;
  document.getElementById('l2-clear-info').innerHTML =
    'JAWABAN BENAR: ' + d.benar + ' / ' + d.total + '<br>RATING: ' +
    (d.benar === 4 ? 'PERFECT!' : d.benar >= 2 ? 'GREAT!' : 'KEEP GOING!');
}

function lanjutLevel3() {
  currentLevel = 3;
  updateDots(3);
  updateHUD('LEVEL 03', 100);
  showScreen('screen-level3');
  resetLevel3();
}




const BATAS_BAWAH = 1;
const BATAS_ATAS  = 10;

var angkaRahasia;
let l3Percobaan = 0;
let l3MaxCoba   = 5;
let l3Riwayat   = [];
let l3Selesai   = false;

function resetLevel3() {
  angkaRahasia = Math.floor(Math.random() * BATAS_ATAS) + BATAS_BAWAH;
  l3Percobaan  = 0;
  l3Riwayat    = [];
  l3Selesai    = false;

  document.getElementById('l3-input').value            = '';
  document.getElementById('l3-input').disabled         = false;
  document.getElementById('l3-btn-tebak').disabled     = false;
  document.getElementById('l3-sisa').textContent       = l3MaxCoba;
  document.getElementById('l3-percobaan').textContent  = 0;
  document.getElementById('l3-secret').textContent     = '?';
  document.getElementById('l3-secret').className       = 'secret-box hidden-state';
  document.getElementById('l3-msg').className          = 'msg-box msg-neutral';
  document.getElementById('l3-msg').innerHTML          =
    '<span class="msg-icon">🎮</span><span>Tebak angka ' + BATAS_BAWAH + '–' + BATAS_ATAS + '! Kamu punya ' + l3MaxCoba + ' nyawa.</span>';
  document.getElementById('l3-history').innerHTML      = '';
  document.getElementById('l3-main').style.display     = 'block';
  document.getElementById('l3-clear').className        = 'stage-clear';

  updateHUD('LEVEL 03', 100);
  document.getElementById('l3-input').focus();
}

function cekTebakan() {
  if (l3Selesai) return;

  var input   = document.getElementById('l3-input');
  let tebakan = parseInt(input.value);
  let msg     = document.getElementById('l3-msg');

  if (isNaN(tebakan) || tebakan < BATAS_BAWAH || tebakan > BATAS_ATAS) {
    msg.className = 'msg-box msg-error';
    msg.innerHTML = '<span class="msg-icon">⚠️</span><span>Masukkan angka ' + BATAS_BAWAH + '–' + BATAS_ATAS + '!</span>';
    return;
  }

  l3Percobaan++;
  document.getElementById('l3-percobaan').textContent = l3Percobaan;

  let status;
  if (tebakan === angkaRahasia)      status = 'correct';
  else if (tebakan < angkaRahasia)   status = 'too-low';
  else                               status = 'too-high';

  tambahRiwayat(tebakan, status);

  if (tebakan === angkaRahasia) {
    l3Selesai = true;
    document.getElementById('l3-secret').textContent  = angkaRahasia;
    document.getElementById('l3-secret').className    = 'secret-box bounce';
    msg.className = 'msg-box msg-success';
    msg.innerHTML = '<span class="msg-icon">🎉</span><span>BENAR! Angkanya ' + angkaRahasia + '. Selesai dalam ' + l3Percobaan + ' percobaan!</span>';
    document.getElementById('l3-input').disabled      = true;
    document.getElementById('l3-btn-tebak').disabled  = true;
    document.getElementById('l3-sisa').textContent    = 0;
    updateHUD('LEVEL 03', 0);

    let bintang = l3Percobaan <= 2 ? '⭐⭐⭐' : l3Percobaan <= 3 ? '⭐⭐' : '⭐';
    levelScores[3] = { percobaan: l3Percobaan, bintang: bintang };
    setTimeout(() => tampilClearL3(), 1000);

  } else {
    let sisa = l3MaxCoba - l3Percobaan;
    document.getElementById('l3-sisa').textContent = sisa;
    let hpPersen = Math.round((sisa / l3MaxCoba) * 100);
    updateHUD('LEVEL 03', hpPersen);

    let secretEl = document.getElementById('l3-secret');

    if (sisa <= 0) {
      l3Selesai = true;
      secretEl.textContent = angkaRahasia;
      secretEl.className   = 'secret-box';
      msg.className = 'msg-box msg-error';
      msg.innerHTML = '<span class="msg-icon">💀</span><span>GAME OVER! Jawabannya adalah ' + angkaRahasia + '!</span>';
      document.getElementById('l3-input').disabled     = true;
      document.getElementById('l3-btn-tebak').disabled = true;
      levelScores[3] = { percobaan: l3MaxCoba, bintang: '⭐' };
      setTimeout(() => tampilClearL3(), 1000);
    } else if (status === 'too-low') {
      msg.className = 'msg-box msg-up';
      msg.innerHTML = '<span class="msg-icon">⬆️</span><span>Terlalu KECIL! Coba lebih besar. Sisa ' + sisa + ' nyawa.</span>';
      secretEl.className = 'secret-box shake';
      setTimeout(() => { secretEl.className = 'secret-box hidden-state'; }, 400);
    } else {
      msg.className = 'msg-box msg-down';
      msg.innerHTML = '<span class="msg-icon">⬇️</span><span>Terlalu BESAR! Coba lebih kecil. Sisa ' + sisa + ' nyawa.</span>';
      secretEl.className = 'secret-box shake';
      setTimeout(() => { secretEl.className = 'secret-box hidden-state'; }, 400);
    }
  }

  input.value = '';
  input.focus();
}

function tambahRiwayat(angka, status) {
  let list  = document.getElementById('l3-history');
  let li    = document.createElement('li');
  li.className = status;
  let labelMap = { correct: 'BENAR ✓', 'too-low': 'terlalu kecil ↑', 'too-high': 'terlalu besar ↓' };
  li.innerHTML = '<span>Coba ' + l3Percobaan + ': ' + angka + '</span><span>' + labelMap[status] + '</span>';
  list.prepend(li);
}

function tampilClearL3() {
  document.getElementById('l3-main').style.display = 'none';
  let sc = document.getElementById('l3-clear');
  sc.className = 'stage-clear show';

  let d = levelScores[3];
  document.getElementById('l3-clear-stars').textContent = d.bintang;
  document.getElementById('l3-clear-info').innerHTML =
    'SELESAI DALAM ' + d.percobaan + ' PERCOBAAN<br>RATING: ' +
    (d.percobaan <= 2 ? 'PERFECT!' : d.percobaan <= 3 ? 'GREAT!' : d.percobaan <= 5 ? 'GOOD!' : 'TRY AGAIN!');
}




function tampilEndGame() {
  updateDots(4);
  showScreen('screen-endgame');

  let totalBintang = '';
  let allScores    = '';

  for (let lv = 1; lv <= 3; lv++) {
    let d = levelScores[lv];
    totalBintang += d.bintang + ' ';
    if (lv === 1) allScores += 'LEVEL 1 (GANJIL/GENAP): ' + d.bintang + '\n';
    if (lv === 2) allScores += 'LEVEL 2 (MATEMATIKA): '  + d.bintang + '\n';
    if (lv === 3) allScores += 'LEVEL 3 (TEBAK ANGKA): ' + d.bintang + '\n';
  }

  let totalStar = (totalBintang.match(/⭐/g) || []).length;
  let peringkat = totalStar === 9 ? 'PERFECT RUN!!' :
                  totalStar >= 7  ? 'AMAZING!!'     :
                  totalStar >= 5  ? 'GREAT JOB!'    : 'KEEP PLAYING!';

  document.getElementById('end-stars').textContent   = totalStar >= 7 ? '⭐⭐⭐' : totalStar >= 5 ? '⭐⭐' : '⭐';
  document.getElementById('end-peringkat').textContent = peringkat;
  document.getElementById('end-l1').textContent      = levelScores[1].bintang + ' ' + levelScores[1].benar + '/' + levelScores[1].total + ' benar';
  document.getElementById('end-l2').textContent      = levelScores[2].bintang + ' ' + levelScores[2].benar + '/' + levelScores[2].total + ' benar';
  document.getElementById('end-l3').textContent      = levelScores[3].bintang + ' selesai dalam ' + levelScores[3].percobaan + ' percobaan';
  document.getElementById('end-total').textContent   = totalStar + ' / 9 bintang';
}

function mainLagi() {
  currentLevel = 0;
  levelScores  = { 1: null, 2: null, 3: null };
  updateDots(0);
  updateHUD('START', 100);
  showScreen('screen-start');
}


document.addEventListener('DOMContentLoaded', function () {
  showScreen('screen-start');
  updateHUD('START', 100);

  document.getElementById('l2-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') jawabL2();
  });
  document.getElementById('l3-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') cekTebakan();
  });
});
