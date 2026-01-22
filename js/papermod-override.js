// PaperModのaddEventListenerエラー回避用スクリプト
// ページロード後に、必要な要素が存在する場合のみイベントを追加

document.addEventListener('DOMContentLoaded', function () {
  // テーマ切り替えボタン
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      if (document.body.className.includes('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('pref-theme', 'light');
      } else {
        document.body.classList.add('dark');
        localStorage.setItem('pref-theme', 'dark');
      }
    });
  }

  // コピー機能
  document.querySelectorAll('pre > code').forEach(function (codeblock) {
    const container = codeblock.parentNode.parentNode;
    const copybutton = document.createElement('button');
    copybutton.classList.add('copy-code');
    copybutton.innerHTML = 'copy';

    function copyingDone() {
      copybutton.innerHTML = 'copied!';
      setTimeout(function () {
        copybutton.innerHTML = 'copy';
      }, 2000);
    }

    copybutton.addEventListener('click', function () {
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText(codeblock.textContent);
        copyingDone();
        return;
      }
      var range = document.createRange();
      range.selectNodeContents(codeblock);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        copyingDone();
      } catch (e) {}
      selection.removeRange(range);
    });

    if (container.classList.contains('highlight')) {
      container.appendChild(copybutton);
    } else if (container.parentNode.firstChild == container) {
      // td containing LineNos
    } else if (
      codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == 'TABLE'
    ) {
      // table containing LineNos and code
      codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
    } else {
      // code blocks not having highlight as parent class
      codeblock.parentNode.appendChild(copybutton);
    }
  });

  // fastsearch.jsのsearchイベント（必要なら）
  var sInput = document.getElementById('fastsearch-input');
  if (sInput) {
    sInput.addEventListener('search', function (e) {
      // 例: 検索入力時の処理（PaperModのfastsearch.jsの本来の処理を必要に応じて追加）
      // ここはサイト固有のため、必要なら詳細を追加してください
    });
  }

  // =========================
  // 横スクロールテーブルヒント（常時表示・アニメ付き）
  // =========================
  (function injectAlwaysVisibleTableHints() {
    const TABLE_WRAPPER_SELECTOR = '.table-scroll';
    const candidates = document.querySelectorAll(TABLE_WRAPPER_SELECTOR);
    if (!candidates.length) return;

    candidates.forEach((wrapper) => {
      if (wrapper.classList.contains('table-scroll-hint-inserted')) return;
      const table = wrapper.querySelector('table');
      if (!table) return;

      // 横スクロールが必要な場合のみヒント表示
      if (table.scrollWidth > wrapper.clientWidth + 8) {
        // 親要素にposition: relativeを設定（オーバーレイ用）
        wrapper.style.position = 'relative';
        const hint = document.createElement('div');
        hint.className = 'table-scroll-hint always-visible';
        hint.innerHTML =
          '<span>横にスクロールできます<span class="icon-arrows"><span>›</span><span>›</span><span>›</span></span></span>';
        // wrapperの内部にオーバーレイとして追加（CLSを防ぐ）
        wrapper.appendChild(hint);
      }
      wrapper.classList.add('table-scroll-hint-inserted');
    });
  })();
});
