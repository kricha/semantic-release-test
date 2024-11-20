#/bin/sh
if [[ -z "${GITHUB_TOKEN}" ]]; then
  echo "GITHUB_TOKEN not defined; Exit;"
  exit 1;
fi

npm link semantic-release

PREPARING=1 node -e "
(async () => {
  const fs = require('fs');
  const semanticRelease = (await import('semantic-release')).default;
  const result = await semanticRelease({ dryRun: true, noCi: true });
  if (result) {
    let notes = result.nextRelease.notes
        .replace(/^## \d+\.\d+\.\d+ \(\d{4}-\d{2}-\d{2}\)\n+/m, '')
        .replace(/^### /gm, '')
        .replace(/\s([a-f0-9]{7,})/g, '')
        .replace(/^\s*\*\s*/gm, ' - ')
    fs.writeFileSync('RELEASE_TAG', result.nextRelease.version, 'utf-8');
    fs.writeFileSync('RELEASE_NOTES', notes, 'utf-8');
    
    console.log('TAG and NOTES files created successfully.');
  } else {
    console.log('No release planned.');
  }
})();
"
npm unlink semantic-release
rm -rf package.json package-lock.json node_modules