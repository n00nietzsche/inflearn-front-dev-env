class HelloWorldPlugin {
    apply(compiler) {
        compiler.hooks.done.tap("Hello World Plugin", (stats) => {
            console.log("HelloWorldPlugin worked");
        });

        compiler.hooks.emit.tapAsync(
            "Hello World Plugin",
            (compilation, callback) => {
                const originalBundlingResult =
                    compilation.assets["main.js"].source();

                compilation.updateAsset("main.js", {
                    source() {
                        const comment = [
                            "/**",
                            " * 안녕하세요. 사용자 정의 코멘트입니다.",
                            " */",
                        ].join("\n");

                        return comment + "\n\n" + originalBundlingResult;
                    },
                });

                callback();
            }
        );
    }
}

module.exports = HelloWorldPlugin;
