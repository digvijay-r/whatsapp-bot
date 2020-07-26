1- craete account on heroku
2- install heroku on machine from heroku cli website
3- login heroku on machine by
  
  `heroku login`

// setting up SSH keys 
4- Check if already sshkeys present

    `ls -a -l ~/.ssh`

5- create ssh key pair

    `ssh-keygen -t rsa -b 4096 -C "digvijayRathore"`

6- Start the ssh agent

    `eval "$(ssh-agent -s)"`

7- register ssh keys

    `ssh-add ~/.ssh/id_rsa`

8- Add ssh keys to heroku

    `heroku keys:add`

9- Create a herokyu project from root of project run

    `heroku create appname`