# latex.insert

latex記法でAdobe IllustratorとAdobe Indesignに数式を挿入することができるプラグインです。

## インストール方法

1. `npm run zxp`でビルドができます。
2. `dist/zxp`にzxpファイルができるのでインストールしてください。

詳しくは [HyperBrew Bolt-CEP](https://github.com/hyperbrew/bolt-cep)を参考にしてください。

## 使い方

llustratorかIndesignを開いて`ウィンドウ → エクステンション → Latex.insert`から使ってください。

なお、挿入時にIndesignの場合はファイルと同じ階層にAssetsというディレクトリが作成され、その中に数式のファイルが保存されます。

Illustratorは埋め込まれるので数式ファイルはtmpディレクトリに作成後自動的にすぐに消去されます。

数式の色は現在の塗りの色になりますが、グラデーション等になっていると非対応の場合があります。

## 謝辞

このソフトウェアのコードには[HyperBrew Bolt-CEP](https://github.com/hyperbrew/bolt-cep)のコードが含まれています。
