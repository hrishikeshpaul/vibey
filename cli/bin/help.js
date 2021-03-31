const help = 
`
Usage: vibey <module> <command> <name>

Modules:
  b                   backend. create files on the backend
  f                   frontend. create files on the fontend

Commands:
  init                contigure root directories
  route               create router files
  mid                 create middleware files
  lib                 create library files
  st                  create static files

Example:
  vibey b route auth  - creates a file called auth.js in the routes folder
`

module.exports = {
  help
};