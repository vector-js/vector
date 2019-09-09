var glob = require('glob'),
    fs = require('fs');

const dirTree = require("directory-tree");
const flatten = require('tree-flatten');
const jsonfile = require("jsonfile");
const tree = dirTree("./dist/examples", { exclude: /\.js.map/ });

const json = flatten(tree, 'children');
json.forEach(function(element){
  fs.readFile( element.path, 'utf8', (error, data) =>{
    element.id = element.name.replace('.js', '');
    element.path = element.path.replace('dist', '');
    if( data != undefined ) {
      let start = null;
      let str = '';
      for( let i = 0; i < data.length; i++ ) {
        if( data[i] === '@' ) {
          start = i;
        } else if( data[i] === `\n` && start != null ) {

          let type = str.substring(0, str.indexOf(' '));
          let contents = str.substring(str.indexOf(' ') + 1, str.length);
          element[type] = contents;
          str = '';
          start = null;
        } else if( start != null ) {
          str += data[i];
        }
      }
    }
    // console.log(element);
    const contents =
`---
title: ${element.title}
id: ${element.id}
script: ${element.path}
description: ${element.description}
input: ${element.input}
tags: ${element.tags}
weight: ${element.weight}
draft: ${element.draft}
---`;
    if( element.type === 'file') {
      fs.writeFile(`hugo/content/examples/${element.id}.md`, contents, (error) => {
        if (error) throw error;
        // console.log(`write hugo/content/examples/${element.id}.md`);
        // console.log(element);
      });
    }
  });
});

jsonfile.writeFile('hugo/data/examples.json', json, function (err) {
  if (err) console.error(err)
});

// glob(__dirname + '/dist/examples/**/*.js', {}, (err, files)=>{
//   console.log(files)
//   var json = new Map();
//   for( let i = 0; i < files.length; i++) {
//     let file = files[i];
//     fs.readFileSync(file, 'utf8', function(err, data){
//         if( err ) throw err;
//
//         // path to the script
//         let path = './' + file.substring( file.indexOf('examples'), file.length);
//
//         // script name
//         let start = file.lastIndexOf('/');
//         let end = file.lastIndexOf('.js');
//         let name = file.substring( start + 1, end);
//
//         json.set(name, path);
//     });
//   }
//   console.log(json);
// });
