## Git
- git概念及git的作用
- git工作流
- 分支操作
- 解决冲突
- 标签操作
- 协同工作

### 什么是版本控制？
版本控制是指对软件开发过程中各种程序代码、说明文档等文件的变更进行管理，它将追踪文件变化，记录文件的变更时间、变更内容、甚至变更执行人进行记录，同时对每一个阶段性变更（不仅仅只是一个文件的变化）添加版本编号，方便将来进行查阅特定阶段的变更信息，甚至是回滚。

### 什么是 Git？
- 人工版本控制器

  通过人工的复制行为来保存项目的不同阶段的内容，添加适当的一些描述文字加以区分。

  Git：中文意思傻子；是linux编写的 ；是git和linux操作系统之父；

- 版本控制工具

  通过程序完成上述人工版本控制行为

- 方便且功能强大

- 只记录不同版本之间变化的部分

- 常见版本控制工具

  - CVS
  - SVN
  - Git

### 怎么工作的？
首先，我们得先了解两个重要概念
- 状态
- 区域

#### git 文件生命周期

![lifecycle](.\imgs\lifecycle.png)

#### 状态
同时，git 又提供了三种（也可以说是四种）不同的记录状态

- 已修改（modified）
- 已暂存（staged）
- 已提交（committed）

有一个特殊的状态

- 未追踪（Untracked）

#### 区域
git 提供了三个不同的工作区，用来存放不同的内容

- 工作目录
- 暂存区域
- Git 仓库

![areas](.\imgs\areas.png)

### 安装
- 下载安装：https://git-scm.com/
- 安装homebrew，然后通过homebrew安装Git，具体方法请参考homebrew的文档：http://brew.sh/。`brew  install git`

### 配置
当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改
```bash
    git config user.name "你的姓名"
    git config user.email "你的邮箱"
```

### -- global
通过 `--global` 选项可以设置全局配置信息
```bash
    git config --global user.name "你的姓名"
    git config --global user.email "你的邮箱"
```

### 检查配置
```bash
    # 打印所有config
    git config --list
    # 打印指定config
    git config user.name
```

### 创建仓库 - repository
进入希望纳入 git 版本控制的项目目录，使用 `git init` 初始化
```bash
    git init
```
该命令将创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这个目录也是上面我们说的三个区域之一，这个目录也是 Git 保存数据记录的地方，非常重要，如非必要，不要轻易改动

### 工作流与基本操作
当一个项目被 Git 初始化以后，只是表示我们希望通过 Git 来管理当前的这个项目文件的不同时期版本记录，但是这个时候项目中已存在的文件，或者以后新增的文件都是没有进入版本控制管理的，它们是 `未追踪（Untracked）` 的状态

### 查看工作区的文件状态
`git status`
```bash
    git status
```
查看工作区中的文件状态

#### 乱码
##### git status 显示乱码
```bash
    git config --global core.quotepath false
```
##### 终端乱码
菜单 -> 设置 -> 文本 -> 本地 / 编码

### 添加工作区文件到暂存区
`git add`
```bash
    git add 1.txt
    # 添加多个文件
    git add 2.txt 3.txt
    # 添加整个目录
    git add ./a
    # 添加多个目录
    git add ./b ./c
    # 添加所有文件
    git add .
```

#### 创建版本
`git commit`
将暂存区里的改动给提交到本地 git 仓库，也就是为这次工作（一般会把某个具有特定意义的工作作为一个版本，它可以是多个文件的变化）
- 每次提交同时会生成一个 40 位的哈希值，作为该次提交版本的唯一 id
##### 提交备注
每次提交都需要填写备注信息
```bash
    git commit
    # 会调用默认（或自定义）的文本编辑器
```
##### 修改默认编辑器
```bash
    git config core.editor notepad

    # 添加 vscode 编辑器 - mac
    # 通过 vim 打开环境变量配置文件
    vim ~/.bash_profile
    # 添加环境变量
    export PATH=/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin:$PATH
    # 保存退出
    source ~/.bash_profile
    # 测试：在终端中直接通过命令 code 调用 vscode
    git config --global core.editor "code --wait"
```
##### 单行备注
`git commit -m`
```bash
    git commit -m 备注信息
```

### 查看提交日志
`git log`
```bash
    // 完整格式
    git log
    // 简要格式（单行）
    git log --oneline
```
`git reflog`
```bash
    git reflog
    # 查看所有历史提交（包括已删除的）
```

### 修复提交
`git commit --amend`
修复（替换上一次）提交，在不增加一个新的提交版本的情况下将新修改的代码追加到前一次的提交中
```bash
    git commit --amend -m 提交
```

### 删除
`git rm`
```bash
    # 从 git 仓库与工作区中删除指定文件
    git rm 文件

    # 只删除 git 仓库中的文件
    git rm --cached 文件

    # rm 以后，需要 commit 这次操作，否则 rm 将保留在暂存区
    git commit -m 修正
```

### 撤销重置
`git reset`
#### 从暂存区中撤销到工作区
```bash
    # 从暂存区中撤销一个指定文件
    git reset HEAD 文件名称
    # 从暂存区中国年撤销所有文件
    git reset HEAD .
```
#### 该命令既可以用于回退版本
```bash
    # 回退到指定的 commitID 版本
    git reset --hard commitID
```

### 比较
```bash
    # 比较 工作区和暂存区
    git diff 文件 
    # 比较 暂存区和仓库
    git diff --cached [commitId] 文件
    # 比较 工作区和仓库
    git diff commitId filename
    # 比较 仓库不同版本
    git diff commitId1 commitId2
```

### 分支
我们的开发就像是游戏的任务，默认是在主线（master）上进行开发的。许多时候，还有各种支线任务，git 支持我们创建分支来进行项目开发

### 查看分支
```bash
    git branch
```

### 创建分支
```bash
    git branch 分支名称
```

### 切换分支
```bash
    git checkout 分支名称
    # 也可以使用 checkout -b 来新建分支
    git checkout -b 分支名称
```

### 分支合并
```bash
    # B 合并到 A，需要切换到 A 分支
    git merge 被合并分支

    # 查看已经合并的分支
    git branch --merged
    # 查看未合并的分支
    git branch --no-merged
```

### 删除分支
```bash
    # 如果分支为未合并状态，则不允许删除
    git branch -d 分支名称
    # 强制删除
    git branch -D 分支名称
```

### 合并冲突
有的时候，不同的分支可能会对同一个文件内容和位置上进行操作，这样在合并的过程中就会产生冲突
- 查看冲突文件
- 修复冲突内容
- 提交

### 标签
有的时候，我们希望给某一个特定的历史提交打上一些标签
#### 新建 tag
```bash
    git tag -a v1.0.0 HEAD/commitId
```
#### 查看 tag
```bash
    git tag
```

### 协同开发
以上所有的操作都是建立在本地的，如果我们希望进行团队协同开发，那么这个时候，我们就需要把 git 仓库信息与团队中的所有人进行共享
- 分布式 - 中心化与去中心化
#### github
首先注册一个账号
使用 ssh 链接
#### SSH
https://help.github.com/cn/articles/connecting-to-github-with-ssh

https://help.github.com/cn/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
##### 生成 SSH 秘钥
```bash
    ssh-keygen -t rsa -C "zmouse@miaov.com"
```
##### 添加代理
使用 `ssh-add` 代理，如果没有启动，可以手动启动
```bash
    eval $(ssh-agent -s)
```
##### 添加 私钥
```bash
    ssh-add 私钥路径
```
或者修改 ~/.ssh/config 配置多个Host
##### 在 github 上添加公钥
个人中心 -> 设置 -> ssh -> 添加
##### 测试
```bash
    ssh -T git@github.com
```

### git 远程
#### 链接
```bash
    git remote add origin https://xxx.xxx
```
#### 提交（同步）远程
同步本地仓库到远程
```bash
    # 第一次推送数据
    git push -u origin master 
    # -u 简化后续操作
    git push origin master
```
```bash
    # 第二次之后的推送
    git push
```
#### 远程分支
```bash
    # 提交到远程（分支）
    git push origin [本地分支名称]:[远程分支名称]

    # 远程先创建好分支然后拉取到本地
    git checkout -b [本地分支名称] origin/[远程分支名称]

    # 拉取远程分支到本地
    git pull origin [远程分支名称]:[本地分支名称]

    # 查看远程仓库
    git remote show origin

    # 查看本地分支
    git branch

    # 查看远程分支
    git branch -r

    # 查看所有分支
    git branch -a

    # 删除本地分支
    git branch -d [本地分支名称]

    # 删除远程分支
    git push origin --delete [远程分支名称]
    # or
    git push origin :[远程分支名称]

    # 设置默认提交分支
    git branch --set-upstream-to=origin/[远程分支名称] [本地分支名称]
```

## 总结：

- git概念及git的作用
- git工作流
- 分支操作
- 解决冲突
- 标签操作
- 协同工作