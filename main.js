'use strict';

const fs = require('fs');
const yaml = require('yaml');
const csv = require('csv');

const server_conf = yaml.parse(fs.readFileSync(__dirname + '/conf/server_conf.yml', 'utf-8'));

const kuromoji = require("kuromoji");

let words = fs.readFileSync(__dirname + '/data/bochan.txt', 'utf-8');
let kts_words;
let summay = { sum: 0 };

kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
  // tokenizer is ready
  kts_words = tokenizer.tokenize(words);
  kts_words.forEach((word)=>{
    if(summay[word.surface_form]){
        summay[word.surface_form]++;
    }else{
        summay[word.surface_form]=1;
    }
    summay.sum++;
  });
  console.log(kts_words[0]);
  console.log(kts_words.length);
});

setTimeout(()=>{
    console.log(summay);
    console.log(summay.sum);
},2000);
