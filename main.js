'use strict';

const fs = require('fs');
const yaml = require('yaml');
const csv = require('csv');
const stringifySync = require("csv-stringify/sync");

const server_conf = yaml.parse(fs.readFileSync(__dirname + '/conf/server_conf.yml', 'utf-8'));

const kuromoji = require("kuromoji");
let out_file = __dirname + '/data/bochan_result.csv';
let words = fs.readFileSync(__dirname + '/data/bochan.txt', 'utf-8');
let kts_words;
let summary = { sum: { count: 0, type: 'sum'} };

kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
  // tokenizer is ready
  kts_words = tokenizer.tokenize(words);
  kts_words.forEach((word)=>{
    if(summary[word.surface_form]){
        summary[word.surface_form].count++;
    }else{
        summary[word.surface_form]={
            count: 1,
            type: word.pos,
            basic_form: word.basic_form,
        };
    }
    summary.sum.count++;
  });
  console.log(kts_words[0]);
  console.log(kts_words.length);
});

setTimeout(()=>{
    // console.log(summary);
    console.log(summary.sum);
    let result = [];
    Object.keys(summary).forEach((key)=>{
        let val = summary[key];
        result.push({
            word: key,
            count: val.count,
            type: val.type,
            basic_form: val.basic_form,
        });
    });
    // console.log(result);
    const csvString = stringifySync.stringify(result, {
        header: true
    });
    
    fs.writeFileSync(out_file, csvString);
},2000);
