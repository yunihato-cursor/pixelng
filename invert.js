document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = function() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const scaleFactor = 0.5;
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 画像がロードされたら色を反転させるボタンを表示
        // 初期状態でボタンは表示されているため、ここでの制御は不要
    };

    const reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('invert').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
        // Alpha (data[i + 3]) is unchanged
    }

    ctx.putImageData(imageData, 0, 0);

    // 色を反転させた後にダウンロードボタンを表示
    document.getElementById('download').style.display = 'block';
    // サイズ変更ボタンは表示しない
    // 色を反転させた後に色を反転ボタンを非表示
    document.getElementById('invert').style.display = 'none';
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'inverted-image.png';
    link.click();
});