#How to for WAW site 2k18
This file contains information about: which is the structure, how to develop and how to maintain this site.

## What about the structure
At the **root directory** there are the **"package.json"** and **"readme.md"** files.

Also in the root are the files:
 * **"gulpfile.js"**: gulp tasks 
 * **"webpack.config.babel.js"**: webpack file for babel transpilation

The repository of the site has **different folders for different purposes**.

### docs
Contains **information** about the project

### src
Contains the **development files** that has to be **processed before being served**.

### public
Contains the **static public files** that has to be **provided using an HTTP service**. 


## How to develop
There are different **rules** that must be taken into account **to develop** this project.

(If somebody **doesn't take care** about this instructions then there would be some **problems** while doing **"git merges"**).

  - **Codification UTF-8**

  - **Line endings in unix format (LF)**

  - **Tabulation using spaces (not tabs)** 

  
### How to install required libraries
There are some third party libraries that are required by the project. Normally are installed using NPM and have been included into 
the **"package.json"** file.

Normally install all by typing **"npm install"**

  - **@webcomponents/webcomponentsjs**
  
    npm install @webcomponents/webcomponentsjs --save-dev
  
  - **polymer**
  
    npm install polymer --save-dev
  
  - **gulp**
  
    npm install gulp --save-dev  
  
  - **del**
  
    npm install del --save-dev
    
  - **run-sequence**
  
    npm install run-sequence --save-dev
    
  - **webpack**
  
    npm install webpack --save-dev
    
  - **babel**
  
    npm install babel-core babel-loader babel-preset-env --save-dev
