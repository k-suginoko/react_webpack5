# Webpack v5

ミニマム版の作成

## package
* React
* Sass
* TypeScript

Nodeバージョン注意
```
"node" is incompatible with this module. Expected version "^12.20.0 || ^14.13.1 || >=16.0.0". Got "14.7.0"
```
自分の環境では14.18.2

一応自動で切り替えられるように.node_version入れてます

Sassは@importが使えなくなる影響でnode-sassはremoveし、sassを入れました。