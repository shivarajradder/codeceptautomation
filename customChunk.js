module.exports = (files, chunks) => {

    var arrrayOfChunks = [];
    let totalScenarios = 0;
    let filesMap = new Map()
    let grepp = '';
    if (process.env.GREP_EXPRESSION === undefined) {
        process.argv.forEach(element => { if (element.includes('@')) { console.log(element); grepp = element } });
    }
    else { grepp = process.env.GREP_EXPRESSION }
    for (let i = 0; i <= files.length; i++) {
        if (files[i] !== undefined) {
            var fill = files[i] + '';
            var JFile = require('jfile');
            var txtFile = new JFile(fill);
            var result = txtFile.grep(grepp);
            if (result.length) {
                filesMap.set(files[i], result.length)
                totalScenarios = totalScenarios + result.length
            }
        }
    }
    filesMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }

    const totalFiles = filesMap.size;
    console.log("totalFiles   : " + totalFiles)
    var counts = 1;
    const chunksCount = process.env.CHUNKS || chunks;
    var flg = false;
    var indexx = 0; //index of nested array data
    console.log("avg : " + totalScenarios / chunksCount)
    for (let [key, value] of filesMap) {
        console.log(key + "---------->" + value);
        if (counts <= chunksCount) {

            if (flg === false) {
                let chunkArray = []; chunkArray[indexx] = key; arrrayOfChunks[counts] = chunkArray; counts++;
                if (counts > chunksCount) { counts = chunksCount; flg = true; indexx++ }
            }
            else {

                arrrayOfChunks[counts][indexx] = key
                counts--;
                if (counts === 0) { counts = chunksCount; indexx++ }
            }
        }


    }
    console.log(arrrayOfChunks)
    return arrrayOfChunks
}