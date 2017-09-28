const Crawler = require('crawler')
const taskList = require('./src/components/taskList')
const domCreator = require('./src/components/domCreator')
const resultFormatter = require('./src/components/resultFormatter')

var c = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error)
        }else{
            const domObj = domCreator(res.$)
            resultFormatter(domObj, res.$)
        }
        done()
    }
});

c.queue(taskList)
