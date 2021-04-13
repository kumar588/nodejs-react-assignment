const restify = require('restify');
const service = require('./service');
const bunyan = require('bunyan');
const Task = require('./models/Task');
const corsMiddleware = require('restify-cors-middleware')
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
  origins: ['*']
});

server.pre(cors.preflight)
server.use(cors.actual)

var log = bunyan.createLogger({
    name: '10089-js-assignment',
    streams: [
      {
        level: 'info',
        path: './logs/log.txt'   // log INFO and above to file
      },
      {
        level: 'error',
        path: './logs/log-error.txt'  // log ERROR and above to a file
      }
    ]
  });

server.listen(8080, () => {
    console.log(`Server started on ${server.address().port}`);
})

server.get('/tasks', (req, res, next) => {
  log.info(`Received request to getAllTasks url: ${ req.url}, time: ${new Date()}`);
      service.getAllTasks()
      .then(response => { 
      //  console.log(response.data)
        res.send(response.data)
      })
      .catch(err => {
        log.error('Error in getAllTasks',err)
      })
     
});

server.get('/tasks/:taskId', (req, res, next) => {
  log.info(`Received request to getTask  url: ${ req.url}, time: ${new Date()}`);
      service.getTask(req.params.taskId)
      .then(response => { 
        res.send(response.data)
      })
      .catch(err => {
        log.error('Error in getTask',err)
      })

    
     
});

server.post('/tasks', (req, res, next) => {
    log.info(`Received request to create main task  url: ${ req.url}, time: ${new Date()}`);
    console.log(req.body)
        service.createMainTask(req.body)
        .then(response => { 
          // const task = JSON.parse(response.data);
          //  console.log(`Parsing to task object ${task}`)
          console.log(response.data)
          res.send(response.data)
        })
        .catch(err => {
          log.error('Error in creating main task',err)
        })
       
});

server.post('/tasks/:taskId', (req, res, next) => {
  log.info(`Received request to addSubTask  url: ${ req.url}, time: ${new Date()}`);
      service.addSubTask(req.params.taskId, req.body)
      .then(response => { 
        res.send(response.data)
      })
      .catch(err => {
        log.error('Error in addSubTask',err)
      })
     
});

server.put('/tasks/:taskId', (req, res, next) => {
  log.info(`Received request to modifyTask url: ${ req.url}, time: ${new Date()}`);
  console.log(req.body)
      service.modifyTask(req.params.taskId, req.body)
      .then(response => { 
        res.send(response.data)
      })
      .catch(err => {
        log.error('Error in modifyTask',err)
      })  
});

server.del('/tasks/:taskId', (req, res, next) => {
  log.info(`Received request to deleteTask url: ${ req.url}, time: ${new Date()}`);
      service.deleteTask(req.params.taskId)
      .then(response => { 
        res.send(response.data)
      })
      .catch(err => {
        log.error('Error in deleteTask',err)
      })  
});

