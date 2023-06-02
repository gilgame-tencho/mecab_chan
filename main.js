'use strict';

const fs = require('fs');
const yaml = require('yaml');
const csv = require('csv');

const server_conf = yaml.parse(fs.readFileSync(__dirname + '/conf/server_conf.yml', 'utf-8'));

const kuromoji = require("kuromoji");

let word = "親譲おやゆずりの無鉄砲むてっぽうで小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰こしを抜ぬかした事がある。なぜそんな無闇むやみをしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談じょうだんに、いくら威張いばっても、そこから飛び降りる事は出来まい。弱虫やーい。と囃はやしたからである。小使こづかいに負ぶさって帰って来た時、おやじが大きな眼めをして二階ぐらいから飛び降りて腰を抜かす奴やつがあるかと云いったから、この次は抜かさずに飛んで見せますと答えた。";
let kts_words;
let summay = { sum: 0 };

kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
  // tokenizer is ready
  kts_words = tokenizer.tokenize("親譲おやゆずりの無鉄砲むてっぽうで小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰こしを抜ぬかした事がある。なぜそんな無闇むやみをしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談じょうだんに、いくら威張いばっても、そこから飛び降りる事は出来まい。弱虫やーい。と囃はやしたからである。小使こづかいに負ぶさって帰って来た時、おやじが大きな眼めをして二階ぐらいから飛び降りて腰を抜かす奴やつがあるかと云いったから、この次は抜かさずに飛んで見せますと答えた。");
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
},2000);
