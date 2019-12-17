### [Gatsby Material Kit React Starter](https://amazing-jones-e61bda.netlify.com/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react?ref=badge_shield)


Gatsby Material Kit React Starter is the adaptation of [Material Kit React](https://www.creative-tim.com/product/material-kit-react) to [Gatsby](https://www.gatsbyjs.org/).

# Interactive Schedule Explainer for Nurse Rostering 

A proof-of-concept tool for explaining nurse rostering, based on the ArgOpt paradigm ([K. Čyras, D. Letsios, R. Misener, F. Toni: Argumentation for Explainable Scheduling. 2019, AAAI](https://aaai.org/ojs/index.php/AAAI/article/view/4126)), built upon [ArgOpt implementation](https://github.com/mylestunglee/aes).

Participated at [The Great Exhibition Road Festival](https://www.greatexhibitionroadfestival.co.uk/) and competed in [British Computer Society (BCS) Specialist Group on AI (SGAI) Machine Intelligence Competition](http://www.bcs-sgai.org/micomp/).

See [video](https://www.youtube.com/watch?v=pVXj_whrTkA) introducing the tool. 

## Windows 

### Install

Requirements:
- [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Node.js](https://nodejs.org/en/download/)
- virtualenv (```pip install virtualenv```)
- GLPK solver (`apt install glpk-utils`)
- python GLPK module (`apt install python-glpk`)

* In ./
```
	npm install
	npm install gatsby
	cd backend/aes-master/
	virtualenv venv
	venv/Scripts/activate
	pip install -r requirements.txt
	pip install pyutilib
	pip install matplotlib
	pip install tornado
	cd ../../frontend	
	yarn add react react-dom	
```

### Deploy

* In /backend/aes-master/
```
	venv/Scripts/activate
	cd src/flask-app/
	python -m flask run
```

to activate Python's virtual environment and run flask

* In /frontend/ (on a new terminal)
``` gatsby develop ```
	to run gatsby

* Access web app on http://localhost:8000/

* Deactivate Python's venv after use
``` deactivate ```

### Some fixes

* If venv complains about python: 
```
	python -m venv venv
	cd backend/aes-master/
	pip install -r requirements.txt
```

* In venv:
```
	yarn add @material-ui/lab
	yarn add rc-time-picker
```

## MacOS

### Install

Requirements:
- [yarn](https://yarnpkg.com/en/docs/install#mac-stable)
- [Node.js](https://nodejs.org/en/download/)
- virtualenv (```pip install virtualenv```)
- GLPK solver (`brew install glpk`)

* In ./
```
	npm install
	npm install gatsby
	cd backend/aes-master/
	python3 -m venv venv
	source venv/bin/activate
	pip install -r requirements.txt
```

### Deploy

* In /backend/aes-master/
```
	source venv/bin/activate
	cd src/flask-app/
	python -m flask run
```

to activate Python's virtual environment and run flask

* In /frontend/ (on a new terminal)
``` gatsby develop ```
	to run gatsby

* Access web app on http://localhost:8000/

* Deactivate Python's venv after use
``` deactivate ```
 

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react?ref=badge_large)
