# Simplication
*カードとコンテンツURLの紐づけには次のcurlコマンドを実行します。
curl -X PUT -u ユーザ名:パスワード https://signage-api.iniad.org/api/v1/signage/cards/カードID -H "Content-Type: application/json" -d '{"url":"URL"}'
*.gitignore内のsecret.jsファイルには、学内のデバイスにアクセスするための認証に必要なパスワード等が格納されています。