# rent.sc

# Backend


## Step 1: Install Pip

```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

python get-pip.py
```

This should install the latest version of pip. If you have pip installed already, you can skip this step

To check if you successfully installed, you can run the following command

```
pip3 --version
```
This should return 20.1.1

## Step 2: Install Django
```
pip3 install Django==3.1.2
```
This should install the latest official release of Django
```
$ python3 -m django --version
```

To verify it's installed correctly, you can run the command above. This should return 3.1.2

## Step 3: Install Firebase

```
$ sudo pip install firebase-admin
```

This will install the firebase SDK. 

```
$ export GOOGLE_APPLICATION_CREDENTIALS="/PATH/TO/JSONFILE"
```
This simply sents the environment variable to the path of the private key json file
What will be in your parentheses will differ as it should be the path to wherever you have the private key json file located
Mine was located in downloads ex. /Users/Michael/Downloads/service-account-file.json

The private json key should be shared with you via my google drive


## Step 4: Testing 

```
$ python3 manage.py runserver
```


# Frontend
```
sudo npm install -g npx 
npm install react
npm start
```


# Notes

You may need to replace pip with pip3 with some commands and python with python3 so don't panic if they don't work at first! 




