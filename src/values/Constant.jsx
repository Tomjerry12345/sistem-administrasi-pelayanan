function createData(no, nama, alamat, bantuan, nokk, nik, tanggal) {
  return { no, nama, alamat, bantuan, nokk, nik, tanggal };
}

export const dataDummy = [
  createData(1, "Reski Arwah", "Tanuntung", "KIS", "55555555", "730205201199002", "09/07/2022"),
];

export const constantKelengkapanBerkas = [
  [
    { label: "Kartu Keluarga", name: "kartu_keluarga" },
    { label: "Kartu KTP", name: "ktp" },
    { label: "KKS", name: "kks" },
  ],
  [
    { label: "KIS", name: "kis" },
    { label: "SKTM Desa/Kelurahan", name: "sktm_desa_kelurahan" },
    { label: "Foto Kondisi Rumah", name: "foto_kondisi_rumah" },
  ],
];

export const constantJenisLayanan = [
  "KK",
  "KTP",
  "Akta kelahiran",
  "Surat keterangan pindah",
  "Surat keterangan belum nikah",
  "Surat keterangan ahli waris",
  "Surat keterangan tidak mampu",
];

export const constantBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const constantTahun = ["2022", "2023", "2024", "2025"];

export const constantHubunganKeluarga = [
  "Kepala Keluarga",
  "Istri",
  "Anak",
  "Mertua",
  "Famili lain",
  "Cucu",
];

export const constantStatusKawin = ["TD", "Belum", "Kawin", "Cerai"];

export const constantLingkungan = [
  "Baru",
  "Tappe'e",
  "Lappae",
  "Kokoe",
  "Talibunging",
  "Larea-larea",
];

export const constantKelurahan = [
  [
    "Bone",
    "Bontosunggu",
    "Lempangang",
    "Maccinibaji",
    "Maradekaya",
    "PaBentenganng",
    "Panciro",
    "Pannyangkalang",
    "Paraikatte",
    "Tangkebajeng",
    "Kalebajeng",
    "Limbung",
    "Mata Allo",
    "Tubajeng",
  ],
  ["Bontomanai", "Borimatangkasa", "gentungang", "Kalemandalle", "Manjalling", "Tanabangka"],
  [
    "Biringala",
    "Kanjilo",
    "Moncobalang",
    "Tamannyeleng",
    "Tinggimae",
    "Benteng Somba Opi",
    "Lembang parang",
  ],
  [
    "Batumalonro",
    "Baturappe",
    "Berutallasa",
    "Borimasunggu",
    "julukanaya",
    "Lembangloe",
    "parangloe",
    "pencong",
    "taring",
    "Lauwa",
    "Tonrorita",
  ],
  [
    "Bontolempangan",
    "Bontoloe",
    "Bontotangga",
    "Julumate'ne",
    "Lassa-lassa",
    "Pa'ladingang",
    "Paranglompoa",
    "Ulujangang",
  ],
  [
    "Bili-bili",
    "Mata Allo",
    "Nirannuang",
    "Pakatto",
    "Romangloe",
    "Sokkolia",
    "Bontomanai",
    "Borongloe",
    "Romang Lompoa",
  ],
  [
    "Barembeng",
    "Bategulung",
    "Bontobiraeng",
    "Selatan",
    "bontolangkasa utara",
    "Bulogading",
    "Kalebarembeng",
    "Katangka",
    "Manjapai",
    "Romanglasa",
    "Bontonompo",
    "Kalaserena",
    "Tamallayang",
  ],
  [
    "Bontosunggu",
    "Jipang",
    "Pabundukang",
    "Salakangki",
    "Salajo",
    "Sengka",
    "Tanrara",
    "Tindang",
    "Bontoramba",
  ],
  ["Bissoloro", "Bontomanai", "Buakkang", "Mangempang", "Rannaloe", "Jenebatu", "Sapaya"],
  ["Bilalang", "Manuju", "Moncongloe", "Pattallikang", "Tamalatea", "Tana Karaeng", "Tassese"],
  [
    "Bontoala",
    "Bontoramba",
    "Bungaejaya",
    "Jenetallasa",
    "Julubori",
    "Julukanaya",
    "Julupa'mai",
    "Kampili",
    "Pallangga",
    "Panakkukang",
    "Taeng",
    "Toddotoa",
    "Mangalli",
    "Pangkabinanga",
    "Parangbanoa",
    "Tetebatu",
  ],
  ["Belabori", "Belapunranga", "Bontokassi", "Barisallo", "Lonjoboko", "Bontoparang", "Lanna"],
  ["Bilanrengi", "Jonjo", "Majannang", "Manimbahoi", "Sicini"],
  [
    "Borongpalala",
    "Jenemadinging",
    "Pacelakkang",
    "Pallantikang",
    "Panaikang",
    "Pattalassang",
    "Sunggumanai",
    "Timbuseng",
  ],
  [
    "Batangkaluku",
    "Bonto-bontoa",
    "Bontoramba",
    "Kalegowa",
    "Katangka",
    "Mawang",
    "Paccinongang",
    "Pandang-pandang",
    "Romangpolong",
    "Samata",
    "Sungguminasa",
    "Tamarunang",
    "Tombolo",
    "Tompobalang",
  ],
  ["Parigi", "Bonto Lerung", "Bulutana", "Gantarang", "Garassing", "Malino", "Pattapang"],
  [
    "Bontobuddung",
    "Datara",
    "Garing",
    "Rappoala",
    "Rappolemba",
    "Tanete",
    "Cikoro",
    "Malakaji",
  ],
  [
    "Balassuka",
    "Bolaromang",
    "Erelembang",
    "Kanreapia",
    "Mamampang",
    "Pao",
    "Tabinjai",
    "Tonasa",
    "Tamaona",
  ],
];
export const constantJenisKelamin = ["Laki - Laki", "Perempuan"];

export const constantJenisLantai = ["Bambu", "Kayu", "Semen", "Tegel"];

export const constantJenisDinding = ["Anyaman bambu", "Papan", "Tembok"];

export const constantSumberAirMinum = [
  "Air sungai",
  "Sumur pribadi",
  "Air isi ulang",
  "Air kemasan bermerk",
];

export const constantDaya = ["450 watt", "900 watt", "1300 watt", ">= 2200 watt"];

export const kusioner = {
  Tabung: 2,
  Kulkas: 4,
  AC: 6,
  Hp: 3,
  Tv: 4,
  Emas: 6,
  Komputer: 4,
  Laptop: 4,
  Sepeda: 2,
  Motor: 5,
  Mobil: 10,
  Perahu: 7,
  Kapal: 7,
  "Rumah lain": 10,
  "Lahan lain": 9,
  Kambing: 3,
  Sapi: 5,
  Kuda: 5,
  Babi: 1,
  Bambu: 2,
  Kayu: 4,
  Semen: 5,
  Tegel: 7,
  "Anyaman bambu": 2,
  Papan: 4,
  Tembok: 6,
  "Air sungai": 2,
  "Sumur pribadi": 4,
  "Air isi ulang": 5,
  "Air kemasan bermerk": 7,
  "450 watt": 2,
  "900 watt": 3,
  "1300 watt": 4,
  ">= 2200 watt": 6,
};
