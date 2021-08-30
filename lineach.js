var lineach = this;

lineach.ReadLine = function(on_read){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  reader.on("line", (line) => {
    on_read(line);
  });
}

lineach.ReadLines = function(on_read){
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  var lines = [];
  var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  reader.on("line", (line) => {
    lines.push(line);
  });
  reader.on("close", () => {
    on_read(lines);
  });
}

lineach.CreateLineMatchRegex = function(pattern){
  return new RegExp("^"+ pattern +"$");
};

lineach.Select = function(begin_pattern, end_pattern, lines, on_match){
  var is_matching = false;
  var begin_regex = lineach.CreateLineMatchRegex(begin_pattern);
  var end_regex = lineach.CreateLineMatchRegex(end_pattern);
  lines.forEach(line => {
    if (is_matching){
      if (end_regex.test(line)){
        is_matching = false;
      }else{
        on_match(line);
      }
    }else{
      if (begin_regex.test(line)){
        is_matching = true;
      }
    }
  });
};
