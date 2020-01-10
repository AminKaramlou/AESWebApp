### [Gatsby Material Kit React Starter](https://amazing-jones-e61bda.netlify.com/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FWebCu%2Fgatsby-material-kit-react?ref=badge_shield)


Gatsby Material Kit React Starter is the adaptation of [Material Kit React](https://www.creative-tim.com/product/material-kit-react) to [Gatsby](https://www.gatsbyjs.org/).

# Interactive Schedule Explainer for Nurse Rostering 

A proof-of-concept tool for explaining nurse rostering, based on the ArgOpt paradigm ([K. Čyras, D. Letsios, R. Misener, F. Toni: Argumentation for Explainable Scheduling. 2019, AAAI](https://aaai.org/ojs/index.php/AAAI/article/view/4126)), built upon [ArgOpt implementation](https://github.com/mylestunglee/aes).

Participated at [The Great Exhibition Road Festival](https://www.greatexhibitionroadfestival.co.uk/) and competed in [British Computer Society (BCS) Specialist Group on AI (SGAI) Machine Intelligence Competition](http://www.bcs-sgai.org/micomp/).

See [video](https://www.youtube.com/watch?v=pVXj_whrTkA) introducing the tool. 

## Windows 

The following assumes execution via [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview?view=powershell-5.1) ([see e.g.](https://www.varonis.com/blog/windows-powershell-tutorials/) for a basic tutorial)

### Install

Requirements:
- [Python 3](https://www.python.org/downloads/windows/)
- [Node.js](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
- [GLPK solver](http://winglpk.sourceforge.net/) 
	1. download and extract the source (.zip) with executables (to e.g. `..\glpk-4.65`)
	2. add the directory path (e.g. `..\glpk-4.65\w64`) with the relevant version executables to PATH (PC > Properties > Advanced System Settings (System Properties) > Advanced > Environment Variables > Path > Edit > New)
	3. `glpsol` to check if the solver works
	4. this may still not be enough for Python to be able to use GLPK, so the easiest fix is to locate the appropriate version of `glpsol.exe` (e.g. in `..\glpk-4.65\w64`) and copy it to Python's Scripts directory (e.g. `C:\Program Files (x86)\Python38-32\Scripts\`)
- flask (`pip install flask`)
- virtualenv (`pip install virtualenv`)
	+ to run the virtual environment script you'll need to have PowerShell Execution Policy set correctly, e.g. `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- pillow (`pip install pillow`)
- pyomo (`pip install pyomo`)


* In ./
```
	npm install
	npm install -g gatsby-cli
	yarn install
	cd backend/aes-master/
	virtualenv venv
	venv/Scripts/activate
	pip install -r requirements.txt
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

- To rebuild the virtual environment: 
```
	python -m venv venv
	cd backend/aes-master/
	pip install -r requirements.txt
```

- (2020-01-10) While installing from `requirements.txt` issues with `greenlet` may persist on e.g. Python 3.8. 
This may be because the required wheel is not on PyPi and has to build locally from the source. 
The latter requires a C compiler to develop Python extensions, e.g. Visual C++. 
However, another solution is to [get the latest precompiled greenlet wheel](https://www.lfd.uci.edu/~gohlke/pythonlibs/#greenlet) (e.g. greenlet-0.4.15-cp38-cp38-win32.whl) 
and install if from the virtual environment 
`pip install ..\greenlet-0.4.15-cp38-cp38-win32.whl`
just for this project.

- The virtual environment may complain about lacking packages, such as tornado, matplotlib etc. Just install them
```
	pip install tornado
	pip install matplotlib
	pip install pyutilib
```


## MacOS

### Install

Requirements:
- [yarn](https://yarnpkg.com/en/docs/install#mac-stable)
- [Node.js](https://nodejs.org/en/download/)
- GLPK solver (`brew install glpk`)
- flask (`pip install flask`)
- virtualenv (`pip install virtualenv`)

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
