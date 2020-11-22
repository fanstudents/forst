#### forge
* deploy script
```
cd /home/forge/forest-2020.oturn.co
git pull origin dev

npm install
npm run build

# for -z detect is null or not, add ! to detect if not empty
if [ ! -z $(pm2 pid forest-2020)  ]
then
    pm2 delete forest-2020
fi

NODE_ENV=production pm2 start server.js --name forest-2020
```


#### Server
* install `build-essential` (once per server)
```
sudo apt-get install build-essential
```

* install `pm2` (once per server)
```
sudo npm install -g pm2
```

* start app with pm2
```
NODE_ENV=production pm2 start server.js --name forest-2020
```

> ref. [How To Set Up a Node.js Application for Production on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
>ref. [pm2 quick start](http://pm2.keymetrics.io/docs/usage/quick-start/)


#### Nginx
* add
```
	location / {
        proxy_pass http://localhost:3016;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
to `server` block.

* comment out or delete lines like below:
```
	root /home/forge/next-template.oturn.co/;

	index index.html index.htm index.php;

	location / {
		try_files $uri $uri/ /index.php?$query_string;
	}

	location = /favicon.ico { access_log off; log_not_found off; }
	location = /robots.txt  { access_log off; log_not_found off; }
```