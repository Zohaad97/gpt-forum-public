#!/bin/bash

###
### pre-commit.sample
###

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=$(git hash-object -t tree /dev/null)
fi

# Redirect output to stderr.
exec 1>&2


# The downside of this is that if multiple checks fail then we'll need to try committing
# multiple times. Oh well. This whole script is a hack.
set -e

# Added or renamed ts, js, sass, and scss files.
added_files=`git diff --name-status "$against" | grep -E '^[AR]' | cut -f2 | grep -E '^(src|typings)/.*\.([tj]sx?|sass|s?css)$' || true`

for file in $added_files; do
  if [[ $file == *[[:upper:]]* ]]; then
    echo "error: js/ts/css filenames must be lowercase: $file"
    false
  fi
done

# Changed ts, js, sass, and scss files.
# TODO: This is filtering out renamed files (the "R" in "^[DR]"), which it shouldn't, but to fix
# that we'd need slightly more advanced parsing, and this script is at the limit of my bash skills.
changed_files=`git diff --name-status "$against" | grep -Ev '^[DR]' | cut -f2 | grep -E '.*\.([tj]sx?|sass|s?css)$' || true`

for file in $changed_files; do
  if [[ $file == *.[tj]s || $file == *.[tj]sx ]]; then
    npx eslint --ext=.js,.jsx,.ts,.tsx "$file"
  fi
done

if [[ $changed_files ]]; then
  npx prettier -c $changed_files --loglevel warn

  # tsc is kind of slow, I guess, oh well. We can look into this later.
  npx tsc --noEmit -p ./tsconfig.json
fi