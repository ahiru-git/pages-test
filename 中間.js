// 1. 地図データ（GeoJSON）のファイル名
const geoJsonPath = './N03-20250101_prefecture.json'; 

// 2. HTMLの「#chart」を見つけて、EChartsを初期化
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

// 3. ローカルサーバーから地図データを読み込む（Fetch API）
fetch(geoJsonPath)
    .then(response => {
        if (!response.ok) throw new Error('地図データの読み込み失敗');
        return response.json(); // データをJSON形式に変換
    })
    .then(geoJson => {
        // 4. EChartsに「japan」という名前で地図データを登録
        echarts.registerMap('japan', geoJson);

        // 5. 地図の見た目の設定（オプション）
        const option = {
           
            series: [{
                type: 'map',
                map: 'japan', // 登録した地図を表示
                
                itemStyle: {
                    areaColor: '#c6caca', // 地図のベース色（グレー）
                    borderColor: '#ffffff', // 県境の線の色（白）
                    borderWidth: 1
                },
                emphasis: {
                    
                    itemStyle: {
                        areaColor: '#3a5069' // マウスを乗せたときだけ少し濃い青にする
                    }
                }
            }]
        };

        // 6. 設定を適用して画面に地図を描画
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('エラー:', error);
    });

// 画面のサイズが変わったら地図の大きさも自動調整（レスポンス対応）
window.addEventListener('resize', myChart.resize);