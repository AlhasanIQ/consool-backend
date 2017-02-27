var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

var router = express.Router();

// the routes here are /api/*
// router.route('/exec').post(function(req, res) {
//
// });


var dynamic_commands = {
  mv : function(args){
    if (args.length >1) {
      return "Sorry!  :( ,\nit looks like our delivery monkey lost "+args[0]+" in the process.\nall data will be lost permanently and "+args[1]+" will be deleted to prevent future problems."
    }else {
      return "Invalid Args\nUsage: mv <source/file> <destination/file>"
    }
  },
  reboot: function(){
    return "<img>images/boom.jpg</img>"
  },
  touch: function(){
    return "<img>images/hacker.jpg</img>"
  },
  rm: function(){
    return "<img>images/hacker.jpg</img>"
  },
  cat:function(args){
    console.log(args);
    if (args.length > 0) {
      if (Object.keys(files).includes(args[0])) {
        return files[args[0]]()
      }else{
        return "File not found :( ,\n to check available files do 'ls'"
      }

    }else{
      return "Invalid Args\nUsage: cat <path/file>"
    }
  },

}

var commands = {
  ls: "bio about_this portfolio.sh contact.sh",
  mv: dynamic('mv'),
  reboot: dynamic('reboot'),
  touch: dynamic('touch'),
  rm: dynamic('rm'),
  cat : dynamic('cat')
}
var files = {
  bio: function() {
    return '-------------------------------------------------------\n'+
           '|                  Alhasan Ahmed Abd                  |\n'+
           '|                                                     |\n'+
           '| Web Application developer, DevOps officer, Sysadmin |\n'+
           '|                                                     |\n'+
           '|      Someone who likes Science, Tech and Life       |\n'+
           '|      Alhasan.Nasiry@gmail.com - +9647806686056      |\n'+
           '|                                                     |\n'+
           '|                  Tech-related Bio                   |\n'+
           '| Learning new things is like doing drugs for me,     |\n'+
           '| Anything related to CS is interisting for me. exce- |\n'+
           '| pt for the filthy Java thingies :P .                |\n'+
           '| Currently (17-feb) my focus is on mvvm and Devops   |\n'+
           '|                                                     |\n'+
           '|                    Personal Bio                     |\n'+
           '| A Sharp extroverted person who is casually identif- |\n'+
           '| ed as a megalomaniac, long story short: the one you |\n'+
           '| will not regret meeting :D.                         |\n'+
           '-------------------------------------------------------\n';

  },
  about_this:function() {
    return '-------------------------------------------------------\n'+
           '|                       Consool                       |\n'+
           '|                                                     |\n'+
           '| An attempt to make a "CLI" based personal website   |\n'+
           '| I started this to waste my time in my ComputerScie- |\n'+
           '| nce lectures because it should be obvious by now    |\n'+
           '| that i dont need to learn HTML and CSS :D           |\n'+
           '|                                                     |\n'+
           '|                 Development Stack :                 |\n'+
           '| Front-end : ReactJS + Pure CSS                      |\n'+
           '| Back-end  : NodeJS                                  |\n'+
           '| Version Control : Github                            |\n'+
           '|                                                     |\n'+
           '|                     OpenSource?                     |\n'+
           '| Yes , The project is OpenSource  🎉🎉              |\n'+
           '| Repo : github.com/AlhasanIQ/Consool     (GPLv3)     |\n'+
           '-------------------------------------------------------\n';
  },
  'portfolio.sh':function() {
    return '-------------------------------------------------------\n'+
           '|                      Portfolio                      |\n'+
           '|                                                     |\n'+
           '| Some great things are going to fill this empty box  |\n'+
           '| Projects that will put Google,Facebook and Microso- |\n'+
           '| ft to shame compared to this Greatness :D           |\n'+
           '|                                                     |\n'+
           '|               Fasten your seat belts                |\n'+
           '|                                                     |\n'+
           '-------------------------------------------------------\n';
  },
  'contact.sh':function() {
    return '-------------------------------------------------------\n'+
           '|                      Contact Me                     |\n'+
           '|                                                     |\n'+
           '| This should be changed to a REPL like input,        |\n'+
           '| Until i have the time to do that these should do:   |\n'+
           '|                                                     |\n'+
           '| Email:     alhasan.nasiry@gmail.com                 |\n'+
           '| Phone:     +964-7806686056                          |\n'+
           '| LinkedIn:  linkedin.com/in/alhasaniq/               |\n'+
           '-------------------------------------------------------\n';
  }

}

function sanitize(cmd,args) {
  let total = cmd + args.join(" ");
  if (total.indexOf("/dev/null") >= 0) {
    return "<img>images/hacker.jpg</img>"
  }
  else {
    return false
  }
}
function dynamic(cmd) {
  return dynamic_commands[cmd]
}
function exec_command(cmd,args){
  let sanitize_result = sanitize(cmd,args);
  if(sanitize_result){
    return sanitize_result
  }

  if (Object.keys(commands).includes(cmd)) {
    if(typeof commands[cmd] === 'string') return commands[cmd]
    else return commands[cmd](args)
  }else if (cmd.indexOf("./") == 0 ) {
    args = cmd.substr(2,cmd.length - 2).split(" ")
    return commands['cat'](args)
  }else {
    return "Command not Found ("+cmd+"),\nTry to do 'help' to see the available commands."
  }
}

app.post('/api/exec', function (req, res) {
  var cmd = req.body.cmd;
  var args = req.body.args;
  let exec_result = exec_command(cmd,args)
  console.log(req.body);
  res.json({ result: exec_result });
})

// all of our routes will be prefixed with /api
// app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})
