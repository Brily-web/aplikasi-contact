const { rejects } = require("node:assert");
const fs = require("node:fs");
const { resolve } = require("node:path");
const validator = require("validator");
const chalk = require("chalk");

//membuat direktori data jika belum dibuat
dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

//membuat file jika belum dibuat
filepath = "./data/contacts.json";
if (!fs.existsSync(filepath)) {
  fs.writeFileSync(filepath, "[]", "utf-8");
}

const loadContact = () => {
  //baca isi file
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  //mengambil string JSON dan mengubahnya menjadi objek JavaScript
  const contacts = JSON.parse(file);
  return contacts
}

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact()
  //chek duplikasi file
  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log(
      chalk.black.bgRed.bold(
        "nama yang anda masukan telah tersedia, gunakan nama lain!"
      )
    );
    return false;
  }
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.black.bold.bgRed(
          "email yang anda masukan tidak valid, silahkan diubah!"
        )
      );
      return false;
    }
  }
  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(
        chalk.black.bold.bgRed(
          "nomor yang anda masukan tidak valid, silahkan diubah!"
        )
      );
      return false;
    }
  } 
  //menambahkan contact untuk di ubah ke object
  contacts.push(contact);
  //mengambil objek JavaScript dan mengubahnya menjadi string JSON dan memasikan ke dalam file.
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.bgGreen.bold("data anda telah dimasukan"));
  // rl.close();
};

const listContact = () => {
  const contacts = loadContact()
  contacts.forEach((contact,i) => {
    console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`)
  });
}

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => { 
    return contact.nama.toLowerCase() === nama.toLowerCase(); });
  if(!contact){
    console.log(
      chalk.black.bold.bgRed(
        `${nama} tidak ditemukan!!!`
      )
    );
    return false;
  }
  console.log(chalk.black.bold(`${contact.nama}`));
  console.log(chalk.black.bold(`${contact.email}`));
  console.log(chalk.black.bold(`${contact.noHP}`));

}

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

  if(contacts.length === newContact.length){
    console.log(chalk.black.bold.bgRed(`${nama} tidak ditemukan!!!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));
  console.log(chalk.bgGreen.bold(`${nama} berhasil dihapus`));

}

module.exports = { simpanContact, listContact, detailContact, deleteContact};
