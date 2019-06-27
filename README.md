# [Gatsby Material Kit React Starter](https://amazing-jones-e61bda.netlify.com/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react?ref=badge_shield)


Gatsby Material Kit React Starter is the adaptation of [Material Kit React](https://www.creative-tim.com/product/material-kit-react) to [Gatsby](https://www.gatsbyjs.org/).

## Windows 

### Install

TBD

### To run

* In /backend/aes-master/
``` .\venv\Scripts\Activate.ps1 ```
	to activate Python's virtual environment
* cd to src/flask_app/ and run flask
``` python -m flask run ```
* In /frontend/ (on new terminal)
``` gatsby develop ```
	to run gatsby
* Then http://localhost:8000/

### Some fixes

* If venv complains about python, 
``` python -m venv venv ```

then in /backend/aes-master/

``` pip install -r requirements.txt ```

``` yarn add @material-ui/lab ```

``` yarn add react react-dom ```

``` yarn add rc-time-picker ```

### Voice

In /frontend/src/pages/MainPage/Sections/SectionChart/primatives/title.jsx modify ```speak``` function 

```msg.text = "MESSAGE"```

before ```speechSynthesis.speak(msg);``` on the last line
 

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react?ref=badge_large)
