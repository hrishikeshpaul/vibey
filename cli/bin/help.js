/**
 * Helper text
 */
const help = 
`
Usage: vibey <module> <command> <name>

Modules:
  b, be, back, backend              backend. create files on the backend
  f, fe, front, frontend            frontend. create files on the fontend

Common Commands:
  i, init                           contigure root directories

Backend Commands:
  r, route                          create router files
  m, mid, middle, middlware         create middleware files
  l, lib                            create library files
  s, st, stat, static               create static files

Frontend Commands:
  c, comp, component                create react component
  m, mod, module                    create react module
  h, hook                           create react hook. prefixes'use'
  s, svc, service                   create react service
  state                             create react state

Example:
  vibey b route auth  - creates a file called auth.js in the routes folder
`

module.exports = {
  help
};