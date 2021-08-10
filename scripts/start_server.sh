sudo yum -y install httpd
sudo service httpd start
pm2 start ./server.js
