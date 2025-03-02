const fs = require('fs');

/**
 * Open package.json, get the updateVersion.
 * The updateVersion is format "yyyy.mm.d.x" where x is the number of times the version has been updated in the day.
 * If the current date is different from the date in the updateVersion, the updateVersion is reset to "yyyy.mm.d.1".
 * otherwise, the updateVersion is incremented by 1.
 */
const updateVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  const updateVersion = packageJson.updateVersion;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}.${month}.${day}`;

  let newUpdateVersion;
  if (updateVersion.startsWith(today)) {
    const count = parseInt(updateVersion.split('.').pop(), 10);
    newUpdateVersion = `${today}.${count + 1}`;
  } else {
    newUpdateVersion = `${today}.1`;
  }

  packageJson.updateVersion = newUpdateVersion;
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  console.log(`Update version updated: ${updateVersion} → ${newUpdateVersion}`);
};

updateVersion();
