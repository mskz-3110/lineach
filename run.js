var optpas = require("optpas");
var select_parser = new optpas.OptionParser();
select_parser.Add('b', "begin", "// begin", "Begin regex pattern.");
select_parser.Add('e', "end", "// end", "End regex pattern.");

var lineach = require("./lineach.js");
var args = process.argv.slice(2);
var type = args.shift();
switch (type){
case "select":{
  var parsed = select_parser.Parse(args);
  lineach.ReadLines((lines) => {
    lineach.Select(parsed.options.begin, parsed.options.end, lines, (line) => {
      console.log(line);
    });
  });
}break;

case "help":{
  process.stdout.write(`
  select : Select lines.
${select_parser.ToString("    ")}
  help : Show usage.
`);
  process.exit(2);
}break;

default:{
  console.log("Invalid type=" + type + " args=" + JSON.stringify(args));
  process.exit(1);
}break;
}
