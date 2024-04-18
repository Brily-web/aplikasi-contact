
const { type } = require("os");
const { command, describe, demandOption, string } = require("yargs");
const yargs = require("yargs");
const yargsParser = require("yargs-parser");
const { simpanContact,listContact, detailContact,deleteContact } = require("./contact");


// const contact = require('./contact')
//bisa menggunakan object distract dengan cara:
//  const {simpanContact, tulisPertanyaan} = require("./contact");
// const main = async () => {
//   const nama = await tulisPertanyaan("Masukan Nama Anda: ");
//   const email = await tulisPertanyaan("Masukan Email Anda: ");
//   const noHP = await tulisPertanyaan("Masukan nomor HandPhone Anda: ");

//   simpanContact(nama,email,noHP)
// }
// main()

yargs
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor HandPhone",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand()

  //menampilkan daftar semua nama dan noHP
  .command({
    command: "list",
    describe: "menampilkan semuanama dan noHP",
    handler() {
      listContact();
    },
  })

  //menampilkan detail sebuah contact
  .command({
    command: "detail",
    describe: "menampilkan detail contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.nama);
    },
  })

  //menghapus contact berdasrakan nama
  .command({
    command: "delete",
    describe: "menghapus contact berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.nama);
    },
  })
  .parse();

