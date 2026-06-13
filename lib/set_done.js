const fs = require('fs');

// Pastikan folder database ada
if (!fs.existsSync('./database')) {
    fs.mkdirSync('./database', { recursive: true })
}

// Pastikan file database ada
if (!fs.existsSync('./database/set_done.json')) {
    fs.writeFileSync('./database/set_done.json', JSON.stringify([], null, 3))
}

const isSetDone = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return false
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            return true
        }
    }
    return false
}

const changeSetDone = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            _db[i].text = teks
            fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
            break
        }
    }
}

const addSetDone = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    const obj_add = {
        id: groupID,
        text: teks
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
}

const removeSetDone = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            _db.splice(i, 1)
            fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
            break
        }
    }
}

const getTextSetDone = (groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return null
    for (let i = 0; i < _db.length; i++) {
        if (_db[i] && _db[i].id === groupID) {
            return _db[i].text
        }
    }
    return null
}

const set_done = (teks, groupID, _db) => {
    if (!_db || !Array.isArray(_db)) return
    if (isSetDone(groupID, _db)) {
        changeSetDone(teks, groupID, _db)
    } else {
        addSetDone(teks, groupID, _db)
    }
}

module.exports = {
    isSetDone,
    addSetDone,
    removeSetDone,
    changeSetDone,
    getTextSetDone,
    set_done
}