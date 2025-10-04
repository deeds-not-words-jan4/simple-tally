// Service Worker登録
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
}

// DOM要素の取得
const totalElement = document.getElementById('total');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');

// Local Storageから合計金額を取得（初期値は0）
let total = parseInt(localStorage.getItem('total')) || 0;

// 合計金額を表示
function updateDisplay() {
    totalElement.textContent = `¥${total.toLocaleString()}`;

    // マイナスの場合は赤字クラスを追加
    if (total < 0) {
        totalElement.classList.add('negative');
    } else {
        totalElement.classList.remove('negative');
    }
}

// Local Storageに保存
function saveTotal() {
    localStorage.setItem('total', total);
}

// 加算処理
addBtn.addEventListener('click', () => {
    const amount = parseInt(amountInput.value) || 0;
    total += amount;
    saveTotal();
    updateDisplay();
    amountInput.value = '';
});

// 減算処理
subtractBtn.addEventListener('click', () => {
    const amount = parseInt(amountInput.value) || 0;
    total -= amount;
    saveTotal();
    updateDisplay();
    amountInput.value = '';
});

// Enterキーでも加算できるようにする
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// 初期表示
updateDisplay();
