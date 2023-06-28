const skor1 = JSON.parse(localStorage.getItem('skor1')) || {
    menang: 0,
    kalah: 0,
    seri: 0,
};

function pilihPilihanKonputer() {
    const angkaAcak = Math.random();
    let pilihanKomputer;
    if (angkaAcak < 1/3) {
        pilihanKomputer = 'kertas';
    } else if (angkaAcak < 2/3) {
        pilihanKomputer = 'batu'
    } else {
        pilihanKomputer = 'gunting'
    }
    return pilihanKomputer;
}

function mainkanGame(pilihanPemain) {
    const pilihanKomputer = pilihPilihanKonputer();
    const hasil = tentukanHasil(pilihanPemain, pilihanKomputer);

    perbaruiSkor(hasil);
    perbaruiElemenPilihan(pilihanPemain, pilihanKomputer);
    perbaruiElemenHasil(hasil);
    perbaruiElemenSkor();

    localStorage.setItem('skor1', JSON.stringify(skor1));
    // alert(`Kamu memilih ${pilihanPemain}.\nKomputer memilih ${pilihanKomputer}.\nHasilnya ${hasil}\nMenang: ${skor1.menang}, Kalah: ${skor1.kalah}, Seri: ${skor1.seri}.`);
}

perbaruiElemenSkor();

function perbaruiElemenPilihan(pilihanPemain, pilihanKomputer) {
    let plhnpmn;
    if (pilihanPemain === "kertas") {
        plhnpmn = "paper";
    } else if (pilihanPemain === "batu") {
        plhnpmn = "rock";
    } else {
        plhnpmn = "scissors"
    }
    let plhkmp;
    if (pilihanKomputer === "kertas") {
        plhkmp = "paper";
    } else if (pilihanKomputer === "batu") {
        plhkmp = "rock";
    } else {
        plhkmp = "scissors"
    }
    document.querySelector('.js-pilihan').innerHTML = `Kamu memilih: <img class="ikon-pilihan" src="images/${plhnpmn}-emoji.png"><br>Komputer memilih: <img class="ikon-pilihan" src="images/${plhkmp}-emoji.png"><br><br><img class="ikon-pilihan" src="images/${plhnpmn}-emoji.png">vs<img class="ikon-pilihan" src="images/${plhkmp}-emoji.png">`;
}

function perbaruiElemenHasil(hasil) {
    document.querySelector('.js-hasil').innerHTML = `Hasilnya: ${hasil}`;
}

function perbaruiElemenSkor() {
    document.querySelector('.js-skor').innerHTML = `Menang: ${skor1.menang} | Kalah: ${skor1.kalah} | Seri: ${skor1.seri}`;
}

function tentukanHasil(pilihanPemain, pilihanKomputer) {
    if (pilihanPemain === pilihanKomputer) {
        return 'seri.';
    } else if (
        (pilihanPemain === 'kertas' && pilihanKomputer === 'batu') ||
        (pilihanPemain === 'batu' && pilihanKomputer === 'gunting') ||
        (pilihanPemain === 'gunting' && pilihanKomputer === 'kertas')
    ) {
        return 'kamu menang!';
    } else {
        return 'kamu kalah.';
    }
}

function perbaruiSkor(hasil) {
    if (hasil === 'kamu menang!') {
        skor1.menang += 1;
    } else if (hasil === 'kamu kalah.') {
        skor1.kalah += 1;
    } else if (hasil === 'seri.') {
        skor1.seri += 1;
    }
}

function resetSkor() {
    skor1.menang = 0;
    skor1.kalah = 0;
    skor1.seri = 0;
    perbaruiElemenSkor();
    localStorage.removeItem('skor1');
    // alert(`Skor telah direset.\nMenang: ${skor1.menang}, Kalah: ${skor1.kalah}, Seri: ${skor1.seri}.`);
    showConfirmation(false);
}

let isAutoPlay = false;
let intervalId;

function autoPlay() {
    if ((isAutoPlay = !isAutoPlay)) {
        intervalId = setInterval(() => {
            const pilihanPemain = pilihPilihanKonputer();
            mainkanGame(pilihanPemain);
        }, 1000);
        // const elementTombolAuto = document.querySelector('.js-tombol.auto');
        // elementTombolAuto.innerHTML = 'Stop Auto';
    } else {
        clearInterval(intervalId);
        // isAutoPlay = !isAutoPlay;
    }
    if (isAutoPlay) document.querySelector('.js-tombol-auto').innerText = 'Stop Auto';
    else document.querySelector('.js-tombol-auto').innerText = 'Auto Play';
}

const tombolKertas = document.querySelector('.js-tombol-kertas');
tombolKertas.addEventListener('click', () => mainkanGame('kertas'));

const tombolBatu = document.querySelector('.js-tombol-batu');
tombolBatu.addEventListener('click', () => mainkanGame('batu'));

const tombolGunting = document.querySelector('.js-tombol-gunting');
tombolGunting.addEventListener('click', () => mainkanGame('gunting'));

const tombolReset = document.querySelector('.js-tombol-reset');
tombolReset.addEventListener('click', () => showConfirmation(true));

const tombolAuto = document.querySelector('.js-tombol-auto');
tombolAuto.addEventListener('click', () => autoPlay());

// const tombolYa = document.querySelector('.js-tombol-ya');
// tombolYa.addEventListener('click', () => resetSkor());

// const tombolTidak = document.querySelector('.js-tombol-tidak');
// tombolTidak.addEventListener('click', () => showConfirmation(false));

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'k') {
        mainkanGame('kertas');
    } else if (event.key === 'b') {
        mainkanGame('batu');
    } else if (event.key === 'g') {
        mainkanGame('gunting');
    } else if (event.key === 'r') {
        resetSkor();
    } else if (event.key === 'Backspace') {
        resetSkor();
    } else if (event.key === 'a') {
        autoPlay();
    } else {
        console.log(event.key);
    }
});
function showConfirmation(bool) {
    if (bool === true) {
        document.querySelector('.konfirmasi')
        .innerHTML = `
        <p>Apakah Anda yakin untuk mereset skor?</p>
        <button class="tombol-konfirmasi js-tombol-ya" onclick="resetSkor()">Ya</button>
        <button class="tombol-konfirmasi js-tombol-tidak" onclick="showConfirmation(false)">Tidak</button>
        `;
    } else if (bool === false) {
        document.querySelector('.konfirmasi').innerHTML = '';
    }
}
