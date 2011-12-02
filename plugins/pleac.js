/**
 * Plugin to open specified language examples page 
 *
 * Usage:
 *   :pleac                       open default(python) pleac page 
 *   :pleac ruby strings          open ruby strings' examples page
 *
*/

function Pleac() {
  return {
    _execute: function(args){
      var lang = args.length ? args.shift() : 'python';
      var langs = ['perl', 'python', 'ruby', 'c++', 'bash', 'haskell', 'java', 'objective-c'];
      if (langs.indexOf(lang) == -1) {
        dactyl.echoerr('Unsupported pleac command: ' + lang);
        return false;
      }
      var part = args.length ? args.shift() : 'index';
      var url = "http://pleac.sourceforge.net/pleac_"+lang+"/"+part+".html";
      dactyl.execute(":open  "+url);
    },

    _completer: function(context) {
      completions = ['perl', 'python', 'ruby', 'c++', 'bash', 'haskell', 'java', 'objective-c', "strings", "numbers", "datesandtimes", "arrays", "hashes", "patternmatching", "fileaccess", "filecontents", "directories", "subroutines", "referencesandrecords", "packagesetc", "classesetc", "dbaccess", "userinterfaces", "processmanagementetc", "sockets", "internetservices", "cgiprogramming", "webautomation"];
      context.completions = [[c, ''] for each (c in completions)];
    }
  };
};

var _pleac = new Pleac();

group.commands.add(['pleac'],
  'open pleac page for given language',
  function(args) { _pleac._execute(args); },
  { argCount: '*', completer: _pleac._completer }
);
