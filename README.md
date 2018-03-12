# yangester-cli
#### 打造一个简易的前端开发流
##### usage
```bash
//install
# npm install -g yangester-cli

// delete files
# yang rm example.text exmaple2.json

// delte a directory
# yang rm -rf a

// delete the content of a directory
# yang rm -rf a/*

// copy a file to 'cache' directory

# yang cp example.text cache/

// copy a directory to 'cache' directory
# yang cp a cache/

// create files
# yang touch a.js b.js

// create directories
# yang mkdir a b c

// init your vue project
# yang npm vue <yourprojectname>
# cd <yourprojectname>
# npm init
# npm run dev
```
## 参考
- [Official Node.js API Docs](https://nodejs.org/dist/latest-v8.x/docs/api/)
- [commander.js](https://github.com/tj/commander.js)

# Todo
- [x] 实现文件的基本操作功能
- [x] 实现一个server和cli


###### 关于node.js文件的操作，以及本模块的原理：
###### 如何写入一个文件?
writeMyData就是

fs.writeFile('example.text','utf8', err=>{})
```javascript
fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  writeMyData(fd);
});
```

###### 如何打开一个文件?
readMyData就是

fs.readFile('example.text','utf8', err=>{})
```javascript
fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  readMyData(fd);
});
```

###### 如何创建/删除一个文件夹
```javascript
//创建文件夹b
fs.mkdir('./a/b', err => {})
//创建空文件夹b
fs.rmdir('./a/b', err => {})
```
###### 如何删除一个文件
```javascript
//删除文件b
fs.unlink('./a/b.text', err => {})
```

###### 删除/赋值文件夹
删除以及复制文件夹, 其实思路大致是相同的。我们先定义一个walk函数，用于遍历目标文件夹。这个walk函数返回的是一个Promise实例。
```javascript
mkdir([path.join(dest, directory)])
        .then(
            () => {
                return readdir(directory)
            }
        )
```
以复制文件夹a 到 目标目录 ./dest 为例子， 首先我们先在./dest下创建一个空目录a，然后调用readdir遍历a目录，如果a非空的话，返回的是一个files数组，调用数组的map方法，对每一个file，return一个fsstats。最后被包裹在Promise.all里面，然后返回这个Promise.all。
```javascript
.then(files => {
            return Promise.all(
                files.map( f =>{
                    f = path.join(directory, f)
                    return fstatSync(f)
                })
            )
        })
```
接下来，如果判断是个文件夹，那么再walk一遍，并return(此时又在dest下创建了一个新目录)。如果是个文件，直接复制到dest的相应路径里。
```javascirpt
.then(
            fileStats => {
                return Promise.all(
                    fileStats.map(fileStat => {
                        if (fileStat.isDirectory()) {    
                            return walk(fileStat.dir, dest)
                        } else {
                            copyDirectory(fileStat.dir, dest)
                        }
                    }))
            }
        ).catch(e => {
            console.log(e)
        })
```
