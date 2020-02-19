git reset --hard
git pull
sudo pm2 kill
sudo pm2 start server/server.js --name "EchoApplication"