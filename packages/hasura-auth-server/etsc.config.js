module.exports = {
    // Supports all esbuild.build options
    esbuild: {
        minify: process.env.NODE_ENV != "production",
        bundle: process.env.NODE_ENV === "production",
        target: "es2015",
        outdir: "build",
    },
    // Prebuild hook
    prebuild: async() => {
        console.log("prebuild");
        const rimraf = (await import("rimraf")).default;
        rimraf.sync("./build"); // clean up dist folder
    },
    // Postbuild hook
    postbuild: async() => {
        console.log("postbuild");
        const cpy = (await import("cpy")).default;
        await cpy(
            [
                "src/**/*.graphql", // Copy all .graphql files
                "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
            ],
            "build"
        );
    },
};
