#!/bin/bash

self_dir="`dirname $0`"

cp "$self_dir/pre-commit" "$self_dir/../.git/hooks"