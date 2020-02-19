git reset --hard
git pull
pm2 kill
sudo pm2 start yarn --name "EchoApplication" -i 0 -- run start:server
