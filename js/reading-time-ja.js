// 日本語記事向け：本文の文字数をカウントし、読了時間を表示
// 読了時間表示先のID: reading-time-js
// 本文のクラス: post-content

document.addEventListener('DOMContentLoaded', function () {
  var content = document.querySelector('.post-content');
  var target = document.getElementById('reading-time-js');
  if (!content || !target) return;

  // テキスト抽出・空白除去
  var text = content.innerText.replace(/\s+/g, '');
  var length = text.length;
  var speed = 500; // 1分あたりの文字数
  var minutes = Math.max(1, Math.round(length / speed));
  var msg = length < speed ? '読了目安：1分未満' : '読了目安：' + minutes + '分';
  target.textContent = msg;
});
