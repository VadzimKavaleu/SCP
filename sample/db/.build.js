const fs = require('fs');
const childproc = require('child_process');
const path = require("path");

if(fs.existsSync('../package.json')) {
    childproc.execSync('npm install && npm run build', {
        cwd: '..',
        stdio: 'inherit'
    });

    const csvPath = path.resolve(__dirname, "src", "gen", "csv");

    if (process.env.NODE_ENV === "production" && fs.existsSync(csvPath)) {
        const fsext = require("fs-extra");
        fsext.removeSync(csvPath);

    }
}