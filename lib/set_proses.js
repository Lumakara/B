const fs = require('fs');

// Pastikan folder database ada
if (!fs.existsSync('./database')) {
    fs.mkdirSync('./database', { recursive: true })
}

// Pastikan file database ada
if (!fs.existsSync('./database/set_proses.json')) {
    fs.writeFileSync('./database/set_proses.json', JSON.stringify([], null, 3))
}

const isSetProses = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return false
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            return true
        }
    }
    return false
}

const changeSetProses = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            _db[i].text = teks
            fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
            break
        }
    }
}

const addSetProses = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    const obj_add = {
        id: groupID,
        text: teks
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
}

const removeSetProses = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            _db.splice(i, 1)
            fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
            break
        }
    }
}

const getTextSetProses = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return null
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            return _db[i].text
        }
    }
    return null
}

const set_proses = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    if (isSetProses(groupID, _db)) {
        changeSetProses(teks, groupID, _db)
    } else {
        addSetProses(teks, groupID, _db)
    }
}

module.exports = {
    isSetProses,
    addSetProses,
    removeSetProses,
    changeSetProses,
    getTextSetProses,
    set_proses
}