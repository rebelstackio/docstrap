dist: xenial

language: node_js

node_js: "10"

sudo: false

branches:
  only:
  - develop

cache:
  directories:
    - node_modules

before_install:
  - pip install --user awscli
  - export PATH=$PATH:$HOME/.local/bin

install:
  - npm install

# script:
#   # The env variables are set in travis config panel
#   - printf '%s\n' "ENVIROMENT=\"PRODUCTION\"" "FB_APIKEY=$FB_APIKEY" "FB_AUTHDOMAIN=${FB_AUTHDOMAIN}" "FB_DATABASEURL=$FB_DATABASEURL" "FB_PROJECTID=${FB_PROJECTID}" "FB_STORAGEBUCKET=$FB_STORAGEBUCKET" "FB_MESSAGINGSENDERID=${FB_MESSAGINGSENDERID}" >.env
#   - npm run build 
#   # runs npm test( or anything ) for regular build and run the provision script if it is a pull request
#   - export PATH=$PATH:$HOME/.local/bin
#   - '[ "${TRAVIS_PULL_REQUEST}" = "false" ] && npm test || sh ./vagrant/travis.provision.sh ${TRAVIS_PULL_REQUEST}'

# deploy:
#   provider: pages
#   skip-cleanup: true
#   github-token: $GITHUB_TOKEN
#   keep-history: false
#   local-dir: dist
#   on:
#     branch: develop

# notifications:
#   slack:
#     rooms:
#       - rebelstackio:OeVq0yYn42zquWyut36jPxUz
#     template:
#       - "Build <%{build_url}|#%{build_number}> (<%{compare_url}|%{commit}>) of %{repository_slug}@%{branch} by %{author} %{result} in %{duration}. Develop branch deploy: https://rebelstackio.github.io/yakchat/"
#       - "Pull Request <%{pull_request_url}|#%{pull_request_number}> by %{author} %{result}. Pull request deploy: http://yakchat-%{pull_request_number}.s3-website-us-west-1.amazonaws.com"
#     on_success: always
#     on_failure: always 