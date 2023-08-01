function createData(no, nama, alamat, bantuan, nokk, nik, tanggal) {
  return { no, nama, alamat, bantuan, nokk, nik, tanggal };
}

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

export const constantTahun = ["2023", "2024", "2025"];

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
  "Lengkong",
];

export const constantJenisKelamin = ["Laki - Laki", "Perempuan"];

export const constantJenisLantai = ["Bambu", "Kayu", "Semen", "Tegel"];

export const constantJenisDinding = ["Anyaman bambu", "Papan", "Tembok"];
